import { ADD_EVENT_SUCCESS, DELETE_EVENT_SUCCESS, FETCH_EVENT_LOADER, FETCH_UPDATE_EVENT_LOADER, UPDATE_EVENT_SUCCESS } from "../types";


export const updateEvent = (updateEventName, updateEventImage, updateEventLocation, updateEventStartDate, updateEventEndDate, updateEventShortDes, updateEventDetailDes, updatedStatus, eventWinner, eventRunnerUp, preEventImage, eventId, firebase) => {

    return async (dispatch, getState) => {

        await firebase.handleUpdateEvent(updateEventName, updateEventImage, updateEventLocation, updateEventStartDate, updateEventEndDate, updateEventShortDes, updateEventDetailDes, updatedStatus, eventWinner, eventRunnerUp, preEventImage, eventId)
            .then(() => {
                dispatch({
                    type: UPDATE_EVENT_SUCCESS,
                });
            })

            .catch((error) => {
                console.log(error);
            })
    }
}

export const addEvent = (eventName, eventImage, eventLocation, eventStartDate, eventEndDate, eventShortDes, eventDetailDes, firebase) => {

    return async (dispatch, getState) => {

        await firebase.handleAddEvent(eventName, eventImage, eventLocation, eventStartDate, eventEndDate, eventShortDes, eventDetailDes)
            .then(() => {
                dispatch({
                    type: ADD_EVENT_SUCCESS,
                });
            })

            .catch((error) => {
                console.log(error);
                throw error;
            })
    }
}

export const fetchEvent = (firebase) => {
    return async (dispatch, getState) => {
        dispatch({
            type: FETCH_EVENT_LOADER,
        })
        await firebase.listAllEvents(dispatch)
            .then(() => {
                console.log("Fetch event success");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const getEvent = (eventId, firebase) => {
    return async (dispatch, getState) => {
        dispatch({
            type: FETCH_UPDATE_EVENT_LOADER,
        })
        console.log("Inside action");
        await firebase.getEventData(eventId, dispatch)
            .then(() => {
                console.log("Get event success");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export const deleteEvent = (firebase, eventId, eventImage) => {
    return async (dispatch, getState) => {
        await firebase.handleDeleteEvent(eventId, eventImage)
            .then(() => {
                dispatch({ type : DELETE_EVENT_SUCCESS });
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }
}