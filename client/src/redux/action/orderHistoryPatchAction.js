import * as types from './actionTypes'
import { OrderHistorypatchApi } from '../frontendApi.js/OrderHistoryPatchApi'
import { toast } from 'react-toastify';

export const OrderHistoryPatchStart= () => ({
type:types.ORDER_HISTORY_PATCH_START
})

export const OrderHistoryPatchSuccess = (data) => (
    console.log("this is  OrderHistorySuccessAction---->" ,data),
    {
    type:types.ORDER_HISTORY_PATCH_SUCCESS,
    payload:data
})

export const  OrderHistoryPatchError = (error) => (
    console.log("this is  OrderHistoryErrorAction---->" ,error),
    {
    type:types.ORDER_HISTORY_PATCH_ERROR,
    payload:error
})

export const OrderHistoryPatchInitiate = (id ,body) => {
    return async (dispatch)=>{
        dispatch(OrderHistoryPatchStart())
        try {
          const OrderHistoryPatchdata = await OrderHistorypatchApi(id ,body)
          dispatch(OrderHistoryPatchSuccess(OrderHistoryPatchdata))
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(OrderHistoryPatchError(err))
          toast.error("getting products data failed")
  
        }
    }
}