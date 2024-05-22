import {
    DELETE_FORM_ERROR,
    DELETE_FORM_SUCCESS,
    FETCH_DATA_ERROR,
    FETCH_DATA_SUCCESS,
    FORM_SUBMIT_ERROR,
    FORM_SUBMIT_SUCCESS,
    SET_FORMS,
    UPDATE_FORM_ERROR,
    UPDATE_FORM_SUCCESS
} from "../types";

export const submitForm = (name, email, phone, city, category, recipt, firebase) => {

    return async (dispatch, getState) => {

        await firebase.handleRegistrationForm(name, email, phone, city, category, recipt)
            .then(() => {
                dispatch({ type : FORM_SUBMIT_SUCCESS });
            })

            .catch((error) => {
                dispatch({ type : FORM_SUBMIT_ERROR, payload: error });
                throw error;
            })
    }
}

export const fetchForm = (firebase, dispatch) => {
    return async (dispatch, getState) => {
        await firebase.listAllForms(dispatch)
            .then(() => {
                dispatch({ type : FETCH_DATA_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type : FETCH_DATA_ERROR, payload: error });
            });
    }
}


export const updateForm = (firebase, formID, updatedName, updatedEmail, updatedPhone, updatedCity, updatedCategory, updatedRecipt, preImage, updatedStatus) => {
    return async (dispatch, getState) => {
        await firebase.handleUpdateForm(formID, updatedName, updatedEmail, updatedPhone, updatedCity, updatedCategory, updatedRecipt, preImage, updatedStatus)
            .then(() => {
                dispatch({ type : UPDATE_FORM_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type : UPDATE_FORM_ERROR, payload : error});
            });
    }
}



export const deleteForm = (firebase, formID, preImage) => {
    return async (dispatch, getState) => {
        await firebase.handleDeleteForm(formID, preImage)
            .then(() => {
                dispatch({ type : DELETE_FORM_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type : DELETE_FORM_ERROR, payload : error});
            });
    }
}


export const setForms = (forms) => ({
    type: SET_FORMS,
    payload: forms,
  });