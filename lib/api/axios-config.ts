import axios from "axios"
import { siteConfig } from "@/lib/config"

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  siteConfig.api?.baseUrl ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? siteConfig.localServerUrl
    : siteConfig.productionServerUrl)

if (process.env.NODE_ENV === "development") {
  console.log("[Axios] baseURL configured as:", baseURL)
}

// Public Axios Instance (no auth required)
export const publicAxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Private Axios Instance (requires authentication)
export const privateAxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor for private instance to include auth token
privateAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor for error handling
const handleResponseError = (error: any) => {
  // Only log non-network errors in development
  if (process.env.NODE_ENV === "development" && error.response) {
    console.error("[v0] API Error:", error.response.status, error.response.data)
  }
  // Silently pass through network errors - they're handled by api-service with mock data fallback
  return Promise.reject(error)
}

publicAxiosInstance.interceptors.response.use((response) => response, handleResponseError)

privateAxiosInstance.interceptors.response.use((response) => response, handleResponseError)
