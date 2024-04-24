import React from "react"
import ContentLoader from "react-content-loader"

const ContentLoading = (props) => (
  <ContentLoader 
    speed={2}
    width={376}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#d2d0d0"
    foregroundColor="#f3f2f2"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
    <rect x="0" y="56" rx="3" ry="3" width="310" height="6" /> 
    <rect x="0" y="72" rx="3" ry="3" width="280" height="6" /> 
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
    <circle cx="20" cy="20" r="20" /> 
    <rect x="27" y="27" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
)

export default ContentLoading