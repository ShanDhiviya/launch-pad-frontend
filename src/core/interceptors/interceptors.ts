/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, {AxiosInstance} from "axios";
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/';

axios.defaults.headers.common["Accept"] = "application/json";

export const httpClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
    },
});

export const httpAuth = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
    },
});

// Add token to requests if available
// @ts-ignore
httpAuth.interceptors.request.use((config: { headers: { Authorization: string; }; }) => {
    const token = Cookies.get('token');
    console.log(token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

