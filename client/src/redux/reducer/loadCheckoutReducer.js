
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const loadCheckoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECKOUT_LOAD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CHECKOUT_LOAD_SUCCESS:
        console.log("this is loadCheckoutReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.CHECKOUT_LOAD_ERROR:
        console.log("this is loadCheckoutReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
