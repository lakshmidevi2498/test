
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const deleteOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ORDER_DELETE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ORDER_DELETE_SUCCESS:
        console.log("this is deleteOrderReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.ORDER_DELETE_ERROR:
        console.log("this is deleteOrderReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
