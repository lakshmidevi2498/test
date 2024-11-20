
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const loadOrderHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ORDER_HISTORY_LOAD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ORDER_HISTORY_LOAD_SUCCESS:
        console.log("this is loadOrderHistoryReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.ORDER_HISTORY_LOAD_ERROR:
        console.log("this is loadOrderHistoryReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
