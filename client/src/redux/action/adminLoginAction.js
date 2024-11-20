import * as types from './actionTypes'
import { adminLoginApi } from '../frontendApi.js/adminLoginApi'
import { toast } from 'react-toastify';

export const adminLoginStart= () => ({
type:types.ADMIN_LOGIN_START
})

export const adminLoginSuccess = (data) => (
    console.log("this is adminLoginSuccessAction---->" ,data),
    {
    type:types.ADMIN_LOGIN_SUCCESS,
    payload:data
})

export const adminLoginError = (error) => (
    console.log("this is adminLoginErrorAction---->" ,error),
    {
    type:types.ADMIN_LOGIN_ERROR,
    payload:error
})

export const adminLoginInitiate = (user) => {
  console.log("user",user)
    return async (dispatch)=>{
        dispatch(adminLoginStart())
        try {
          const adminlogindata = await adminLoginApi(user)
          dispatch(adminLoginSuccess(adminlogindata))
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(adminLoginError(err))
          toast.error("admin & Password authentication failed")
  
        }
    }
}