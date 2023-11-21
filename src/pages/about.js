import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../components/about.css"
import { graphql, Link, useStaticQuery } from "gatsby"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      teamMeeting: file(relativePath: { eq: "team-meeting.webp" }) {
        childImageSharp {
          gatsbyImageData(width: 486, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      innovation: file(relativePath: { eq: "icons/innovation.webp" }) {
        childImageSharp {
          gatsbyImageData(width: 150, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      collaboration: file(relativePath: { eq: "icons/collaboration.webp" }) {
        childImageSharp {
          gatsbyImageData(width: 150, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      transparency: file(relativePath: { eq: "icons/transparency.webp" }) {
        childImageSharp {
          gatsbyImageData(width: 150, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      customerFocus: file(relativePath: { eq: "icons/customer-focus.webp" }) {
        childImageSharp {
          gatsbyImageData(width: 150, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
      continuousImprovement: file(
        relativePath: { eq: "icons/continuous-improvement.webp" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 150, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  `)

  const teamMeeting = getImage(data.teamMeeting.childImageSharp.gatsbyImageData)
  const innovation = getImage(data.innovation.childImageSharp.gatsbyImageData)
  const collaboration = getImage(
    data.collaboration.childImageSharp.gatsbyImageData
  )
  const transparency = getImage(
    data.transparency.childImageSharp.gatsbyImageData
  )
  const customerFocus = getImage(
    data.customerFocus.childImageSharp.gatsbyImageData
  )
  const continuousImprovement = getImage(
    data.continuousImprovement.childImageSharp.gatsbyImageData
  )
  return (
    <div>
      <Seo
        title="About Us"
        description="Spam has plauged communications for decades. AI will accelerate that trend. Discover the FynCom solution to protect
       your mental clarity, help you stand out, and get people paid!"
      />
      <Header />
      <section className="mission-section">
        <h1>About Us</h1>
        <sub>
          At FynCom, our mission is to revolutionize the way organizations
          communicate and motivate their customers and partners. We believe that
          interactive rewards can drive engagement and improve performance in
          any type of organization. We are committed to delivering innovative
          solutions that help our clients succeed.
        </sub>
      </section>
      <section className="story-section">
        <div className={"story-image"}>
          <GatsbyImage image={teamMeeting} alt="Our Story" />
        </div>
        <div className="story-text">
          <h3>Our Story</h3>
          <p>
            FynCom's Rewards technology was invented to disrupt scam economics
            over phone calls with refundable cash deposits (
            <Link to="/white-paper-original-scam-calls">Read more here</Link>).
            As we spoke to businesses about our solution, we learned that
            getting responses to business communications is tough!
          </p>
          <p>
            So we modified our tech to create response generation technology
            that rewards prospects & customers when they respond to emails,
            calls, texts, surveys, and more. We saw incredible results from
            offering these immediate incentivized rewards, with tests showing a
            200% increase in cold-call pick ups and 500% increase in email
            response rates.
          </p>
          <p>
            That was enough to let us know there was value here. FynCom works
            over the top of any existing service and aims to be the Rewards
            layer of the internet, stopping spam & scams outright while allowing
            trust to grow again. We are here to be the best way of transferring
            financial value in response to communications, so{" "}
            <p2 className="p2-blue">Fyn</p2>
            <p2 className="text-wrapper-3-red">Com</p2> is short for "
            <p2 className="p2-blue">Fin</p2>ancial{" "}
            <p2 className="text-wrapper-3-red">Com</p2>munications".
          </p>
        </div>
      </section>
      <section className="values-header">
        <h2>Values</h2>
      </section>
      <section className="values-section">
        <div className="value">
          <GatsbyImage image={innovation} alt="Innovation" />
          <h4>Innovation</h4>
          <p>
            We are always looking for new ways to push the boundaries and
            deliver value to our clients.
          </p>
        </div>
        <div className="value">
          <GatsbyImage image={collaboration} alt="Collaboration" />
          <h4>Collaboration</h4>
          <p>
            We believe that great things can be achieved when we work together
            as a team.
          </p>
        </div>
        <div className="value">
          <GatsbyImage image={transparency} alt="Transparency" />
          <h4>Transparency</h4>
          <p>
            We are committed to open, honest communication and straightforward
            transparency.
          </p>
        </div>
        <div className="value">
          <GatsbyImage image={customerFocus} alt="Focus" />
          <h4>Customer focus</h4>
          <p>
            Our customers are at the heart of everything we do. We are dedicated
            to delivering the best possible experience for them. Focus is key.
          </p>
        </div>
        <div className="value">
          <GatsbyImage
            image={continuousImprovement}
            alt="Continuous Improvement"
          />
          <h4>Continuous improvement</h4>
          <p>
            We believe that there is always room for growth and improvement. We
            are committed to continuous learning and development.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default About
