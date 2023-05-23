import axios from "axios";
import { BASE_API_URL } from "../constants/config";

// Default
const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

// Fetch Data using with Hook useAxiosPrivate
export const axiosPrivate = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

export default axiosInstance;
