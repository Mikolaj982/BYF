import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://34.172.117.230:8080/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
