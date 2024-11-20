import React from 'react'
import HomeComponent from '../components/HomeComponent'
import NavbarComponent from '../components/NavbarComponent'
import TodayDealsComponent from '../components/TodayDealsComponent'
import BestSellerComponent from '../components/BestSellerComponent'
import WhyChooseComponent from '../components/WhyChooseComponent'
import FooterComponent from '../components/FooterComponent'
import DealsComponent from '../components/DealsComponent'
import PushNotificationComponent from '../components/PushNotificationComponent'

const HomePage = () => {
  return (
    <>
     <PushNotificationComponent/>
    <NavbarComponent value1={"block"} value5={"block"} value2={"block"} value3={"block"} value4={"block"} image={"./assests/images/vegetable.png"} />
   <HomeComponent/>
   <TodayDealsComponent/>
   <DealsComponent/>
   <BestSellerComponent/>
   <WhyChooseComponent/>
   <FooterComponent/>
    </>
  )
}

export default HomePage