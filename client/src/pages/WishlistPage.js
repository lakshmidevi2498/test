import React from 'react'
import WishlistComponent from '../components/WishlistComponent'
import NavbarComponent from '../components/NavbarComponent'

const WishlistPage = () => {
  return (
    <>
    <NavbarComponent value1={"none"} value5={"none"} value2={"block"} value3={"none"} value4={"block"}/>
    <WishlistComponent/>
    
    </>
  )
}

export default WishlistPage