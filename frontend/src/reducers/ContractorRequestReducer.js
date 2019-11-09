const initState = {
    id: '',
    name: '',
    year: '',
    model: '',
    capacity: '',
    location: '',
    error: "",
    status: "",
    startAt: "",
    endAt: "",
    inProgress: false,
    request: {},
};

export function contractorRequestReducer(state = initState, contractorRequestAction) {

    switch (contractorRequestAction.type) {

        case 'SET_NAME':
            return {
                ...state, name: contractorRequestAction.name
            };

        case 'SET_YEAR':
            return {
                ...state, year: contractorRequestAction.year
            };

        case 'SET_MODEL':
            return {
                ...state, model: contractorRequestAction.model,
            };

        case 'SET_CAPACITY':
            return {
                ...state, capacity: contractorRequestAction.capacity,
            };

        case 'SET_LOCATION':
            return {
                ...state, location: contractorRequestAction.location,
            };

        case 'GOT_ERROR':
            return {
                ...state, error: contractorRequestAction.error,
            };

        case 'SET_STATUS':
            return {
                ...state, status: contractorRequestAction.status,
            };

        case 'SET_START_AT':
            return {
                ...state, startAt: contractorRequestAction.startAt,
            };


        case 'SET_END_AT':
            return {
                ...state, endAt: contractorRequestAction.endAt,
            };

        case 'SET_ID':
            return {
                ...state, id: contractorRequestAction.id,
            };

        case 'IS_SENDING':
            return {
                ...state, inProgress: true,
            };

        case 'SET_REQUEST':
            return {
                ...state, reqeust: contractorRequestAction.reqeust,
            };

        case 'DONE':
            return {
                ...state, inProgress: false,
            };


        default:
            return state;
    }

}