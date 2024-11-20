import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import OrderHistoryDetailsComponent from '../components/OrderHistoryDetailsComponent'

const OrderDetailsPage = () => {
  return (
    <>
    <NavbarComponent value1={"block"} value5={"block"} value2={"block"} value3={"block"} value4={"block"}/>
    <OrderHistoryDetailsComponent/>
    </>
  )
}

export default OrderDetailsPage