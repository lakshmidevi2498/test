import * as types from './actionTypes'
import { postAddressApi } from '../frontendApi.js/postAddressApi'
import { toast } from 'react-toastify';

export const postAddressStart= () => ({
type:types.ADDRESS_POST_START
})

export const postAddressSuccess = (data) => (
    console.log("this is postAddressSuccessAction---->" ,data),
    {
    type:types.ADDRESS_POST_SUCCESS,
    payload:data
})

export const postAddressError = (error) => (
    console.log("this is postAddressErrorAction---->" ,error),
    {
    type:types.ADDRESS_POST_ERROR,
    payload:error
})

export const postAddressInitiate = (values,userId,navigate) => {
    return async (dispatch)=>{
        dispatch(postAddressStart())
        try {
          const postAddressdata = await postAddressApi(values,userId)
          dispatch(postAddressSuccess(postAddressdata))
          // toast.success("product is added to Address ")
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(postAddressError(err))
          toast.error("getting products data failed")
  
        }
    }
}