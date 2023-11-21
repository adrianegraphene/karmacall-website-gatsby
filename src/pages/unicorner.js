import React, { useEffect, useState } from "react"
import googlePlayBadge from "../images/google-play-en.png"
import appStoreBadge from "../images/apple-en.png"
import "../components/unicorner.css"
import { graphql, Link, useStaticQuery } from "gatsby"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Img from "gatsby-image"

const Unicorner = () => {
  const data = useStaticQuery(graphql`
    query {
      lightLogo: file(relativePath: { eq: "fyncom-logo.png" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      darkLogo: file(relativePath: { eq: "fyncom-logo-white.png" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      fyncomFiltersWords: file(
        relativePath: { eq: "fyncom-filters-black.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 500, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      fyncomFiltersWordsDark: file(
        relativePath: { eq: "fyncom-filters-white.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 500, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  `)
  const fyncomFiltersWords = getImage(
    data.fyncomFiltersWords.childImageSharp.gatsbyImageData
  )
  const fyncomFiltersWordsDark = getImage(
    data.fyncomFiltersWordsDark.childImageSharp.gatsbyImageData
  )
  const lightLogo = data.lightLogo.childImageSharp.fixed
  const darkLogo = data.darkLogo.childImageSharp.fixed

  const [filterLogo, setFilterLogo] = useState(fyncomFiltersWords)
  const [logoData, setLogoData] = useState(lightLogo)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = e => {
        setFilterLogo(e.matches ? fyncomFiltersWordsDark : fyncomFiltersWords)
        setLogoData(e.matches ? darkLogo : lightLogo)
      }
      handleChange(mediaQuery) // Initial check
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [fyncomFiltersWords, fyncomFiltersWordsDark, lightLogo, darkLogo]);

  return (
    <div className="unicorner-container">
      <Seo
        title="For Unicorner's Eyes only"
        description="Hope you enjoyed that listing! This brief page shows you all of the service FynCom offers "
      />
      <Link to="/">
        <Img
          fixed={logoData}
          alt="FynCom Logo"
          className="fyncom-logo-header-image"
        />
      </Link>
      <h1>Spam Sucks!</h1>
      <h2>Get instantly paid to block bad emails & calls with...</h2>
      <Link to="/fyncom-filters-email-edition" className="fyncom-filters-image">
        <GatsbyImage image={filterLogo} alt="FynCom Filters" />
      </Link>

      <div className="info-section unicorner">
        <p>
          Save time & let us pay you to ignore those scam emails & calls! Be the
          first to know when our text / SMS blocking tech is ready by signing up
          to one of our apps today!
        </p>
        <ul className="info-list">
          <li>Calls</li>
          <ul className="calls-list">
            <li>
              Android.{" "}
              <a href="https://play.google.com/store/apps/details?id=com.fyncom.robocash">
                Free.
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.fyncom.robocash"
                className="store-badges"
              >
                <img
                  className="app-img"
                  src={googlePlayBadge}
                  alt="Get KarmaCall on Google Play"
                />
              </a>
            </li>
            <li>
              iOS.{" "}
              <a href="https://apps.apple.com/us/app/karmacall/id1574524278">
                $1.99 with 1 month trial.
              </a>
              <a
                href="https://apps.apple.com/us/app/karmacall/id1574524278"
                className="store-badges"
              >
                <img
                  className="app-img"
                  src={appStoreBadge}
                  alt="Download KarmaCall on the App Store"
                />
              </a>
            </li>
          </ul>
          <li>Emails</li>
          <ul className="emails-list">
            <li>
              Gmail.{" "}
              <Link to="/fyncom-filters-email-edition">
                Free for 1st 100 blocked emails per month.
              </Link>
            </li>
          </ul>
        </ul>
      </div>

      <div className="footer-section">
        <p>
          Our FynCom Filters work in the background to save you time and get you
          paid. To find out more about why we're doing this & why this is you
          paid. To find out more about why we're doing this & why this is the
          only real solution to spam & scams, see our story.
        </p>
        <Link to="/white-paper-original-scam-calls">our story</Link>
      </div>
    </div>
  )
}

export default Unicorner
