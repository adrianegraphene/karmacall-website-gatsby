import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../components/white-paper.css"
import termsOfService from "../../static/pdfs/FynCom- Platform Terms of Service _CLEAN_ - 20220117.pdf"
import Seo from "../components/seo"
import PdfContent from "../components/PdfContent"

const TermsOfService = () => {
  return (
    <div>
      <Seo
        title="Terms of Service"
        description="FynComs Terms of Service are listed here."
      />
      <Header />
      <div className="content-container">
        <h1>FynCom's Terms of Service</h1>
        <PdfContent file={termsOfService} />
      </div>
      <Footer />
    </div>
  )
}

export default TermsOfService
