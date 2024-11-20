
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const facebookLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FACEBOOK_LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FACEBOOK_LOGIN_SUCCESS:
        console.log("this is facebookLoginsuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.FACEBOOK_LOGIN_ERROR:
        console.log("this is facebookLoginerrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
