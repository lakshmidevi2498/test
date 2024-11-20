import * as types from './actionTypes'
import { loadProfileApi } from '../frontendApi.js/loadProfileApi'
import { toast } from 'react-toastify';

export const loadProfileStart= () => ({
type:types.PROFILE_LOAD_START
})

export const loadProfileSuccess = (data) => (
    console.log("this is loadProfileSuccessAction---->" ,data),
    {
    type:types.PROFILE_LOAD_SUCCESS,
    payload:data
})

export const loadProfileError = (error) => (
    console.log("this is loadProfileErrorAction---->" ,error),
    {
    type:types.PROFILE_LOAD_ERROR,
    payload:error
})

export const loadProfileInitiate = (token) => {
    return async (dispatch)=>{
        dispatch(loadProfileStart())
        try {
          const loadProfiledata = await loadProfileApi(token)
          dispatch(loadProfileSuccess(loadProfiledata))
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(loadProfileError(err))
          toast.error("getting products data failed")
  
        }
    }
}