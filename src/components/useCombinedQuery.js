import { getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

export const useCombinedQuery = () => {
  const data = useStaticQuery(graphql`
    query CombinedStaticQuery {
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
      nanoQrCode: file(relativePath: { eq: "DepositNanoQRCode.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 800, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  `)

  return {
    appStoreBadge: getImage(data.appStoreBadge.childImageSharp.gatsbyImageData),
    googlePlayBadge: getImage(data.googlePlayBadge.childImageSharp.gatsbyImageData),
    nanoQrCode: getImage(data.nanoQrCode.childImageSharp.gatsbyImageData),
  }
}
