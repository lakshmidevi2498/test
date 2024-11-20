
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const postWishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.WISHLIST_POST_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.WISHLIST_POST_SUCCESS:
        console.log("this is postWishlistReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.WISHLIST_POST_ERROR:
        console.log("this is postWishlistReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
