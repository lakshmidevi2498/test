import * as types from './actionTypes'
import { loadCartApi } from '../frontendApi.js/loadCartApi'
import { toast } from 'react-toastify';

export const loadCartStart= () => ({
type:types.CART_LOAD_START
})

export const loadCartSuccess = (data) => (
    console.log("this is loadCartSuccessAction---->" ,data),
    {
    type:types.CART_LOAD_SUCCESS,
    payload:data
})

export const loadCartError = (error) => (
    console.log("this is loadCartErrorAction---->" ,error),
    {
    type:types.CART_LOAD_ERROR,
    payload:error
})

export const loadCartInitiate = (userId) => {
    return async (dispatch)=>{
        dispatch(loadCartStart())
        try {
          const loadCartdata = await loadCartApi(userId)
          dispatch(loadCartSuccess(loadCartdata))
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(loadCartError(err))
          toast.error("getting products data failed")
  
        }
    }
}