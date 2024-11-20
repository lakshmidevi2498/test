
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const deleteCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CART_DELETE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CART_DELETE_SUCCESS:
        console.log("this is deleteCartReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.CART_DELETE_ERROR:
        console.log("this is deleteCartReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
