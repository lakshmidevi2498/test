import * as types from './actionTypes'
import { deleteCheckoutApi } from '../frontendApi.js/deleteCheckoutApi'
import { toast } from 'react-toastify';

export const deleteCheckoutStart= () => ({
type:types.CHECKOUT_DELETE_START
})

export const deleteCheckoutSuccess = (data) => (
    console.log("this is deleteCheckoutSuccessAction---->" ,data),
    {
    type:types.CHECKOUT_DELETE_SUCCESS,
    payload:data
})

export const deleteCheckoutError = (error) => (
    console.log("this is deleteCheckoutErrorAction---->" ,error),
    {
    type:types.CHECKOUT_DELETE_ERROR,
    payload:error
})

export const deleteCheckoutInitiate = (userId,productId ,navigate) => {
    return async (dispatch)=>{
        dispatch(deleteCheckoutStart())
        try {
          const deleteCheckoutdata = await deleteCheckoutApi(userId,productId)
          dispatch(deleteCheckoutSuccess(deleteCheckoutdata))
          // toast.success("product deleted from Checkout")
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(deleteCheckoutError(err))
          toast.error("getting products data failed")
  
        }
    }
}