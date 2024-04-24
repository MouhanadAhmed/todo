import React from "react"
import ContentLoader from "react-content-loader"

const ImageLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#d2d0d0"
    foregroundColor="#f3f2f2"
    {...props}
  >
    <rect x="5" y="6" rx="26" ry="26" width="400" height="400" />
  </ContentLoader>
)

export default ImageLoader

