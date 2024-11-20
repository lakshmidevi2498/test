import * as types from './actionTypes'
import { loadAddressApi } from '../frontendApi.js/loadAddressApi'
import { toast } from 'react-toastify';

export const loadAddressStart= () => ({
type:types.ADDRESS_LOAD_START
})

export const loadAddressSuccess = (data) => (
    console.log("this is loadAddressSuccessAction---->" ,data),
    {
    type:types.ADDRESS_LOAD_SUCCESS,
    payload:data
})

export const loadAddressError = (error) => (
    console.log("this is loadAddressErrorAction---->" ,error),
    {
    type:types.ADDRESS_LOAD_ERROR,
    payload:error
})

export const loadAddressInitiate = (userId) => {
    return async (dispatch)=>{
        dispatch(loadAddressStart())
        try {
          const loadAddressdata = await loadAddressApi(userId)
          dispatch(loadAddressSuccess(loadAddressdata))
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(loadAddressError(err))
          toast.error("getting products data failed")
  
        }
    }
}