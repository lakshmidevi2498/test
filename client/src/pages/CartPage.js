import React from 'react' 
import CartProductsComponent from '../components/CartProductsComponent'
import NavbarComponent from '../components/NavbarComponent'

const CartPage = () => {
  return (
    <>
    <NavbarComponent value1={"none"} value5={"none"} value2={"none"} value3={"block"} value4={"block"}/>
    <CartProductsComponent/>
    </>
  )
}

export default CartPage