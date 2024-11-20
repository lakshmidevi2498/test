
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

 export const  orderHistoryPatchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ORDER_HISTORY_PATCH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.ORDER_HISTORY_PATCH_SUCCESS:
        console.log("this is  OrderHistoryPatchReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.ORDER_HISTORY_PATCH_ERROR:
        console.log("this is  OrderHistoryPatchReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}; 
