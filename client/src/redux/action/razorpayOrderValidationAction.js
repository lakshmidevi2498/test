import * as types from './actionTypes'
import { razorpayOrderValidateApi } from '../frontendApi.js/razorpayOrderValidationApi'
import { toast } from 'react-toastify';

export const razorpayOrderValidateStart= () => ({
type:types.RAZORPAY_ORDER_VALIDATE_POST_START
})

export const razorpayOrderValidateSuccess = (data) => (
    console.log("this is razorpayOrderSuccessAction---->" ,data),
    {
    type:types.RAZORPAY_ORDER_VALIDATE_POST_SUCCESS,
    payload:data
})

export const razorpayOrderValidateError = (error) => (
    console.log("this is razorpayOrderErrorAction---->" ,error),
    {
    type:types.RAZORPAY_ORDER_VALIDATE_POST_ERROR,
    payload:error
})

export const razorpayOrderValidateInitiate = (body) => {
    return async (dispatch)=>{
        dispatch(razorpayOrderValidateStart())
        try {
          const razorpayOrderValidatedata = await razorpayOrderValidateApi(body)
          dispatch(razorpayOrderValidateSuccess(razorpayOrderValidatedata))
        //   toast.success("product is added to wishlist")
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(razorpayOrderValidateError(err))
        //   toast.error("getting products data failed")
  
        }
    }
}