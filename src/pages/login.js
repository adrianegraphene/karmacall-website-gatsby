import React, { useState, useEffect } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import Seo from "../components/seo"
import { useLocation } from "@reach/router"

const Login = () => {
  const [countryCode, setCountryCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const location = useLocation()

  useEffect(() => {
    // Get calling code or other actions on component mount
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    // Handle your form submission logic here
  }

  return (
    <div className="Referral">
      <Seo title="Login KarmaCall" description="A simple login page to let you manage your account" />
      <Header />
      <section>
        <div id="Phone Number Entry" className="network">
          <div className="container">
            <div className="col-md-2"></div>
            <form method="get" id="phoneNumberInput" onSubmit={handleSubmit}>
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
