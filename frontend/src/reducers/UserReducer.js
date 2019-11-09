const initState = {
    email: '',
    password: '',
    token: '',
    user: {},
    isLogging: false,
    error: "",
    userType: "",
};

export function userReducer(state = initState, userAction) {

    switch (userAction.type) {

        case 'IS_LOGGING_IN':
            return {
                ...state, user: userAction.user, isLogging: true
            };

        case 'LOGGED_IN':
            return {
                ...state, user: userAction.user, isLogging: false
            };

        case 'SET_EMAIL':
            return {
                ...state, email: userAction.email,
            };

        case 'SET_PASSWORD':
            return {
                ...state, password: userAction.password,
            };
        case 'GOT_ERROR':
            return {
                ...state, error: userAction.error,
            };

        case 'SET_TOKEN':
            return {
                ...state, token: userAction.token,
            };
        case 'SET_USER_TYPE':
            return {
                ...state, userType: userAction.userType,
            };
        default:
            return state;
    }

}