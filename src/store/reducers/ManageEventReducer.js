import { ADD_EVENT_SUCCESS, DELETE_EVENT_SUCCESS, FETCH_EVENTDATA_SUCCESS, FETCH_EVENT_LOADER, FETCH_EVENT_SUCCESS, FETCH_UPDATE_EVENT_LOADER, UPDATE_EVENT_SUCCESS } from "../types";

const initialState = {
  events: [],
  event: {},
  loading: false,
  updateLoading: false,
};


const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
      };

    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
      };

    case FETCH_EVENT_LOADER:
      return {
        ...state,
        loading: true,
      };

    case FETCH_UPDATE_EVENT_LOADER:
      return {
        ...state,
        updateLoading: true,
      };

    case FETCH_EVENTDATA_SUCCESS:
      return {
        ...state,
        event: action.payload.eventData,
        updateLoading: false,
      };

    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        events: action.payload.event,
        loading: false,
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default eventReducer;
