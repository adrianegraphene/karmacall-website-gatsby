import React, { useState, useEffect, useRef } from "react"
import "./header.css"
import { Link, graphql, useStaticQuery } from "gatsby"
import { helpItems } from "../../static/help-items"
import { FaBars } from "react-icons/fa"
import Img from "gatsby-image"

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef()
  const hamburgerRef = useRef() // Ref for the hamburger menu icon
  const toggleMenu = event => {
    event.stopPropagation()
    setMenuOpen(!isMenuOpen)
  }
  const data = useStaticQuery(graphql`
    query {
      fyncomLogoLight: file(relativePath: { eq: "fyncom-logo.png" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      fyncomLogoDark: file(relativePath: { eq: "fyncom-logo-white.png" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
    }
  `)

  // State to hold which logo to show
  const [logoData, setLogoData] = useState(
    data.fyncomLogoLight.childImageSharp.fixed
  )

  // Effect for setting the logo based on the system color scheme
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = e => {
        setLogoData(
          e.matches
            ? data.fyncomLogoDark.childImageSharp.fixed
            : data.fyncomLogoLight.childImageSharp.fixed
        )
      }
      handleChange(mediaQuery) // Initial check
      mediaQuery.addListener(handleChange) // Listen for changes
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [
    data.fyncomLogoLight.childImageSharp.fixed,
    data.fyncomLogoDark.childImageSharp.fixed,
  ])

  useEffect(() => {
    const closeMenu = event => {
      // Verify if the menu is open and if the click target is not within the menu
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false) // Close the mobile menu
      }
    }
    // todo may need this later - just takes the first 1/2 of a full click
    // document.addEventListener('mousedown', closeMenu); // Attach the event listener to the document
    // return () => {
    //   document.removeEventListener('mousedown', closeMenu); // Cleanup the event listener
    // };

    document.addEventListener("click", closeMenu)
    return () => {
      document.removeEventListener("click", closeMenu)
    }
  }, [isMenuOpen]) // Only re-run the effect if isMenuOpen changes

  return (
    <header className="header-top">
      <div className="header-container">
        <Link to="/">
          <div className="fyncom-logo-header">
            <Img fixed={logoData} alt="FynCom Logo" />
          </div>
        </Link>
        <div
          ref={hamburgerRef}
          className="mobile-menu-icon"
          onClick={toggleMenu}
        >
          <FaBars />
        </div>
        {/* Mobile Menu Panel */}
        <nav
          ref={menuRef}
          className={isMenuOpen ? "mobile-menu open" : "mobile-menu"}
        >
          <ul>
            <li className="mobile-menu-item dropdown">
              <span className="mobile-dropbtn">
                <Link to="/use-cases">Use Cases</Link>
              </span>
              <ul className="mobile-dropdown-content">
                <Link to="/marketing-use-cases">Marketing</Link>
                <Link to="/sales-use-cases">Sales</Link>
                <Link to="/understanding-customers-use-cases">
                  Understanding Customers
                </Link>
              </ul>
            </li>
            <li className="mobile-menu-item">
              <Link to="/about">About</Link>
            </li>
            <li className="mobile-menu-item">
              <Link to="/pricing">Pricing</Link>
            </li>
            <li className="mobile-menu-item">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="mobile-menu-item dropdown">
              <span className="mobile-dropbtn">
                <Link to="/help-center">Help</Link>
              </span>
              <ul className="mobile-dropdown-content">
                {helpItems.map(item => (
                  <Link
                    to={`/help-center/${
                      item.topicUrl
                    }?contentUrl=${encodeURIComponent(item.url)}`}
                    key={item.title}
                  >
                    {item.title}
                  </Link>
                ))}
              </ul>
            </li>
          </ul>
        </nav>

        <ul className="nav-links">
          <li className="dropdown">
            <Link to="/use-cases" className="dropbtn">
              Use Cases
            </Link>
            <div className="dropdown-content">
              <Link to="/marketing-use-cases">Marketing</Link>
              <Link to="/sales-use-cases">Sales</Link>
              <Link to="/understanding-customers-use-cases">
                Understanding Customers
              </Link>
            </div>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li className="dropdown">
            <Link to="/help-center" className="dropbtn">
              Help
            </Link>
            <div className="dropdown-content">
              {helpItems.map(item => (
                <Link
                  to={`/help-center/${
                    item.topicUrl
                  }?contentUrl=${encodeURIComponent(item.url)}`}
                  key={item.title}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </li>
        </ul>

        <div className="login-buttons">
          <a href="https://dashboard.fyncom.com/">
            <button className="business">Business Login</button>
          </a>
          <a href="https://app.fyncom.com/">
            <button className="user">User Login</button>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
