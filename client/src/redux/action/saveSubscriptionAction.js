import * as types from './actionTypes'
import { saveSubscriptionApi } from '../frontendApi.js/saveSubscriptionApi'
import { toast } from 'react-toastify';

export const saveSubscriptionStart= () => ({
type:types.SAVE_SUBSCRIPTION_POST_START
})

export const saveSubscriptionSuccess = (data) => (
    console.log("this is saveSubscriptionSuccessAction---->" ,data),
    {
    type:types.SAVE_SUBSCRIPTION_POST_SUCCESS,
    payload:data
})

export const saveSubscriptionError = (error) => (
    console.log("this is saveSubscriptionErrorAction---->" ,error),
    {
    type:types.SAVE_SUBSCRIPTION_POST_ERROR,
    payload:error
})

export const saveSubscriptionInitiate = (subscription ) => {
    return async (dispatch)=>{
        dispatch(saveSubscriptionStart())
        try {
          const saveSubscriptiondata = await saveSubscriptionApi(subscription)
          dispatch(saveSubscriptionSuccess(saveSubscriptiondata))
          // toast.success("product is added to checkout page")
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(saveSubscriptionError(err))
          toast.error("getting products data failed")
  
        }
    }
}