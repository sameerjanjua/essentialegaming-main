import { DELETE_FORM_ERROR, DELETE_FORM_SUCCESS, FETCH_DATA_ERROR, FETCH_DATA_SUCCESS, FETCH_URL_ERROR, FETCH_URL_SUCCESS, FORM_SUBMIT_ERROR, FORM_SUBMIT_SUCCESS, SET_FORMS, UPDATE_FORM_ERROR, UPDATE_FORM_SUCCESS } from "../types";

const initialState = {
  submitFormError: null,
  fetchDataError: null,
  fetchedForm: [],
  forms: [],
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_SUBMIT_SUCCESS:
      console.log('Form submitted successfully');
      return state;

    case FORM_SUBMIT_ERROR:
      console.error('Error submitting form', action.error);
      return {
        ...state,
        submitFormError: action.error.message,
      };

    default:
      return state;
  }
};

export const formFetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      console.log('Form Fetch successfully');
      return {
        ...state,
        fetchDataError: null,
      };

    case FETCH_DATA_ERROR:
      console.error('Error Fetching form', action.error);
      return {
        ...state,
        fetchDataError: action.error.message,
      };

    case UPDATE_FORM_SUCCESS:
      return { ...state, };
    case UPDATE_FORM_ERROR:
      return { ...state, error: action.error };

    case DELETE_FORM_SUCCESS:
      return { ...state };
    case DELETE_FORM_ERROR:
      return { ...state, error: action.error };

    case SET_FORMS:
      return {
        ...state,
        forms: action.payload,
      };

    default:
      return state;
  }
};

export default formReducer;