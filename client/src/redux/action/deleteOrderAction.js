import * as types from './actionTypes'
import { deleteOrderApi } from '../frontendApi.js/deleteOrderApi.js'
import { toast } from 'react-toastify';

export const deleteOrderStart= () => ({
type:types.ORDER_DELETE_START
})

export const deleteOrderSuccess = (data) => (
    console.log("this is deleteOrderSuccessAction---->" ,data),
    {
    type:types.ORDER_DELETE_SUCCESS,
    payload:data
})

export const deleteOrderError = (error) => (
    console.log("this is deleteOrderErrorAction---->" ,error),
    {
    type:types.ORDER_DELETE_ERROR,
    payload:error
})

export const deleteOrderInitiate = (id,price ,item) => {
    return async (dispatch)=>{
        dispatch(deleteOrderStart())
        try {
          const deleteOrderdata = await deleteOrderApi(id,price ,item)
          dispatch(deleteOrderSuccess(deleteOrderdata))
          // toast.success("product deleted from Order")
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(deleteOrderError(err))
          toast.error("getting products data failed")
  
        }
    }
}