
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const razorpayOrderValidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RAZORPAY_ORDER_VALIDATE_POST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.RAZORPAY_ORDER_VALIDATE_POST_SUCCESS:
        console.log("this is razorpayOrderValidateReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.RAZORPAY_ORDER_VALIDATE_POST_ERROR:
        console.log("this is razorpayOrderValidateReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
