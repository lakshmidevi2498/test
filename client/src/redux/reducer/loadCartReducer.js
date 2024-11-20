
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const loadCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CART_LOAD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CART_LOAD_SUCCESS:
        console.log("this is loadCartReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.CART_LOAD_ERROR:
        console.log("this is loadCartReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
