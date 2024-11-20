import * as types from './actionTypes'
import { loadOrderHistoryApi } from '../frontendApi.js/loadOrderHistoryApi'
import { toast } from 'react-toastify';

export const loadOrderHistoryStart= () => ({
type:types.ORDER_HISTORY_LOAD_START
})

export const loadOrderHistorySuccess = (data) => (
    console.log("this is loadOrderHistorySuccessAction---->" ,data),
    {
    type:types.ORDER_HISTORY_LOAD_SUCCESS,
    payload:data
})

export const loadOrderHistoryError = (error) => (
    console.log("this is loadOrderHistoryErrorAction---->" ,error),
    {
    type:types.ORDER_HISTORY_LOAD_ERROR,
    payload:error
})

export const loadOrderHistoryInitiate = (userId) => {
    return async (dispatch)=>{
        dispatch(loadOrderHistoryStart())
        try {
          const loadOrderHistorydata = await loadOrderHistoryApi(userId)
          dispatch(loadOrderHistorySuccess(loadOrderHistorydata))
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(loadOrderHistoryError(err))
          toast.error("getting products data failed")
  
        }
    }
}