import { API_BASE_URL, API_TIMEOUT_IN_MS } from "@/lib/constants";
import axios from "axios";

const backendApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true,
  timeout: API_TIMEOUT_IN_MS, // 120 seconds
});

export default backendApi;
