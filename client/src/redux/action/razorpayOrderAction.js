import * as types from './actionTypes'
import { razorpayOrderApi } from '../frontendApi.js/razorpayOrderApi'
import { toast } from 'react-toastify';

export const razorpayOrderStart= () => ({
type:types.RAZORPAY_ORDER_POST_START
})

export const razorpayOrderSuccess = (data) => (
    console.log("this is razorpayOrderSuccessAction---->" ,data),
    {
    type:types.RAZORPAY_ORDER_POST_SUCCESS,
    payload:data
})

export const razorpayOrderError = (error) => (
    console.log("this is razorpayOrderErrorAction---->" ,error),
    {
    type:types.RAZORPAY_ORDER_POST_ERROR,
    payload:error
})

export const razorpayOrderInitiate = (data) => {
    return async (dispatch)=>{
        dispatch(razorpayOrderStart())
        try {
          const razorpayOrderdata = await razorpayOrderApi(data)
          dispatch(razorpayOrderSuccess(razorpayOrderdata))
          // toast.success("product is added to wishlist")
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(razorpayOrderError(err))
          toast.error("getting products data failed")
  
        }
    }
}