import { DELETE_CONFIG_ERROR, DELETE_CONFIG_SUCCESS, DELETE_VALUE_ERROR, DELETE_VALUE_SUCCESS, FETCH_CONFIG_ERROR, FETCH_CONFIG_SUCCESS, FORM_CONFIG_ERROR, FORM_CONFIG_SUCCESS, GET_CONFIG_FORMS, UPDATE_CONFIG_ERROR, UPDATE_CONFIG_SUCCESS, UPDATE_VALUE_ERROR, UPDATE_VALUE_SUCCESS, VALUE_CONFIG_ERROR, VALUE_CONFIG_SUCCESS } from "../types";

const initialState = {
  formConfig: null,
  error: null,
}

const formConfigReducer = (state = initialState, action) => {
  switch (action.type) {

    case FORM_CONFIG_SUCCESS:
      console.log('Form Config successfully');
      return state;
    case FORM_CONFIG_ERROR:
      console.error('Error Config form', action.error);
      return {
        ...state,
        error: action.error.message,
      };


    case FETCH_CONFIG_SUCCESS:
      console.log('Form Config successfully');
      return {
        ...state,
      };
    case FETCH_CONFIG_ERROR:
      console.error('Error Config form', action.error);
      return {
        ...state,
        error: action.error.message,
      };


    case GET_CONFIG_FORMS:
      return {
        ...state,
        formConfig: action.payload,
      };


    case UPDATE_CONFIG_SUCCESS:
      return { ...state, };
    case UPDATE_CONFIG_ERROR:
      return { ...state, error: action.error };


    case DELETE_CONFIG_SUCCESS:
      return { ...state };
    case DELETE_CONFIG_ERROR:
      return { ...state, error: action.error };


    case VALUE_CONFIG_SUCCESS:
      console.log('Value Config successfully');
      return state;
    case VALUE_CONFIG_ERROR:
      console.error('Error Value form', action.error);
      return {
        ...state,
        error: action.error.message,
      };


    case UPDATE_VALUE_SUCCESS:
      return { ...state, };
    case UPDATE_VALUE_ERROR:
      return { ...state, error: action.error };


    case DELETE_VALUE_SUCCESS:
      return { ...state };
    case DELETE_VALUE_ERROR:
      return { ...state, error: action.error };


    default:
      return state;
  }
}

export default formConfigReducer;