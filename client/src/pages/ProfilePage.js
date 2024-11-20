import React from 'react' 
import MyProfileComponent from '../components/MyProfileComponent'
import NavbarComponent from '../components/NavbarComponent'

const ProfilePage = () => {
  return (
    <> 
    <NavbarComponent value1={"block"} value5={"block"} value2={"block"} value3={"block"} value4={"block"}/>
    <MyProfileComponent/>
    </>
  )
}

export default ProfilePage