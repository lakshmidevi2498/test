import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import InnerProductsComponent from '../components/InnerProductsComponent'
import RelatedProducts from '../components/RelatedProducts'

const InnerProductsPage = () => {
  return (
    <>
    <NavbarComponent value1={"block"} value5={"block"} value2={"block"} value3={"block"} value4={"block"}/>
  <InnerProductsComponent/>
  <RelatedProducts/>

    </>
  )
}

export default InnerProductsPage