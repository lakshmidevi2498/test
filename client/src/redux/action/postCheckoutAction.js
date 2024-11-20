import * as types from './actionTypes'
import { postCheckoutApi } from '../frontendApi.js/postCheckoutApi'
import { toast } from 'react-toastify';

export const postCheckoutStart= () => ({
type:types.CHECKOUT_POST_START
})

export const postCheckoutSuccess = (data) => (
    console.log("this is postCheckoutSuccessAction---->" ,data),
    {
    type:types.CHECKOUT_POST_SUCCESS,
    payload:data
})

export const postCheckoutError = (error) => (
    console.log("this is postCheckoutErrorAction---->" ,error),
    {
    type:types.CHECKOUT_POST_ERROR,
    payload:error
})

export const postCheckoutInitiate = (userId,productId ) => {
    return async (dispatch)=>{
        dispatch(postCheckoutStart())
        try {
          const postCheckoutdata = await postCheckoutApi(userId,productId)
          dispatch(postCheckoutSuccess(postCheckoutdata))
          // toast.success("product is added to checkout page")
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(postCheckoutError(err))
          toast.error("getting products data failed")
  
        }
    }
}