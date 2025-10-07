import { config } from "@/lib/config"
import axios, { type AxiosInstance } from "axios"

const baseURL = config.productionServerUrl

export const publicAxiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
})

export const privateAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

privateAxiosInstance.interceptors.request.use(
  (request) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        request.headers["Authorization"] = `Bearer ${token}`
      }
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)
