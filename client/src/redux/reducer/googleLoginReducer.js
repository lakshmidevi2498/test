
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const googleLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GOOGLE_LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GOOGLE_LOGIN_SUCCESS:
        console.log("this is googleloginsuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.GOOGLE_LOGIN_ERROR:
        console.log("this is googleloginerrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
