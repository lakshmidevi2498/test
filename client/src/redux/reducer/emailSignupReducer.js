
import * as types from "../action/actionTypes";

const initialState = {
  data2: {
    data:[]
  },
  error: null,
  loading: false,
};

export const emailSignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EMAILANDPASSWORD_SIGNUP_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.EMAILANDPASSWORD_SIGNUP_SUCCESS:
        console.log("this is emailsignupsuccessreducer----> ",action.payload);
      return {
        ...state,
        data2: action.payload,
        loading: false,
        error: null,
      };
    case types.EMAILANDPASSWORD_SIGNUP_ERROR:
        console.log("this is emailsignuperrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
