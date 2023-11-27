import React, { useState, useEffect } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import CountryCodeSelector from "../components/country-codes"
import Seo from "../components/seo"
import { useLocation } from "@reach/router"
import { BannedNumberModal, OtpInputModal, ServerErrorModal } from "../components/Modal"
import { Link } from "gatsby"
import { navigate } from "gatsby" // or useNavigate from react-router-dom

const Login = () => {
  const [countryCode, setCountryCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [otp, setOtp] = useState("")
  const [countryCodesOption, setCountryCodesOption] = useState([])
  const location = useLocation()
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [isBannedModalOpen, setIsBannedModalOpen] = useState(false)
  const openOtpModal = () => {
    setIsOtpModalOpen(true)
  }
  const openBannedModal = () => {
    setIsBannedModalOpen(true)
  }
  const openErrorModal = () => {
    setIsErrorModalOpen(true)
  }

  let url = `${process.env.GATSBY_API_URL}`
  let baseUrl = `${process.env.GATSBY_API_URL_BASE}`
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  useEffect(() => {
    // Fetch country codes or other initial data here
    // setCountryCodes(...) after fetching
    // getCallingCode()
  }, [])

  const handlePhoneSubmit = async event => {
    event.preventDefault()
    try {
      console.log("HANDLING SUBMIT: working with numbert %s and code %s selector %s", phoneNumber, countryCode, countryCodesOption)
      const result = await triggerVerification()
      if (result.status === 200) {
        setSessionId(result.data.sessionId)
        localStorage.setItem("sessionId", result.data.sessionId)
        openOtpModal()
      } else if (result.banned) {
        console.log("User is banned, stopping further actions.")
        return
      } else {
        console.log("Failed to trigger verification")
        openErrorModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  // get session ID
  const triggerVerification = async () => {
    try {
      const response = await fetch(baseUrl + "verification/trigger", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          countryCode: countryCode,
          number: phoneNumber,
        }),
      })
      if (response.status == 418) {
        openBannedModal()
        return {
          status: response.status,
          banned: true, // Indicate that the user is banned
        }
      }
      const data = await response.json()
      return {
        status: response.status,
        data: data,
      }
    } catch (error) {
      console.error("Error caught in triggerVerification:", error)
      return {
        error: true,
        message: error.message || "An error occurred",
      }
    }
  }

  // OTP value gets set in the Modal - cannot use states here..
  const handleOtpSubmit = async submittedOtp => {
    try {
      console.log("working OTP %s and SESSION %s", submittedOtp, sessionId)
      const response = await verifyConfirm(submittedOtp)
      console.log("Response Received from verifyConfirm", response)
      if (response.status == 200) {
        setIsOtpModalOpen(false)
        //send user to cash-out page and optinally show a succes modal
        localStorage.setItem("otp", response.data.otp)
        handleSignUp()
      } else if (response.status === 500) {
        openErrorModal()
        console.log("Server error - please try later")
      } else if (response.status === 418) {
        openBannedModal()
        console.log("user is banned from service.")
      } else if (response.data.verificationStatus === "FAILED") {
        console.log("response failure")
      }
      setIsOtpModalOpen(false)
    } catch (error) {
      console.log("caught in the error")
      setIsOtpModalOpen(false)
      console.log(error)
    }
  }

  const verifyConfirm = async submittedOtp => {
    try {
      const verifyResponse = await fetch(baseUrl + "verification/confirm", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          sessionId: sessionId,
          verificationCode: submittedOtp,
        }),
      })
      const verifyData = await verifyResponse.json()
      return {
        status: verifyResponse.status,
        data: verifyData,
      }
    } catch (error) {
      console.log(error)
    }
  }

  // TODO - set up the "getUserId" for existing users
  const handleSignUp = async () => {
    try {
      const signUpResponse = await fetch(baseUrl + "user/register", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          countryCode: countryCode,
          number: phoneNumber,
        }),
      })
      const signUpData = await signUpResponse.json()
      if (signUpResponse.status == 200) {
        // new users
        console.log("New User %s successfully Registered with code 200", signUpData.userId)
        // const thisUserId = signUpData.userId
        // const nanoAccount = await getNanoAccount()
        // const connectedAccount = await connectNanoAccountWithUserId(thisUserId, nanoAccount.nanoNodeWalletAccount)
        // console.log("response of new nano account connection is ", connectedAccount.data)
        // if (connectedAccount.data.message === "Account address successfully saved") {
        //   localStorage.setItem("nanoAccount", connectedAccount.data.currentDatabaseAccountAddress)
        // }
      } else if (signUpResponse.status == 400) {
        console.log("User already exists")
        const signUpData = await getUserId()
      }
      const thisUserId = signUpData.userId
      const nanoAccount = await getNanoAccount()
      const connectedAccount = await connectNanoAccountWithUserId(thisUserId, nanoAccount.nanoNodeWalletAccount)
      console.log("response of new nano account connection is ", connectedAccount.data)
      if (connectedAccount.data.message === "Account address successfully saved" || connectedAccount.data.message === "Welcome back!") {
        localStorage.setItem("nanoAccount", connectedAccount.data.currentDatabaseAccountAddress)
      }
      localStorage.setItem("userId", thisUserId)
      navigate("/cash-out")
    } catch (error) {
      console.log(error)
    }
  }

  // for existing users only
  const getUserId = async () => {
    return new Promise((resolve, reject) => {
      fetch(baseUrl + "user/getUser", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          countryCode: countryCode,
          number: phoneNumber,
        }),
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          resolve(data)
        })
        .catch(error => reject(error))
    })
  }

  const getNanoAccount = async () => {
    return new Promise((resolve, reject) => {
      fetch(baseUrl + "wallet/createSimpleNanoAccount", {
        method: "GET",
        headers: headers,
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          resolve(data)
        })
        .catch(error => reject(error))
    })
  }
  const connectNanoAccountWithUserId = async (userId, nanoAccount) => {
    try {
      const response = await fetch(baseUrl + "payment/crypto/save", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          address: nanoAccount,
          addressType: "NANO",
          userId: userId,
        }),
      })
      const data = await response.json()
      return {
        status: response.status,
        data: data,
      }
    } catch (error) {
      console.log(error)
    }
  }

  // organizes the selector value and the country code value
  const handleCountryChange = e => {
    const [code, dialCode] = e.target.value.split("-")
    setCountryCode(code)
    setCountryCodesOption(e.target.value)
  }

  // NOTE: Things like FastForward will block this.
  // This function will be used to get the user's country code on load
  // todo - handle this later
  // const getCallingCode = () => {
  //   // Fetch the country code based on the user's IP
  //   const url = "https://api.ipgeolocation.io/ipgeo?apiKey=9d0005d72b1a45619e83ccb9446e930b"
  //   fetch(url)
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(data => {
  //       country = data.country_code2
  //       setCallingCode(country)
  //     })
  //     .catch(err => {
  //       // Do something for an error here
  //     })
  // }

  // This function will be used to get the user's country code on load
  const setCallingCode = () => {
    let IPcountryCode = countryCode
    let codeDropdown = document.getElementById("countryCodes")
    localStorage.setItem("IPcountryCode", IPcountryCode)
    for (let i, j = 0; (i = codeDropdown.options[j]); j++) {
      if (i.dataset.countryCode == IPcountryCode) {
        codeDropdown.selectedIndex = j
        i.selected = true
        return IPcountryCode
      }
    }
  }

  const handleCloseModal = () => {
    setIsBannedModalOpen(false)
    setIsErrorModalOpen(false)
  }

  return (
    <div className="login">
      <Seo title="Login KarmaCall" description="A simple login page to let you manage your account" />
      <Header />
      <div className="AppText">
        <section>
          <div id="phone-number-entry" className="network">
            <div className="container">
              <form method="get" id="phoneNumberInput" onSubmit={handlePhoneSubmit}>
                <div>
                  <p>
                    <CountryCodeSelector value={countryCodesOption} onChange={handleCountryChange} />
                  </p>
                  <p>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Enter Phone Number"
                      className="form-control"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      pattern="[0-9]*"
                      title="Phone number should only contain digits."
                      required
                    />
                  </p>
                </div>
                <div className="input-group-btn">
                  <p>
                    <span className="input-group-btn">
                      <button type="submit" className="user">
                        Confirm Phone Number
                      </button>
                    </span>
                  </p>
                </div>
              </form>
              {/* <h3> */}
              {/* <a href="/login-email">Click here to login with email</a> */}
              {/* </h3> */}
            </div>
          </div>
          <OtpInputModal isOpen={isOtpModalOpen} onSubmit={handleOtpSubmit} onClose={() => setIsOtpModalOpen(false)} />
          <BannedNumberModal isOpen={isBannedModalOpen} onClose={handleCloseModal} />
          <ServerErrorModal isOpen={isErrorModalOpen} onClose={handleCloseModal} />
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Login
