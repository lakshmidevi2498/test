
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const loadWishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.WISHLIST_LOAD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.WISHLIST_LOAD_SUCCESS:
        console.log("this is loadWishlistReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.WISHLIST_LOAD_ERROR:
        console.log("this is loadWishlistReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
