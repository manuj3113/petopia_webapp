"use client"
import axios from "axios";
import { getCookies } from "../actions";
// import { cookies } from "next/headers";

console.log(process.env.NEXT_PUBLIC_API_URL  ,"ooooo")
// Create an Axios instance
const api = axios.create ({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3012",
  timeout:100000
});


api.interceptors.request.use(
 async (config) => {
    const token = await  getCookies("token")
    console.log(token)
    if (token?.value) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response error:", error.response.data);
      if (error.response.status === 401) {
        // Handle unauthorized error, e.g., redirect to login
        console.log("Unauthorized, redirecting to login...");
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error:", error.message);
    }
    const err  = new Error(error)
    console.log(error.response)
    err.statusCode = error?.response?.status
    err.data= error.response?.data?.error;
        throw err
  }
);

export default api;