import React from 'react'
import CheckoutComponent from '../components/CheckoutComponent'
import NavbarComponent from '../components/NavbarComponent'

const CheckoutPage = () => {
  return (
    <>
    <NavbarComponent value1={"none"} value5={"none"} value2={"block"} value3={"block"} value4={"none"}/>
    <CheckoutComponent/>
    </>
  )
}

export default CheckoutPage