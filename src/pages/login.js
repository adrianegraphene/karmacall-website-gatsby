import React, { useState, useEffect } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import CountryCodeSelector from "../components/country-codes"
import Seo from "../components/seo"
import { useLocation } from "@reach/router"
import { OtpInputModal } from "../components/Modal"
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
  const openOtpModal = () => {
    setIsOtpModalOpen(true)
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
        // Call was successful, proceed with the next step
        console.log("Verification triggered successfully", result.data)
        setSessionId(result.data.sessionId)
        openOtpModal()
        // const otpResponse = await handleOtpSubmit()
      } else {
        // Handle error or unsuccessful call
        console.log("Failed to trigger verification", result.status)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // get session ID
  const triggerVerification = async () => {
    try {
      console.log("working with numbert %s and code %s", phoneNumber, countryCode)
      const response = await fetch(baseUrl + "verification/trigger", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          countryCode: countryCode,
          number: phoneNumber,
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

  // OTP value gets set in the Modal
  const handleOtpSubmit = async submittedOtp => {
    try {
      console.log("working OTP %s and SESSION %s", submittedOtp, sessionId)
      const response = await verifyConfirm(submittedOtp)
      console.log("Response Received from verifyConfirm", response)
      if (response.status == 200) {
        console.log("=response succesfuyl; for verification")
        setIsOtpModalOpen(false)
        //send user to cash-out page and optinally show a succes modal
        navigate("/cash-out")
      } else {
        console.log("response failure")
        setIsOtpModalOpen(false)
      }
    } catch (error) {
      setIsOtpModalOpen(false)
      console.log(error)
    }
  }

  const verifyConfirm = async submittedOtp => {
    try {
      console.log("VERIFyCONFIRM with otp %s and session %s", submittedOtp, sessionId)
      const verifyResponse = await fetch(baseUrl + "verification/confirm", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          sessionId: sessionId,
          verificationCode: submittedOtp,
        }),
      })
      const verifyData = await verifyResponse.json()
      console.log("verifyData is " + verifyData)
      return {
        status: verifyResponse.status,
        data: verifyData,
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Put all your API call functions here, like verify, verifyConfirm, etc.
  const handleCountryChange = e => {
    const [code, dialCode] = e.target.value.split("-")
    console.log("code is %s and dial is %s", code, dialCode)
    setCountryCode(code)
    setCountryCodesOption(e.target.value)
  }

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
                    <label>Country Code:</label>
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
          <OtpInputModal
            isOpen={isOtpModalOpen}
            onSubmit={handleOtpSubmit} // Define this function to handle OTP submission
            onClose={() => setIsOtpModalOpen(false)}
          />
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default Login
