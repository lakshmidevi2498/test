import * as types from './actionTypes'
import { deleteCartApi } from '../frontendApi.js/deleteCartApi'
import { toast } from 'react-toastify';

export const deleteCartStart= () => ({
type:types.CART_DELETE_START
})

export const deleteCartSuccess = (data) => (
    console.log("this is deleteCartSuccessAction---->" ,data),
    {
    type:types.CART_DELETE_SUCCESS,
    payload:data
})

export const deleteCartError = (error) => (
    console.log("this is deleteCartErrorAction---->" ,error),
    {
    type:types.CART_DELETE_ERROR,
    payload:error
})

export const deleteCartInitiate = (userId,productId ,navigate) => {
    return async (dispatch)=>{
        dispatch(deleteCartStart())
        try {
          const deleteCartdata = await deleteCartApi(userId,productId)
          dispatch(deleteCartSuccess(deleteCartdata))
          // toast.success("product deleted from cart")
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(deleteCartError(err))
          toast.error("getting products data failed")
  
        }
    }
}