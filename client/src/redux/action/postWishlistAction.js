import * as types from './actionTypes'
import { postWishlistApi } from '../frontendApi.js/postWishlistApi'
import { toast } from 'react-toastify';

export const postWishlistStart= () => ({
type:types.WISHLIST_POST_START
})

export const postWishlistSuccess = (data) => (
    console.log("this is postWishlistSuccessAction---->" ,data),
    {
    type:types.WISHLIST_POST_SUCCESS,
    payload:data
})

export const postWishlistError = (error) => (
    console.log("this is postWishlistErrorAction---->" ,error),
    {
    type:types.WISHLIST_POST_ERROR,
    payload:error
})

export const postWishlistInitiate = (userId,productId,navigate) => {
    return async (dispatch)=>{
        dispatch(postWishlistStart())
        try {
          const postWishlistdata = await postWishlistApi(userId,productId)
          dispatch(postWishlistSuccess(postWishlistdata))
          // toast.success("product is added to wishlist")
        //   navigate('/')
  
        } catch (err) {
          console.log("error",err)
          dispatch(postWishlistError(err))
          toast.error("getting products data failed")
  
        }
    }
}