import React from "react"
import ContentLoader from "react-content-loader"

const ProductGridLoading = (props) => (
  <ContentLoader 
    speed={2}
    width={300}
    height={470}
    viewBox="0 0 300 470"
    backgroundColor="#ded9d9"
    foregroundColor="#f3f2f2"
    {...props}
  >
     <rect x="12" y="335" rx="0" ry="0" width="100" height="10" /> 
    <rect x="13" y="404" rx="2" ry="2" width="240" height="10" /> 
    <rect x="5" y="5" rx="11" ry="11" width="280" height="308" /> 
    <rect x="14" y="356" rx="0" ry="0" width="120" height="10" /> 
    <rect x="14" y="377" rx="0" ry="0" width="100" height="10" /> 
    <rect x="15" y="430" rx="5" ry="5" width="240" height="25" />
  </ContentLoader>
)

export default ProductGridLoading

