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
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [destinationAccount, setDestinationAccount] = useState("")
  const sessionId = localStorage.getItem("sessionId")
  const phoneNumber = localStorage.getItem("phoneNumber")
  const countryCode = localStorage.getItem("countryCode")
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

  const handleNanoWithdraw = async event => {
    event.preventDefault()
    try {
      const response = await sendNano(withdrawAmount, destinationAccount)
      console.log("sendNano response successful with response ", response)
      if (!isBlank(response.transactionId)) {
        //todo add modal here.
        alert("Nano successfully sent!")
      }
    } catch (err) {
      console.log(err)
    }
  }

  // next updates
  const handleGiftCardWithdraw = async event => {
    event.preventDefault()
    alert("Coming soon!")
    // try {
    //   const response = await sendNano(withdrawAmount, destinationAccount)
    //   console.log("sendNano response successful with response ", response)

    //   if (!isBlank(response.transactionId)) {
    //     alert("Nano successfully sent!")
    //   }
    // } catch (err) {
    //   console.log(err)
    // }
  }

  const sendNano = async (amountToSend, accountToSendTo) => {
    var myNanoBalance
    myNanoBalance = localStorage.getItem("nanoBalance")
    return new Promise((resolve, reject) => {
      if (amountToSend > myNanoBalance) {
        console.log("This is more Nano than you have in your account")
        // todo setup a Modal for this.
        // alert("This is more Nano than you have in your account")
      }
      fetch(`${url}nano/userSend`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          amount: amountToSend,
          countryCode: countryCode,
          destinationAddress: accountToSendTo,
          sessionId: sessionId,
          sourceAddress: nanoAccount,
          userPhoneNumber: phoneNumber,
        }),
      })
        .then(res => {
          console.log(res)
          return res.json()
        })
        .then(data => {
          resolve(data)
        })
        .catch(error => reject(error))
    })
  }

  // todo move this into a helper method later.
  function isBlank(str) {
    return !str || /^\s*$/.test(str)
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
          <form method="get" id="nanoAccountWithDraw" onSubmit={handleNanoWithdraw}>
            <p>Withdraw to external nano account</p>
            <div>
              <p>
                <input
                  type="text"
                  name="withdrawAmount"
                  className="form-control width100"
                  placeholder="Enter amount of Nano"
                  value={withdrawAmount}
                  onChange={e => setWithdrawAmount(e.target.value)}
                />
              </p>
              <p>
                <input
                  type="text"
                  name="externalNanoAccount"
                  className="form-control width100"
                  placeholder="Enter destination Nano account"
                  value={destinationAccount}
                  onChange={e => setDestinationAccount(e.target.value)}
                />
              </p>
            </div>
            <button className="learn-more-btn ">Submit</button>
          </form>
          <form method="post" id="giftCardCashOut" onSubmit={handleGiftCardWithdraw}>
            <button className="submit-btn"> Cash Out To Gift Cards </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CashOut
