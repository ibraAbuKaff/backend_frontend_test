const initState = {
    email: '',
    password: '',
    user: {},
    isLogging: false,
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

        default:
            return state;
    }

}