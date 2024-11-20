import * as types from './actionTypes'
import { loadCheckoutApi } from '../frontendApi.js/loadCheckoutApi'
import { toast } from 'react-toastify';

export const loadCheckoutStart= () => ({
type:types.CHECKOUT_LOAD_START
})

export const loadCheckoutSuccess = (data) => (
    console.log("this is loadCheckoutSuccessAction---->" ,data),
    {
    type:types.CHECKOUT_LOAD_SUCCESS,
    payload:data
})

export const loadCheckoutError = (error) => (
    console.log("this is loadCheckoutErrorAction---->" ,error),
    {
    type:types.CHECKOUT_LOAD_ERROR,
    payload:error
})

export const loadCheckoutInitiate = (userId) => {
    return async (dispatch)=>{
        dispatch(loadCheckoutStart())
        try {
          const loadCheckoutdata = await loadCheckoutApi(userId)
          dispatch(loadCheckoutSuccess(loadCheckoutdata))
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(loadCheckoutError(err))
          toast.error("getting products data failed")
  
        }
    }
}