
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const loadAddresssReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADDRESS_LOAD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADDRESS_LOAD_SUCCESS:
        console.log("this is loadAddresssReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.ADDRESS_LOAD_ERROR:
        console.log("this is loadAddresssReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
