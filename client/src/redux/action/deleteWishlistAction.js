import * as types from './actionTypes'
import { deleteWishlistApi } from '../frontendApi.js/deleteWishlistApi'
import { toast } from 'react-toastify';

export const deleteWishlistStart= () => ({
type:types.WISHLIST_DELETE_START
})

export const deleteWishlistSuccess = (data) => (
    console.log("this is deleteWishlistSuccessAction---->" ,data),
    {
    type:types.WISHLIST_DELETE_SUCCESS,
    payload:data
})

export const deleteWishlistError = (error) => (
    console.log("this is deleteWishlistErrorAction---->" ,error),
    {
    type:types.WISHLIST_DELETE_ERROR,
    payload:error
})

export const deleteWishlistInitiate = (userId,productId,navigate) => {
    return async (dispatch)=>{
        dispatch(deleteWishlistStart())
        try {
          const deleteWishlistdata = await deleteWishlistApi(userId,productId)
          dispatch(deleteWishlistSuccess(deleteWishlistdata))
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(deleteWishlistError(err))
          toast.error("getting products data failed")
  
        }
    }
}