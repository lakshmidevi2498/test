
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const deleteCheckoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECKOUT_DELETE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CHECKOUT_DELETE_SUCCESS:
        console.log("this is deleteCheckoutReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.CHECKOUT_DELETE_ERROR:
        console.log("this is deleteCheckoutReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
