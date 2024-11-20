import * as types from './actionTypes'
import {postCartApi} from '../frontendApi.js/postCartApi'
import { toast } from 'react-toastify';

export const postCartStart= () => ({
type:types.CART_POST_START
})

export const postCartSuccess = (data) => (
    console.log("this is postCartSuccessAction---->" ,data),
    {
    type:types.CART_POST_SUCCESS,
    payload:data
})

export const postCartError = (error) => (
    console.log("this is postCartErrorAction---->" ,error),
    {
    type:types.CART_POST_ERROR,
    payload:error
})

export const postCartInitiate = (userId,productId,navigate) => {
    return async (dispatch)=>{
        dispatch(postCartStart())
        try {
          const postCartdata = await postCartApi(userId,productId)
          dispatch(postCartSuccess(postCartdata))
          // toast.success("product is added to cart ")
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(postCartError(err))
          toast.error("getting products data failed")
  
        }
    }
}