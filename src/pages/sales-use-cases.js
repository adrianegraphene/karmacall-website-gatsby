import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../components/sales-and-marketing-use-cases.css"
import Seo from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const SalesUseCases = () => {
  const data = useStaticQuery(graphql`
    query {
      sendgrid: file(relativePath: { eq: "logos/SG_Twilio_Lockup_RGBx1.png" }) {
        childImageSharp {
          gatsbyImageData(width: 600, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      slicktext: file(
        relativePath: { eq: "logos/SlickText_Logo-Transparent.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 600, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      zapier: file(relativePath: { eq: "logos/2560px-Zapier_logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 600, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      salesHeroImage: file(
        relativePath: { eq: "illustrations/sales-phone-calls.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 800, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      increaseBookings: file(
        relativePath: { eq: "illustrations/increase-bookings.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 375, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      accelerateDeals: file(
        relativePath: { eq: "illustrations/deal-acceleration-charts.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 375, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      minMax: file(
        relativePath: {
          eq: "illustrations/min-max-gift-rewards-value-mobile.png"
        }
      ) {
        childImageSharp {
          gatsbyImageData(width: 375, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  `)
  const sendgrid = getImage(data.sendgrid.childImageSharp.gatsbyImageData)
  const slicktext = getImage(data.slicktext.childImageSharp.gatsbyImageData)
  const zapier = getImage(data.zapier.childImageSharp.gatsbyImageData)
  const salesHeroImage = getImage(
    data.salesHeroImage.childImageSharp.gatsbyImageData
  )
  const increaseBookings = getImage(
    data.increaseBookings.childImageSharp.gatsbyImageData
  )
  const accelerateDeals = getImage(
    data.accelerateDeals.childImageSharp.gatsbyImageData
  )
  const minMax = getImage(data.minMax.childImageSharp.gatsbyImageData)

  return (
    <div className="sales-use-cases">
      <Seo
        title="Sales Use Cases"
        description="Getting your sales team to hit their targets is hard. FynCom helps you close more deals by using rewards at key stages of your sales process."
      />
      <Header />
      <div className="hero-section">
        <GatsbyImage
          image={salesHeroImage}
          alt="use rewards at each touchpoint to keep leads moving down through the customer journey"
        />
        <div className="hero-content">
          <h1>Accelerate Sales</h1>
          <p>
            Close more deals with customers by using interactive rewards at key
            stages of your sales process
          </p>
          <a href="https://calendly.com/adrian-fyncom/30min">
            <button className="demo-button">Request Demo</button>
          </a>
        </div>
      </div>

      <div className="use-cases-sales-marketing-container">
        <div className="use-case">
          <GatsbyImage
            image={increaseBookings}
            alt="Increase bookings with rewards before and after a meeting"
          />
          <h2>Increase Bookings</h2>
          <p>
            Incentivize your prospective buyers to book time with you by
            offering rewards for scheduling meetings
          </p>
        </div>
        <div className="use-case">
          <GatsbyImage
            image={accelerateDeals}
            alt="Accelerate Deals with customer journey rewards"
          />
          <h2>Accelerate Deals</h2>
          <p>
            Move prospective clients through your sales journey by providing
            rewards for reaching the next stage
          </p>
        </div>
        <div className="use-case">
          <GatsbyImage
            image={minMax}
            alt="Min / max the value you give based on the revenue you generate"
          />
          <h2>Min/Max Gifts/Value</h2>
          <p>
            Only pay for rewards when your sales target moves along to the next
            stage of your sales journey
          </p>
        </div>
      </div>

      <div className="integrations-section">
        <h2 className="background-stripe">Popular Integrations</h2>
        <div className="logos-container">
          <GatsbyImage image={sendgrid} alt="SendGrid" className={"logo"} />
          <GatsbyImage image={slicktext} alt="SlickText" className={"logo"} />
          <GatsbyImage image={zapier} alt="Zapier" className={"logo"} />
        </div>
      </div>

      <div className="call-to-action">
        <h2>
          Accelerate sales pipeline & hit revenue targets by using
          action-oriented rewards to guide prospects through your funnels
        </h2>
        <a
          href="https://calendly.com/adrian-fyncom/30min"
          className="cta-button"
        >
          Request Demo
        </a>
      </div>

      <Footer />
    </div>
  )
}

export default SalesUseCases
