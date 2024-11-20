import * as types from './actionTypes'
import { loadWishlistApi } from '../frontendApi.js/loadWishlistApi'
import { toast } from 'react-toastify';

export const loadWishlistStart= () => ({
type:types.WISHLIST_LOAD_START
})

export const loadWishlistSuccess = (data) => (
    console.log("this is loadWishlistSuccessAction---->" ,data),
    {
    type:types.WISHLIST_LOAD_SUCCESS,
    payload:data
})

export const loadWishlistError = (error) => (
    console.log("this is loadWishlistErrorAction---->" ,error),
    {
    type:types.WISHLIST_LOAD_ERROR,
    payload:error
})

export const loadWishlistInitiate = (userId) => {
    return async (dispatch)=>{
        dispatch(loadWishlistStart())
        try {
          const loadWishlistdata = await loadWishlistApi(userId)
          dispatch(loadWishlistSuccess(loadWishlistdata))
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(loadWishlistError(err))
          toast.error("getting wishlist data failed")
  
        }
    }
}