// src/redux/actions.js
import * as types from "./actionTypes";
import { facebookLoginApi } from "../frontendApi.js/facebookLoginApi";

export const facebookLoginStart = () => ({
  type: types.FACEBOOK_LOGIN_START,
});

export const facebookLoginSuccess = (data) => (
  console.log("this is facebookLoginSuccessAction---->" ,data),
  {
  
  type: types.FACEBOOK_LOGIN_SUCCESS,
  payload: data,
});

export const facebookLoginError = (error) => (
  console.log("this is facebookLoginError---->" ,error),
  {
  type: types.FACEBOOK_LOGIN_ERROR,
  payload: error,
});

export const facebookLoginInitiate = (navigate) => {
  return async (dispatch)=> {
    dispatch(facebookLoginStart())
    try{
     const userData = await facebookLoginApi()
     console.log("userData",userData)
     dispatch(facebookLoginSuccess(userData))
     navigate("/")
    }
    catch(error){
     dispatch(facebookLoginError(error.mesage))
    }
  }
}
