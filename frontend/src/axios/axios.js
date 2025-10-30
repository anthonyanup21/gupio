import axios from "axios"

//change this in development
const BASE_URL="http://localhost:3000/api"

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})