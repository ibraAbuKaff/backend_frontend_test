import __ from "lodash";
import {submitRequest} from "../services/Contractor";

export function submit(request) {
    return function (dispatch) {

        dispatch(is_sending());

        let submitRequestPromise = submitRequest(request);
        submitRequestPromise.then((response) => {
            const result = __.get(response, 'data', {});

            dispatch(set_id(result['_id']));
            dispatch(set_request(result));
            dispatch(got_error(''));
            dispatch(done());

        }).catch((err) => {
            const message = __.get(err.response.data, 'message', 'sorry can not submit a request');
            dispatch(got_error(message));
        });
    };
}


export function is_sending() {

    return {
        type: 'IS_SENDING'
    };
}


export function done() {

    return {
        type: 'DONE'
    };
}

export function set_location(location) {

    return {
        type: 'SET_LOCATION',
        location

    };
}

export function set_capacity(capacity) {

    return {
        type: 'SET_CAPACITY',
        capacity

    };
}

export function set_model(model) {

    return {
        type: 'SET_MODEL',
        model

    };
}

export function set_year(year) {

    return {
        type: 'SET_YEAR',
        year

    };
}

export function set_name(name) {

    return {
        type: 'SET_NAME',
        name

    };
}

export function set_status(status) {

    return {
        type: 'SET_STATUS',
        status

    };
}

export function set_start_at(startAt) {

    return {
        type: 'SET_START_AT',
        startAt

    };
}

export function set_end_at(endAt) {

    return {
        type: 'SET_END_AT',
        endAt

    };
}

export function set_id(id) {
    return {
        type: 'SET_ID',
        id
    };
}

export function set_request(request) {
    return {
        type: 'SET_REQUEST',
        request
    };
}

export function got_error(error) {
    return {
        type: 'GOT_ERROR',
        error,
    };
}
