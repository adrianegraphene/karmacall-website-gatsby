import React from "react"
import "../components/contact.css"
import "../components/blocked-email.css"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {FaGift, FaFileAlt, FaSearch, FaSadCry } from "react-icons/fa"


export const SuccessModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Thank You!</h2>
        <p>{message}</p>
      </div>
    </div>
  )
}

export const FailureModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null
  return (
    <div className="modal-failure">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Submission Failed</h2>
        <p>{message}</p>
      </div>
    </div>
  )
}

export const MakeADepositModal = ({ onClose }) => {
  const data = useStaticQuery(graphql`
    query {
      nanoQrCode: file(relativePath: { eq: "DepositNanoQRCode.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 800, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  `)
  const nanoQrCode = getImage(data.nanoQrCode.childImageSharp.gatsbyImageData)
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Got nano?</h2>
        <p>Use "nano"-transactions!</p>
        <p>Deposit 0.1 nano to</p>
        <p className="nano-address">
          nano_1bf3r8pqfsutekxunazj895an8h84ai3ao1ftqyejqiul65p3xsb9k99kc1
        </p>
        <div className="qr-code-container">
          <GatsbyImage className={"nano-qr-code"}
            image={nanoQrCode}
            alt="QR Code of the nano address you should send your deposit to. nano_1bf3r8pqfsutekxunazj895an8h84ai3ao1ftqyejqiul65p3xsb9k99kc1"
          />
        </div>
      </div>
    </div>
  )
}

// Handle one click easy rewards
export const GiftCardSentToEmail = ({ isOpen, organizationName, onClose, urlRedirect }) => {
  if (!isOpen) return null;
  setTimeout(() => {
    window.location.href = urlRedirect;
  }, 10000);
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <FaGift size={80} />
        <h2>Whoo!</h2>
        <p>Your Reward will be sent to your email within 5 minutes.</p>
        <p>{organizationName}</p>
        <p>Thanks you!</p>
      </div>
    </div>
  );
};

export const GiftCardTxIdNotFound = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-failure">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="qr-code-container">
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <FaFileAlt size={50} />
            <FaSearch
              size={30}
              style={{
                position: 'absolute',
                bottom: 0,
                right: -10,
                color: 'red' // You can adjust the color as needed
                //rgba(var(--fyncom-red-rgb), 0.5) // adjust to this later
              }}
            />
          </div>
        </div>
        <h2>Transaction not found</h2>
        <p>Sorry, we are unable to locate this transaction ID. Please send an email to support@fyncom.com if you think this is wrong.</p>
      </div>
    </div>
  );
};

export const GiftCardNotEnoughBalance = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  setTimeout(() => {
    window.location.href = 'https://www.fyncom.com/about-the-fyncom-team';
  }, 8000);
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <FaSadCry size={80}/>
        <h2>Low Balance.</h2>
        <p>It looks like your balance is not enough to purchase this.</p>
      </div>
    </div>
  );
};
