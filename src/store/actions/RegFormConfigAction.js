import { DELETE_CONFIG_ERROR, DELETE_CONFIG_SUCCESS, DELETE_VALUE_ERROR, DELETE_VALUE_SUCCESS, FETCH_CONFIG_ERROR, FETCH_CONFIG_SUCCESS, FORM_CONFIG_ERROR, FORM_CONFIG_SUCCESS, GET_CONFIG_FORMS, UPDATE_CONFIG_ERROR, UPDATE_CONFIG_SUCCESS, UPDATE_VALUE_ERROR, UPDATE_VALUE_SUCCESS, VALUE_CONFIG_ERROR, VALUE_CONFIG_SUCCESS } from "../types";



export const addFormConfig = (firebase) => {
    return async (dispatch, getState) => {
        await firebase.handleAddFormConfig()
            .then(() => {
                dispatch({ type : FORM_CONFIG_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type : FORM_CONFIG_ERROR, payload : error });
            })
    }
}

export const getFormConfig = (firebase) => {
    return async (dispatch, getState) => {
        await firebase.handleGetFormConfig(dispatch)
            .then(() => {
                dispatch({ type : FETCH_CONFIG_SUCCESS, });
            })
            .catch((error) => {
                dispatch({ type : FETCH_CONFIG_ERROR, payload : error });
            })
    }
}

export const getConfigForms = (formConfig) => ({
    type: GET_CONFIG_FORMS,
    payload : formConfig,
  });


  export const updateFormConfig = (firebase, formID, label, inputType) => {
    return async (dispatch, getState) => {
        await firebase.handleUpdateFormConfig(formID, label, inputType)
            .then(() => {
                dispatch({ type : UPDATE_CONFIG_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type : UPDATE_CONFIG_ERROR, payload : error});
            });
    }
}

export const deleteFormConfig = (firebase, formID) => {
    return async (dispatch, getState) => {
        await firebase.handleDeleteFormConfig(formID)
            .then(() => {
                dispatch({ type : DELETE_CONFIG_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type : DELETE_CONFIG_ERROR, payload : error});
            });
    }
}

export const addValueConfig = (firebase, formID) => {
    return async (dispatch, getState) => {
        console.log(formID);
        await firebase.handleAddValueConfig(formID)
            .then(() => {
                dispatch({ type : VALUE_CONFIG_SUCCESS });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type : VALUE_CONFIG_ERROR, payload : error });
            })
    }
}

export const updateValueConfig = (firebase, formID, value, updatedValue) => {
    return async (dispatch, getState) => {
        await firebase.handleUpdateValueConfig(formID, value, updatedValue)
            .then(() => {
                dispatch({ type : UPDATE_VALUE_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type : UPDATE_VALUE_ERROR, payload : error});
            });
    }
}

export const deleteValueConfig = (firebase, formID, valueToDelete) => {
    return async (dispatch, getState) => {
        await firebase.handleDeleteValueConfig(formID, valueToDelete)
            .then(() => {
                dispatch({ type : DELETE_VALUE_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type : DELETE_VALUE_ERROR, payload : error});
            });
    }
}