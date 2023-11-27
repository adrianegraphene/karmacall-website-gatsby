import React, { useState, useEffect, useLocation } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../components/sales-and-marketing-use-cases.css"
import Seo from "../components/seo"

const CashOut = () => {
  const [userDetails, setUserDetails] = useState(null)
  const [dynamicMessage, setDynamicMessage] = useState("Your USD Balance is $0.00")
  const [userId, setUserId] = useState("")
  const [nanoAccount, setNanoAccount] = useState("")
  let url = `${process.env.GATSBY_API_URL}`
  let baseUrl = `${process.env.GATSBY_API_URL_BASE}`
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  useEffect(() => {
    const account = localStorage.getItem("nanoAccount")
    if (account !== null) {
      updateMessage(account, "USD")
    }
    setNanoAccount(account)
  }, [])

  // need to get this user's nano account
  const updateMessage = async (nanoAccount, fiatType) => {
    try {
      const response = await fetch(`${baseUrl}nano/user/balance/${nanoAccount}/${fiatType}`, {
        method: "GET",
        headers: headers,
      })
      if (response.ok) {
        const data = await response.json()
        const accountBalanceInNano = data.accountBalanceInNano
        const accountBalanceInFiat = data.accountBalanceInFiat
        const currencyType = data.currencyType
        const nanoUsdRate = data.rate
        setUserDetails(data)
        // TODO - get the currency type from the country code or user preferences
        // TODO - setup the Currency denominator to match the currency type
        const newMessage = `<p>Your USD balance is $<span class="emphasis">${accountBalanceInFiat}</span></p> <p>Your nano balance is Ӿ<span class="emphasis">${accountBalanceInNano}</span></p>`
        setDynamicMessage(newMessage)
      } else {
        throw new Error("Failed to fetch user details")
      }
    } catch (error) {
      console.error("ERROR", error)
    }
  }

  return (
    <div className="cash-out">
      <Seo title="Wallet Page" description="Manage your KarmaCall account here." />
      <Header />
      <div className="AppText">
        <div className="text-content">
          <h1>Cash Out</h1>
          <p>Copy in the nano account where you would like to send your nano to.</p>
          <div className="html-dynamic" dangerouslySetInnerHTML={{ __html: dynamicMessage }}></div>
          {/* <p id="nanoBalanceText"></p> */}
          {/* <p id="nanoAccountText"></p> */}
          <form method="get" id="nanoAccountWithDraw">
            <p>Withdraw to external nano account (enter amount after pressing submit) </p>
            <div>
              <p>
                <input name="externalNanoAccount" id="externalNanoAccount" class="form-control width100" placeholder="Enter nano Account" />
              </p>
            </div>
            <button className="learn-more-btn ">Submit</button>
          </form>
          <form method="post" id="giftCardCashOut">
            <button className="submit-btn"> Cash Out To Gift Cards </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CashOut
