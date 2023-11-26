import React, { useState, useEffect } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import Seo from "../components/seo"
import { useLocation } from "@reach/router"
import { Link } from "gatsby"
import { navigate } from "gatsby" // or useNavigate from react-router-dom

const Login = () => {
  const [countryCode, setCountryCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [otp, setOtp] = useState("")
  const [countryCodes, setCountryCodes] = useState([])
  const location = useLocation()

  useEffect(() => {
    // Fetch country codes or other initial data here
    // setCountryCodes(...) after fetching
    getCallingCode()
  }, [])

  const handlePhoneSubmit = async event => {
    event.preventDefault()
    try {
      const response = await triggerVerification(phoneNumber, countryCode)
      console.log("response is ", response)
      setSessionId(response.sessionId)
      // prompt user for OTP here, then call verifyConfirm
    } catch (error) {
      console.log(error)
    }
  }

  const handleOtpSubmit = async event => {
    event.preventDefault()
    try {
      const response = await verifyConfirm(sessionId, otp)
      console.log("Response Received from verifyConfirm", response)
      // handle the rest of the process
    } catch (error) {
      console.log(error)
    }
  }

  // Put all your API call functions here, like verify, verifyConfirm, etc.

  //

  const handleSubmit = async event => {
    event.preventDefault()
    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    })

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          countryCode: countryCode,
          number: phoneNumber,
          // Include any other body data required by your API
        }),
      })

      const data = await response.json()

      // Handle response data and navigate accordingly
      // For example, if a user needs to be navigated to a 'cash-out' page after successful phone number confirmation:
      if (data.success) {
        navigate("/cash-out")
        // <Link to="cash-out">Cash out</Link>
      } else {
        // Handle errors or unsuccessful operations here
        console.error("An error occurred:", data.message)
      }
    } catch (error) {
      console.error("Network error:", error)
      // Handle network errors or show a message to the user
    }
  }

  // This function will be used to get the user's country code on load
  const getCallingCode = () => {
    // Fetch the country code based on the user's IP
    const url = "https://api.ipgeolocation.io/ipgeo?apiKey=9d0005d72b1a45619e83ccb9446e930b"
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        country = data.country_code2
        setCallingCode(country)
      })
      .catch(err => {
        // Do something for an error here
      })
  }

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
    <div className="Referral">
      <Seo title="Login KarmaCall" description="A simple login page to let you manage your account" />
      <Header />
      <section>
        <div id="Phone Number Entry" className="network">
          <div className="container">
            <div className="col-md-2"></div>
            <form method="get" id="phoneNumberInput" onSubmit={handlePhoneSubmit}>
              <div>
                <p>
                  <label>Country Code:</label>
                  <select name="countryCodes" id="countryCodes" value={countryCode} onChange={e => setCountryCode(e.target.value)}>
                    {/* Options here */}
                  </select>
                </p>
                <p style={{ alignContent: "center" }}>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter Phone Number"
                    style={{ maxWidth: "100%" }}
                    className="form-control"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </p>
              </div>
              <div className="input-group-btn">
                <p style={{ alignContent: "center" }}>
                  <span className="input-group-btn">
                    <button type="submit" style={{ backgroundColor: "#54b07c", maxWidth: "100%" }} className="btn btn-info">
                      Confirm Phone Number
                    </button>
                  </span>
                </p>
              </div>
            </form>
            <h3 style={{ alignContent: "center" }}>
              <a style={{ WebkitTextFillColor: "black" }} href="/login-email">
                Click here to login with email
              </a>
            </h3>
            <div className="col-md-2"></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Login
