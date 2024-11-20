
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const postAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADDRESS_POST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ADDRESS_POST_SUCCESS:
        console.log("this is postAddressReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.ADDRESS_POST_ERROR:
        console.log("this is postAddressReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
