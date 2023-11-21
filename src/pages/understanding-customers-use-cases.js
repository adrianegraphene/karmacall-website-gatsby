import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../components/sales-and-marketing-use-cases.css"
import Seo from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const UnderstandingCustomersUseCase = () => {
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
      customerHeroImage: file(
        relativePath: { eq: "illustrations/marketing-mobile-survey.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 600, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      seamlessIntegrations: file(
        relativePath: { eq: "illustrations/seamless-integrations-comfy.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 375, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      loyalCustomers: file(
        relativePath: { eq: "illustrations/identifying-loyal-customers.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 375, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      driveAdoption: file(
        relativePath: { eq: "illustrations/customer-journey-optimization.png" }
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
  const customerHeroImage = getImage(
    data.customerHeroImage.childImageSharp.gatsbyImageData
  )
  const seamlessIntegrations = getImage(
    data.seamlessIntegrations.childImageSharp.gatsbyImageData
  )
  const loyalCustomers = getImage(
    data.loyalCustomers.childImageSharp.gatsbyImageData
  )
  const driveAdoption = getImage(
    data.driveAdoption.childImageSharp.gatsbyImageData
  )

  return (
    <div className="understanding-customers-use-cases">
      <Seo
        title="Understanding Customers Use Cases"
        description="Using Micro Rewards throughout your customer journey to keep them coming back to you!"
      />
      <Header />
      <div className="hero-section">
        <GatsbyImage
          image={customerHeroImage}
          alt="use micro-rewards to keep customers moving down through their journey"
        />
        <div className="hero-content">
          <h1>Get to know your customers</h1>
          <p>
            Incentivize customers to complete their onboarding journey in order
            to understand product barriers{" "}
          </p>
          <a href="https://calendly.com/adrian-fyncom/30min">
            <button className="demo-button">Request Demo</button>
          </a>
        </div>
      </div>

      <div className="use-cases-sales-marketing-container">
        <div className="use-case">
          <GatsbyImage
            image={seamlessIntegrations}
            alt="integrate rewards into the hardest parts of your customer journey"
          />
          <h2>Seamless Integration</h2>
          <p>
            We work with you to provide rewards for customers completing type
            form surveys
          </p>
        </div>
        <div className="use-case">
          <GatsbyImage
            image={loyalCustomers}
            alt="find the traits of your most loyal customers more quickly"
          />
          <h2>Identify Loyal Customers</h2>
          <p>Reward your loyal customers and drive referrals </p>
        </div>
        <div className="use-case">
          <GatsbyImage
            image={driveAdoption}
            alt="using rewards at the hardest part of your product onboarding is key"
          />
          <h2>Drive Adoption & Onboarding</h2>
          <p>
            Properly timed incentives guide your customers' journeys and
            encourage long-term usage
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

export default UnderstandingCustomersUseCase
