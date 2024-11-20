import * as types from './actionTypes'
import { sendNotificationApi } from '../frontendApi.js/sendNotificationApi'
import { toast } from 'react-toastify';

export const sendNotificationStart= () => ({
type:types.SEND_NOTIFICATION_POST_START
})

export const sendNotificationSuccess = (data) => (
    console.log("this is sendNotificationSuccessAction---->" ,data),
    {
    type:types.SEND_NOTIFICATION_POST_SUCCESS,
    payload:data
})

export const sendNotificationError = (error) => (
    console.log("this is sendNotificationErrorAction---->" ,error),
    {
    type:types.SEND_NOTIFICATION_POST_ERROR,
    payload:error
})

export const sendNotificationInitiate = (body) => {
    return async (dispatch)=>{
        dispatch(sendNotificationStart())
        try {
          const sendNotificationdata = await sendNotificationApi(body)
          dispatch(sendNotificationSuccess(sendNotificationdata))
          // toast.success("product is added to checkout page")
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(sendNotificationError(err))
          toast.error("getting products data failed")
  
        }
    }
}