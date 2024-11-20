import React from 'react'
import SigninFormComponent from '../components/SigninFormComponent'
import NavbarComponent from '../components/NavbarComponent'

const SigninPage = () => {
  return (
    <>
    <NavbarComponent value1={"block"} value5={"block"} value2={"block"} value3={"block"} value4={"block"}/>
    <SigninFormComponent/>
    </>
  )
}

export default SigninPage