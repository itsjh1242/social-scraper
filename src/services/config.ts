import axios from "axios";

const exampleBaseUrl = import.meta.env.VITE_API_EXAMPLE_BASE_URL || "/";
const baseUrl = import.meta.env.VITE_API_BASE_URL || "/";

export const exampleAPIClient = axios.create({
  baseURL: exampleBaseUrl,
  timeout: 5000,
});

export const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});
