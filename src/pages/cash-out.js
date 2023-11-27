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

  useEffect(() => {
    setNanoAccount(localStorage.getItem("nanoAccount"))
    if (nanoAccount !== null) {
      console.log("nano account %s", nanoAccount)
      // this has a nano account in it
      updateMessage(nanoAccount)
    } else {
      console.log("no nano account - redirect user to sign in")
    }
  }, [])

  // need to get this user's nano account
  const updateMessage = async nanoAccount => {
    let newUrl = `${process.env.GATSBY_API_URL}nano/user/balance/${nanoAccount}`
    try {
      const response = await fetch(newUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      // todo NOTE: This might be an issue due to no AuthId
      if (response.ok) {
        const data = await response.json()
        const accountBalanceInNano = data.accountBalanceInNano
        const accountBalanceInUSD = data.accountBalanceInUSD
        const nanoUsdRate = data.rate
        console.log("deposit paid status: " + JSON.stringify(data))
        const secondaryLabel = data.emailLabel ? data.emailLabel : "FynFiltered"
        const fynMail = "FynMail"
        setUserDetails(data)
        const newMessage = `<p>Your USD balance is $(<span class="emphasis">${data.accountBalanceInUSD}</span>) </p>
             <p>Your nano balance is (<span class="emphasis">${data.accountBalanceInNano}</span>) </p>`
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
