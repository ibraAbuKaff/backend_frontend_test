import {login, signup} from "../services/User";
import __ from "lodash";

export function doLogin(email, password) {
    return function (dispatch) {

        dispatch(isLoggingIn());

        let loginPromise = login(email, password);
        loginPromise.then((response) => {
            const token = __.get(response.data, 'token', '')

            if (__.isEmpty(token)) {
                dispatch(got_error("sorry can not login"));
            }

            const user = __.get(response.data, 'user', {})
            dispatch(isLoggedIn(user));
            dispatch(got_error(''));
            dispatch(setToken(token));

        }).catch((err) => {
            dispatch(got_error("sorry can not login"));
        });
    };
}


export function doSignup(email, password, userType) {
    return function (dispatch) {

        dispatch(isLoggingIn());

        let signupPromise = signup(email, password, userType);
        signupPromise.then((response) => {
            const token = __.get(response.data, 'token', '')
            console.log(response.data)
            console.log(token)
            if (__.isEmpty(token)) {
                dispatch(got_error("sorry can not signup"));
            }

            const user = __.get(response.data, 'user', {})
            dispatch(isLoggedIn(user));
            dispatch(got_error(''));
            dispatch(setToken(token));

        }).catch((err) => {
            dispatch(got_error("sorry can not signup"));
        });
    };
}

export function isLoggingIn() {
    return {
        type: 'IS_LOGGING_IN',
        user: {},
    };
}


export function isLoggedIn(user) {
    return {
        type: 'LOGGED_IN',
        user,
    };
}

export function setEmail(email) {
    return {
        type: 'SET_EMAIL',
        email: email,
    };
}

export function setPassword(password) {
    return {
        type: 'SET_PASSWORD',
        password: password,
    };
}

export function setUserType(userType) {
    return {
        type: 'SET_USER_TYPE',
        userType: userType,
    };
}

export function got_error(error) {
    return {
        type: 'GOT_ERROR',
        error,
    };
}

export function setToken(token) {


    return {
        type: 'SET_TOKEN',
        token,
    };


}