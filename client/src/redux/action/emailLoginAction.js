import * as types from './actionTypes'
import { emailLoginApi } from '../frontendApi.js/emailLoginApi'
import { toast } from 'react-toastify';

export const emailLoginStart= () => ({
type:types.EMAILANDPASSWORD_LOGIN_START
})

export const emailLoginSuccess = (data) => (
    console.log("this is emailLoginSuccessAction---->" ,data),
    {
    type:types.EMAILANDPASSWORD_LOGIN_SUCCESS,
    payload:data
})

export const emailLoginError = (error) => (
    console.log("this is emailLoginErrorAction---->" ,error),
    {
    type:types.EMAILANDPASSWORD_LOGIN_ERROR,
    payload:error
})

export const emailLoginInitiate = (user,navigate) => {
  console.log("user",user)
    return async (dispatch)=>{
        dispatch(emailLoginStart())
        try {
          const emaillogindata = await emailLoginApi(user)
          console.log("emaillogindata",emaillogindata)
          
          dispatch(emailLoginSuccess(emaillogindata))
          if(emaillogindata?.data.userExist?.role === "user"){
            localStorage.setItem('Token',emaillogindata?.data?.token) 
    
            localStorage.setItem("signinUserId", emaillogindata?.data?.userExist?._id);
            localStorage.setItem("signinUserName", emaillogindata?.data?.userExist?.name);
            console.log("emaillogindata?.data.userExist?.role",emaillogindata?.data?.userExist?.role)
            navigate('/')
          }
         
  
        } catch (err) {
          console.log("error",err)
          dispatch(emailLoginError(err))
          toast.error("Email & Password authentication failed")
  
        }
    }
}