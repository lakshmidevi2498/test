import * as types from './actionTypes'
import { loadProductsDataApi } from  '../frontendApi.js/loadProductsDataApi'
import { toast } from 'react-toastify';

export const loadProductsDataStart= () => ({
type:types.LOAD_PRODUCTS_DATA_START
})

export const loadProductsDataSuccess = (data) => (
    console.log("this is loadProductsDataSuccessAction---->" ,data),
    {
    type:types.LOAD_PRODUCTS_DATA_SUCCESS,
    payload:data
})

export const loadProductsDataError = (error) => (
    console.log("this is loadProductsDataErrorAction---->" ,error),
    {
    type:types.LOAD_PRODUCTS_DATA_ERROR,
    payload:error
})

export const loadProductsDataInitiate = (email,password,navigate) => {
    return async (dispatch)=>{
        dispatch(loadProductsDataStart())
        try {
          const loadProductsDatadata = await loadProductsDataApi(email,password)
          dispatch(loadProductsDataSuccess(loadProductsDatadata))
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(loadProductsDataError(err))
          toast.error("getting products data failed")
  
        }
    }
}