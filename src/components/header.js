import React, { useState, useEffect, useRef } from "react"
import "./header.css"
import { Link } from "gatsby"
import { helpItems } from "../../static/help-items"
import { FaBars } from "react-icons/fa"
import Img from "gatsby-image"
import { useCombinedQuery } from "./useCombinedQuery"

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef()
  const hamburgerRef = useRef() // Ref for the hamburger menu icon
  const toggleMenu = event => {
    event.stopPropagation()
    setMenuOpen(!isMenuOpen)
  }

  const { fyncomProductLogoLight, fyncomProductLogoDark, karmacallLogoNoTaglineLight, karmacallLogoNoTaglineDark } = useCombinedQuery()
  // State to hold which logo to show
  const [logoData, setLogoData] = useState(fyncomProductLogoLight)
  const [karmacallLogoData, setKarmacallLogoData] = useState(karmacallLogoNoTaglineLight)

  // Effect for setting the logo based on the system color scheme
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = e => {
        setLogoData(e.matches ? fyncomProductLogoDark : fyncomProductLogoLight)
        setKarmacallLogoData(e.matches ? karmacallLogoNoTaglineDark : karmacallLogoNoTaglineLight)
      }
      handleChange(mediaQuery) // Initial check
      mediaQuery.addListener(handleChange) // Listen for changes
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [fyncomProductLogoLight, fyncomProductLogoDark, karmacallLogoNoTaglineDark, karmacallLogoNoTaglineLight])

  useEffect(() => {
    const closeMenu = event => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target) && !hamburgerRef.current.contains(event.target)) {
        setMenuOpen(false) // Close the mobile menu
      }
    }

    document.addEventListener("click", closeMenu)
    return () => {
      document.removeEventListener("click", closeMenu)
    }
  }, [isMenuOpen])

  return (
    <header className="header-top">
      <div className="header-container">
        <Link to="/">
          <div className="fyncom-logo-header">
            <Img className="left-header-logo" fixed={karmacallLogoData} alt="KarmaCall Logo" />
            <div className="arrow-container"></div>
            <Img className="right-header-logo" fixed={logoData} alt="FynCom Logo, which indicates that KarmaCall is built with FynCom tech" />
          </div>
        </Link>
        <div ref={hamburgerRef} className="mobile-menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
        {/* Mobile Menu Panel */}
        <nav ref={menuRef} className={isMenuOpen ? "mobile-menu open" : "mobile-menu"}>
          <ul>
            <li className="mobile-menu-item dropdown">
              <span className="mobile-dropbtn">
                <Link to="/use-cases">Use Cases</Link>
              </span>
              <ul className="mobile-dropdown-content">
                {/* todo - neeeds work on useful concepts here!*/}
                <Link to="/marketing-use-cases">Marketing</Link>
                <Link to="/sales-use-cases">Sales</Link>
                <Link to="/understanding-customers-use-cases">Understanding Customers</Link>
              </ul>
            </li>
            <li className="mobile-menu-item">
              <Link to="/about">About</Link>
            </li>
            <li className="mobile-menu-item">
              <Link to="/pricing">Pricing</Link>
            </li>
            {/* <li className="mobile-menu-item"> */}
            {/* <Link to="/blog">Blog</Link> */}
            {/* </li> */}
            <li className="mobile-menu-item dropdown">
              <span className="mobile-dropbtn">
                <Link to="/help-center">Help</Link>
              </span>
              <ul className="mobile-dropdown-content">
                {helpItems.map(item => (
                  <Link to={`/help-center/${item.topicUrl}?contentUrl=${encodeURIComponent(item.url)}`} key={item.title}>
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
              {/* todo - neeeds work on useful concepts here!*/}
              <Link to="/marketing-use-cases">Marketing</Link>
              <Link to="/sales-use-cases">Sales</Link>
              <Link to="/understanding-customers-use-cases">Understanding Customers</Link>
            </div>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          {/* todo setup blog to a KarmaCall section on FynCom */}
          {/* <li> */}
          {/* <Link to="/blog">Blog</Link> */}
          {/* </li> */}
          <li className="dropdown">
            <Link to="/help-center" className="dropbtn">
              Help
            </Link>
            <div className="dropdown-content">
              {helpItems.map(item => (
                <Link to={`/help-center/${item.topicUrl}?contentUrl=${encodeURIComponent(item.url)}`} key={item.title}>
                  {item.title}
                </Link>
              ))}
            </div>
          </li>
        </ul>
        {/*/!* NOTE: Getting rid of these buttons causes the menu to shift all the way to the end - consider margin right*!/*/}
        <div className="login-buttons">
          <Link to="/login">
            <button className="user">Login</button>
          </Link>
          {/* <a href="https://app.fyncom.com/"> */}
          {/* <button className="user">Login</button> */}
          {/* </a> */}
        </div>
      </div>
    </header>
  )
}

export default Header
