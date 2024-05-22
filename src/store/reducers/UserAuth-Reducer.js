import { AUTH_USER_ERROR, AUTH_USER_SUCCESS, CLEAR_USER, FETCH_USER_ERROR, FETCH_USER_SUCCESS, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, SET_USER_ERROR, SET_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS, USER_LOADER } from "../types";

const initialState = {
  user: {},
  userData: {},
  loader: false,
};


const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_SUCCESS:
      return {
        ...state,
        loader: false,
      };
    // case SET_USER_ERROR:
    //   return { ...state, signUpError: action.error.message };

    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload };

    case USER_LOADER:
      return { ...state, loader: action.payload };


    case FETCH_USER_SUCCESS:
      return { ...state, userData: action.payload.userData, error: null, };
    case FETCH_USER_ERROR:
      return { ...state, user: {}, error: action.error.message };


    case UPDATE_USER_SUCCESS:
      return { ...state, user: action.payload, };
    case UPDATE_USER_ERROR:
      return { ...state, error: action.error };

    case AUTH_USER_SUCCESS:
      return { ...state };
    case AUTH_USER_ERROR:
      return { ...state, error: action.error };


    case CLEAR_USER:
      return { ...state, user: {}, userData: {} };
    default:
      return state;
  }
};

export default userAuthReducer;