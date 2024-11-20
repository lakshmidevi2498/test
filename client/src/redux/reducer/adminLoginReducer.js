
import * as types from "../action/actionTypes";

const initialState = {
  data3: {
    data:[]
  },
  error: null,
  loading: false,
};

export const adminLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADMIN_LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADMIN_LOGIN_SUCCESS:
        console.log("this is adminloginsuccessreducer----> ",action.payload);
      return {
        ...state,
        data3: action.payload,
        loading: false,
        error: null,
      };
    case types.ADMIN_LOGIN_ERROR:
        console.log("this is adminloginerrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
