import React, { useState, useEffect } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import { graphql, Link, useStaticQuery } from "gatsby"
import { FaRobot, FaDollarSign, FaBan, FaPiggyBank, FaUserShield } from "react-icons/fa"
import "../components/index.css"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlockSpamEarnCash = () => {
  const data = useStaticQuery(graphql`
    query {
      fyncomFilterGmail: file(relativePath: { eq: "fyncom_filters_gmail_edition_no_logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      appStoreBadge: file(relativePath: { eq: "apple-en.png" }) {
        childImageSharp {
          gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      googlePlayBadge: file(relativePath: { eq: "google-play-en.png" }) {
        childImageSharp {
          gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      fyncomFilterGmailDark: file(relativePath: { eq: "fyncom_filters_gmail_edition_no_logo-white.png" }) {
        childImageSharp {
          gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      karmaCall: file(relativePath: { eq: "karmacall-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      karmaCallDark: file(relativePath: { eq: "karmacall-logo-white.png" }) {
        childImageSharp {
          gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      tinderLogo: file(relativePath: { eq: "logos/tinder-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 320, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      discordLogo: file(relativePath: { eq: "logos/Discord-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      telegramLogo: file(relativePath: { eq: "logos/telegram-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 135, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      heroKarmaCallImage: file(relativePath: { eq: "karmacall-site/calling_phone.svg" }) {
        publicURL
      }
      standingKarmaCallPost: file(relativePath: { eq: "karmacall-site/subscriber_footstool.svg" }) {
        publicURL
      }
      oneMillionCups: file(relativePath: { eq: "karmacall-site/1-million-cups-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 500, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      oneMillionCupsDark: file(relativePath: { eq: "karmacall-site/1-million-cups-white-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 500, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      disruptionBanking: file(relativePath: { eq: "karmacall-site/disruption-banking-logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 500, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      disruptionBankingDark: file(relativePath: { eq: "karmacall-site/disruption-banking-logo-white.webp" }) {
        childImageSharp {
          gatsbyImageData(width: 500, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      evonexus: file(relativePath: { eq: "karmacall-site/evonexus-logo_dark.svg" }) {
        publicURL
      }
      evonexusDark: file(relativePath: { eq: "karmacall-site/evonexus-logo_light.svg" }) {
        publicURL
      }
      smugLady: file(relativePath: { eq: "karmacall-site/smug-lady-phone.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      harold: file(relativePath: { eq: "karmacall-site/harold-getting-a-call.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      happyLady: file(relativePath: { eq: "karmacall-site/smiling-lady-on-phone.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 300, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  `)
  // todo fix  harodl
  const filterImage = getImage(data.fyncomFilterGmail.childImageSharp.gatsbyImageData)
  const filterImageDark = getImage(data.fyncomFilterGmailDark.childImageSharp.gatsbyImageData)
  const tinderLogo = getImage(data.tinderLogo.childImageSharp.gatsbyImageData)
  const discordLogo = getImage(data.discordLogo.childImageSharp.gatsbyImageData)
  const telegramLogo = getImage(data.telegramLogo.childImageSharp.gatsbyImageData)
  const karmacallImage = getImage(data.karmaCall.childImageSharp.gatsbyImageData)
  const karmacallImageDark = getImage(data.karmaCallDark.childImageSharp.gatsbyImageData)
  const oneMillionCups = getImage(data.oneMillionCups.childImageSharp.gatsbyImageData)
  const oneMillionCupsDark = getImage(data.oneMillionCupsDark.childImageSharp.gatsbyImageData)
  const disruptionBanking = getImage(data.disruptionBanking.childImageSharp.gatsbyImageData)
  const disruptionBankingDark = getImage(data.disruptionBankingDark.childImageSharp.gatsbyImageData)
  const appStoreBadge = getImage(data.appStoreBadge.childImageSharp.gatsbyImageData)
  const googlePlayBadge = getImage(data.googlePlayBadge.childImageSharp.gatsbyImageData)
  const smugLady = getImage(data.smugLady.childImageSharp.gatsbyImageData)
  const harold = getImage(data.harold.childImageSharp.gatsbyImageData)
  const happyLady = getImage(data.happyLady.childImageSharp.gatsbyImageData)

  // Use state to keep track of the images for the current theme
  const [filterLogo, setFilterLogo] = useState(filterImage)
  const [karmacallLogo, setKarmacallLogo] = useState(karmacallImage)
  const [disruptionBankingLogo, setDisruptionBankingLogo] = useState(disruptionBanking)
  const [oneMillionCupsLogo, setOneMillionCupsLogo] = useState(oneMillionCups)
  const [evonexusLogo, setEvonexusLogo] = useState(data.evonexus.publicURL)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      // const handleChange = () => setIsDarkMode(mediaQuery.matches);
      const handleChange = e => {
        setFilterLogo(e.matches ? filterImageDark : filterImage)
        setKarmacallLogo(e.matches ? karmacallImageDark : karmacallImage)
        setDisruptionBankingLogo(e.matches ? disruptionBankingDark : disruptionBanking)
        setOneMillionCupsLogo(e.matches ? oneMillionCupsDark : oneMillionCups)
        setEvonexusLogo(e.matches ? data.evonexusDark.publicURL : data.evonexus.publicURL)
      }
      // setIsDarkMode(mediaQuery.matches);
      handleChange(mediaQuery) // Initial check
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [
    karmacallImage,
    karmacallImageDark,
    disruptionBanking,
    disruptionBankingDark,
    oneMillionCups,
    oneMillionCupsDark,
    data.evonexusDark.publicURL,
    data.evonexus.publicURL,
  ])

  return (
    <div>
      <Seo title="KarmaCall" />
      <Header />
      <section>
        <div className="parent-container">
          <div className="AppText">
            <div className="social-media-container">
              <div className="logo-container">
                <div className="bottom-logo">
                  <img src={data.heroKarmaCallImage.publicURL} className={"hero-index-image"} alt="A simple app that pays you to block scam calls." />
                </div>
              </div>
              <div className="text-block">
                <h1>Get Paid to Block Scam Calls.</h1>
                <h2>Cash out with no limits</h2>
                <p>
                  Hang up on scam phone call and take the caller's deposit! Get immediate financial revenge against scammers who waste your time. Join us in the
                  fight against malicious phone spammers by downloading KarmaCall today.
                </p>
              </div>
            </div>
          </div>
          <div className={"app-store-row"}>
            <a href="https://play.google.com/store/apps/details?id=com.fyncom.robocash">
              <GatsbyImage className="app-img-index" image={googlePlayBadge} alt="Get KarmaCall on Google Play" />
            </a>
            <a href="https://apps.apple.com/us/app/karmacall/id1574524278">
              <GatsbyImage className="app-img-index" image={appStoreBadge} alt="Download KarmaCall on the App Store" />
            </a>
          </div>
        </div>

        <div className="AppText">
          <div className="social-media-container">
            <div className="text-block-left">
              <h2 className="text-wrapper-5">
                Your Refundable Paywall. <br />
                Your <span className="underline-karma">Karma</span>Call.
              </h2>
              <div className={"values-column"}>
                <div className="value-row">
                  <div className="icon-container">
                    {/* <div className="logo-container"> */}
                    <FaDollarSign />
                  </div>
                  <div className="text-container">
                    <h4>Get Paid!</h4>
                    <p>For every call we reject, you get paid Nano. Instantly. Cash-out at any time.</p>
                  </div>
                </div>
                <div className="value-row">
                  <div className="icon-container">
                    <FaRobot />
                  </div>
                  <div className="text-container">
                    <h4>End AI Scams</h4>
                    <p>Scammers depend on you answering your phone. As long as your phone number works, you will get scam calls. We can stop that.</p>
                  </div>
                </div>
                <div className="value-row">
                  <div className="icon-container">
                    <FaUserShield />
                  </div>
                  <div className="text-container">
                    {/* /want to change this up a bit to focus on sanity / mental wellness / uniqueness */}
                    <h4>Your mind. Your time.</h4>
                    <p>Your data is valuable. We make sure you get paid for your data and time.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="logo-container hero">
              <div className="bottom-logo">
                <img src={data.standingKarmaCallPost.publicURL} className={"hero-index-image"} alt="A simple app that pays you to block scam calls." />
              </div>
            </div>
          </div>
        </div>
        <div className="payments-container">
          <p className="payment-text">
            108667 payments have been made for rejected calls so far. What are you waiting for? Download the app and get paid! See these payments happening in
            real-time.
          </p>
        </div>

        {/* Features Section Row */}
        <div>
          <h2 className="centered">
            What kind of calls will I get with <span className="semi-barlow-extra-bold">Karma</span>
            <span className="semi-barlow-extra-light">Call</span>?
          </h2>
          <p className="values-container-sub">In addition to getting normal calls from your contacts...</p>
        </div>
        <div className="use-cases-sales-marketing-container">
          <div className="use-case">
            <GatsbyImage image={smugLady} alt="Increase bookings with rewards before and after a meeting" />
            <h2>Blocked</h2>
            <sub className="sub-features">Instant CashBack!</sub>
            <p>Your phone will not ring. The call is sent to voicemail and we instantly pay you as thanks for fighting scams!</p>
          </div>
          <div className="use-case">
            <GatsbyImage image={harold} alt="Accelerate Deals with customer journey rewards" />
            <h2>Refundable</h2>
            <sub className="sub-features">Possible Good Call</sub>
            <p>The caller made a $0.05 deposit! Answer & stay on for 25 seconds to give them a full refund. Hang up early to keep their deposit.</p>
          </div>
          <div className="use-case">
            <GatsbyImage image={happyLady} alt="Min / max the value you give based on the revenue you generate" />
            <h2>Cash</h2>
            <sub className="sub-features">Reverse Pay Phone</sub>
            <p>This person's willing to continually pay you to stay on the phone, like a reverse pay-phone!</p>
          </div>
          {/* todo put this column  */}
          <div className="use-case">
            <GatsbyImage image={happyLady} alt="Min / max the value you give based on the revenue you generate" />
            <h2>Contact</h2>
            <sub className="sub-features">Regular call from contacts</sub>
            <p>If the Caller is on your contacts list, your phone rings right away. Contacts are not affected by KarmaCall.</p>
          </div>
        </div>

        <div className="AppText">
          <div className="social-media-container">
            <div className="text-block-left">
              <h2 className="text-wrapper-5">
                Are your customers getting <span className="underline-red">phished</span>?
              </h2>
              <p>
                {" "}
                Stop scams with refundable deposits. Our tech asks unknown senders to risk losing money to your audience before they can reach them. Click the
                images to learn more.
              </p>
            </div>
            <div className="logo-container">
              <div className="top-logos-left">
                <Link to="/fyncom-filters-email-edition" className="index-links">
                  <GatsbyImage image={filterLogo} alt="block bad emails automatically & get paid." />
                </Link>
                <a href="https://www.karmacall.com" className="index-links">
                  <GatsbyImage image={karmacallLogo} alt="Get paid to block scam calls!" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="AppText">
          <div className="social-media-container communities">
            <div className="logo-container">
              <div className="top-logos communities">
                <GatsbyImage image={discordLogo} alt="Discord" />
                <GatsbyImage image={telegramLogo} alt="Telegram" />
              </div>
              <div className="bottom-logo community">
                <GatsbyImage image={tinderLogo} alt="Tinder" />
              </div>
            </div>
            <div className="text-block">
              <h2 className="text-wrapper-5">
                Too many <span className="underline-red">abusive DMs</span> in your communities?
              </h2>
              <p>
                {" "}
                Your community loves making connections, but not with scammers &amp; imposters. Help mods by adding FynCom&#39;s Direct Message tech into your
                Discord, Telegram, or other chat-based community. Bonus - your users make $$ for every blocked spam DM!{" "}
                <span className="span">
                  <a href="mailto:support@fyncom.com?subject=FynCom DMs">Contact us</a>
                </span>
              </p>
            </div>
          </div>
        </div>

        <section className="why-fyncom">
          <h2 className="text-wrapper-5">Why FynCom?</h2>
          <p>
            Our company is built around refundable deposits as a tool to create trust between unknown parties in digital communications. Protect yourself from
            unwanted communications & get the power to put a monetary value to your time & data. <br />
            <Link to="/white-paper-original-scam-calls">Read More</Link>
          </p>
        </section>

        <section className="why-fyncom">
          <h2 className="underline">Give the Gift of Cash-Back for Scam Blocking</h2>
          <p>
            Our company is built around refundable deposits as a tool to create trust between unknown parties in digital communications. Protect yourself from
            unwanted communications & get the power to put a monetary value to your time & data. <br />
            <a href="https://calendly.com/adrian-fyncom/30min">
              <button className="learn-more-btn">Sieze The Day!</button>
            </a>
          </p>
        </section>
      </section>
      <Footer />
    </div>
  )
}

export default BlockSpamEarnCash
