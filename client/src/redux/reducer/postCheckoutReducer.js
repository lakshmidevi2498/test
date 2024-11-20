
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const postCheckoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECKOUT_POST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CHECKOUT_POST_SUCCESS:
        console.log("this is postCheckoutReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.CHECKOUT_POST_ERROR:
        console.log("this is postCheckoutReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
