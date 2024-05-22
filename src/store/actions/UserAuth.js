import {
    AUTH_USER_ERROR,
    AUTH_USER_SUCCESS,
    CLEAR_USER, FETCH_USER_ERROR, FETCH_USER_SUCCESS, LOGIN_USER_SUCCESS, SET_USER_ERROR, SET_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS,
    USER_LOADER,
} from "../types"

export const setUser = (email, password, displayName, country, state, city, profileImage, firebase, navigate) => {

    return async (dispatch, getState) => {
        dispatch(loader(true));
        await firebase.signUpUserWithEmailAndPassword(email, password, displayName, country, state, city, profileImage)
            .then(() => {
                navigate("/login");
                dispatch({ type: SET_USER_SUCCESS, });
            })
            .catch((error) => {
                console.log(error);
                dispatch(loader(false));
                throw error;
            });
    }
}

export const setSubUser = (email, password, displayName, category, firebase) => {

    return async (dispatch, getState) => {
        await firebase.signUpUserWithEmailAndPassword(email, password)
            .then( async (userCredential) => {
                const user = userCredential.user;

                await firebase.handleSubUserProfile(user, email, displayName, category)
                console.log("SignUp user : ", user);
                dispatch({ type : SET_USER_SUCCESS, payload: user });
            })
            .catch((error) => {
                dispatch({ type : SET_USER_ERROR, payload : error})
            });
    }
}

export const loginUser = (firebase, email, password) => {
    return async (dispatch, getState) => {
        await firebase.signInUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log("Successfull results ", result);
                const user = result.user;
                dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
            })
            .catch((error) => {
                console.log(error);
                throw error;
            })
    }
}

export const clearUser = () => {
    return {
        type: CLEAR_USER,
    }
}

export const getUser = (firebase, userID) => {

    return async (dispatch, getState) => {
        await firebase.getUserData(userID)
            .then((user) => {
                dispatch({ type: FETCH_USER_SUCCESS, payload: user });
            })
            .catch((error) => {
                dispatch({ type: FETCH_USER_ERROR, payload: error })
            });
    }
}

export const updateUser = (firebase, userID, updateDisplayName, updateCountry, updateProfileImage) => {

    return async (dispatch, getState) => {
        await firebase.handleUpdateUserProfile(userID, updateDisplayName, updateCountry, updateProfileImage)
            .then(() => {
                dispatch({ type: UPDATE_USER_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type: UPDATE_USER_ERROR, payload: error });
            });
    }
}

export const authenticateUser = (firebase, passwordGet) => {

    return async (dispatch, getState) => {
        await firebase.handleAuthenticateUser(passwordGet)
            .then(() => {
                dispatch({ type: AUTH_USER_SUCCESS });
            })
            .catch((error) => {
                dispatch({ type: AUTH_USER_ERROR, payload: error });
                throw error;
            });
    }
}

export const loader = (value) => {
    return async (dispatch, getState) => {
        dispatch({
            type: USER_LOADER,
            payload: value,
        });
    }
}