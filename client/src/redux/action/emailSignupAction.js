
import * as types from './actionTypes'
import { emailSignupApi } from '../frontendApi.js/emailSignupApi' 


export const emailSignupStart= () => ({
type:types.EMAILANDPASSWORD_SIGNUP_START
})

export const emailSignupSuccess = (data) => (
    console.log("this is emailSignupSuccessAction---->" ,data),
    {
    type:types.EMAILANDPASSWORD_SIGNUP_SUCCESS,
    payload:data
})

export const emailSignupError = (error) => (
    console.log("this is emailSignupErrorAction---->" ,error),
    {
    type:types.EMAILANDPASSWORD_SIGNUP_ERROR,
    payload:error
})

export const emailSignupInitiate = (user,navigate) => {
    return async (dispatch) => {
      dispatch(emailSignupStart());
      console.log("dfcvgbh")
      try {
        const emaildata = await emailSignupApi(user);
        dispatch(emailSignupSuccess(emaildata));
        console.log("emailSignupInitiate----",emaildata)
        navigate("/"); 
      } catch (error) {
        dispatch(emailSignupError(error));
      }
    };
  };