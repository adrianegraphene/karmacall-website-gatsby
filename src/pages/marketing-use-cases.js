import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../components/sales-and-marketing-use-cases.css"
import Seo from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const MarketingUseCases = () => {
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
      handshake: file(relativePath: { eq: "illustrations/handshake.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 1000
            layout: CONSTRAINED
            placeholder: BLURRED
          )
        }
      }
      collaborate: file(
        relativePath: { eq: "illustrations/collaborating-with-others.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 375, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      effectiveSpend: file(
        relativePath: { eq: "illustrations/create-efficient-costs.png" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 375, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      integrations: file(
        relativePath: { eq: "illustrations/integrate-with-emails-and-more.png" }
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
  const handshake = getImage(data.handshake.childImageSharp.gatsbyImageData)
  const collaborate = getImage(data.collaborate.childImageSharp.gatsbyImageData)
  const effectiveSpend = getImage(
    data.effectiveSpend.childImageSharp.gatsbyImageData
  )
  const integrations = getImage(
    data.integrations.childImageSharp.gatsbyImageData
  )

  return (
    <div className="marketing-use-cases">
      <Seo
        title="Marketing Use Cases"
        description="FynCom helps you increase customer engagement and increase customer loyalty by offering incentivized rewards along the sales funnel to
        encourage your audience to learn more about your products and offerings"
      />
      <Header />
      <div className="hero-section">
        <GatsbyImage
          image={handshake}
          alt="Close deals more quickly with FynCom Rewards"
        />
        <div className="hero-content">
          <h1>Increase Customer Engagement</h1>
          <p>
            Guide your customers along the customer journey and support the
            sales team by finding qualified leads
          </p>
          <a href="https://calendly.com/adrian-fyncom/30min">
            <button className="demo-button">Request Demo</button>
          </a>
        </div>
      </div>

      <div className="use-cases-sales-marketing-container">
        <div className="use-case">
          <GatsbyImage
            image={integrations}
            alt="integrate into your basis digital tools"
          />
          <h2>Seamless Integration</h2>
          <p>
            We work with you to integrate FynCom to your web page and marketing
            communications
          </p>
        </div>
        <div className="use-case">
          <GatsbyImage
            image={collaborate}
            alt="work on revenue goals more effectively with your team"
          />
          <h2>Encourage Learning</h2>
          <p>
            Encourage your customers to learn more about your product and
            offerings by providing incentives along the way
          </p>
        </div>
        <div className="use-case">
          <GatsbyImage
            image={effectiveSpend}
            alt="easily see your costs per response"
          />
          <h2>Minimize Spend</h2>
          <p>
            Only pay for rewards when your customers move to the next phase of
            your customer journey
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
          Drive engagement and convert MQLs into SQLs by nudging leads to
          respond to emails, book meetings, & express intent with FynCom's
          action-oriented rewards
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

export default MarketingUseCases
