import {config} from "../config";
import {endpoints} from "../endpoints";
import axios from "axios";

axios.defaults.headers = {
    'Content-Type': 'application/json',
    //'Authorization': ' Bearer ',
    'Accept': 'application/json'
};


export async function login(email, password) {

    const body = {
        email: email,
        password: password
    };
    return await axios.post(`${config.API_BASE_URL}${endpoints.LOGIN}`, body, {headers: {}});
}


export async function register(email, password) {

    const body = {
        email: email,
        password: password
    };
    return await axios.post(`${config.API_BASE_URL}${endpoints.REGISTER}`, body, {headers: {}});
}