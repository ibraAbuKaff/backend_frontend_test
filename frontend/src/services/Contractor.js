import {config} from "../config";
import {endpoints} from "../endpoints";
import axios from "axios";

axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': ' Bearer ' + localStorage.getItem('token'),
};

export async function submitRequest(request) {
    return await axios.post(`${config.API_BASE_URL}${endpoints.SUBMIT_REQUEST}`, request);
}


export async function getMyRequests(page = 1, status = 'awaiting') {
    return await axios.get(`${config.API_BASE_URL}${endpoints.GET_MY_REQUESTS_AS_CONTRACTOR}?page=${page}&status=${status}`);
}
