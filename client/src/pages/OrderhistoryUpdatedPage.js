import React from 'react'
import Controls from '../commons/Controls'
import NavbarComponent from '../components/NavbarComponent'
import OrderHistoryUpdated from '../components/OrderHistoryUpdated'

const OrderhistoryUpdatedPage = () => {
  return (
    <>
    <NavbarComponent value1={"block"} value5={"block"} value2={"block"} value3={"block"} value4={"block"}/>
    <OrderHistoryUpdated/>
    </>
  )
}

export default OrderhistoryUpdatedPage