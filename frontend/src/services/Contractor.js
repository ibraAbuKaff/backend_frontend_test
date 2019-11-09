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

