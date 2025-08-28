/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import Cookies from 'js-cookie';
import {router} from "next/client";
import {ROUTES} from "@/core";
import {toast} from "sonner";
import {clearToken, clearUser} from "@/core/utils";

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

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


httpAuth.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error: AxiosError) => {

    console.error('Response error:', error.response?.status);

    if (error.response?.status === 401) {
        clearToken();
        clearUser();
        router.push(ROUTES.LOGIN).then();
    }

    if (error.response?.status === 403) {
        console.log(error);
    }

    return Promise.reject(error);
})
