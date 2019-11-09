import {login} from "../services/User";


export function doLogin(email, password) {
    return function (dispatch) {

        dispatch(isLoggingIn());

        let loginPromise = login(email, password);
        loginPromise.then((response) => {
            console.log(response)
            //news is fetched
            dispatch(isLoggedIn([]));

        }).catch((err) => {
            dispatch(isLoggedIn({}));
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