
import * as types from "../action/actionTypes";

const initialState = {
  data: [],
  error: null,
  loading: false,
};

export const loadProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PROFILE_LOAD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.PROFILE_LOAD_SUCCESS:
        console.log("this is loadProfileReducersuccessreducer----> ",action.payload);
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case types.PROFILE_LOAD_ERROR:
        console.log("this is loadProfileReducererrorreducer----> ");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
