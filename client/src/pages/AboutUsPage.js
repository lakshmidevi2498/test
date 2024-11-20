import React from 'react'
import Controls from '../commons/Controls'
import NavbarComponent from '../components/NavbarComponent'
import AboutUsComponent from '../components/AboutUsComponent'
import FooterComponent from '../components/FooterComponent'

const AboutUsPage = () => {
  return (
    <>
   <NavbarComponent value1={"block"} value5={"block"} value2={"block"} value3={"block"} value4={"block"}/>
   <AboutUsComponent/>
   <FooterComponent/>
    </>
  )
}

export default AboutUsPage