import { publicAxiosInstance } from "./axios-config"
import endpoints from "./endpoints"
import type {
  EXISTING_USER_LOGIN,
  REGISTER_A_NEW_USER,
  FlightSearchParams,
  TransferOfferParams,
  CarBookingDetails,
  HotelBookingDetails,
} from "./interfaces"
import { mockLocations, mockAirports, mockFlights, mockTransferOffers, mockHotels } from "./mock-data"

const isApiUnavailable = (error: any) => {
  return error.code === "ERR_NETWORK" || error.message?.includes("Network Error")
}

const login = async (payload: EXISTING_USER_LOGIN) => {
  return await publicAxiosInstance.post(endpoints.auth.EXISTING_USER_LOGIN, payload)
}

const signup = async (payload: REGISTER_A_NEW_USER) => {
  return await publicAxiosInstance.post(endpoints.auth.REGISTER_A_NEW_USER, payload)
}

const searchLocations = async (payload: { keyword: string }) => {
  try {
    return await publicAxiosInstance.get(`/amadeus/locations`, {
      params: { keyword: payload.keyword },
    })
  } catch (error: any) {
    if (isApiUnavailable(error)) {
      // Filter mock locations based on keyword
      const filtered = mockLocations.filter(
        (loc) =>
          loc.name.toLowerCase().includes(payload.keyword.toLowerCase()) ||
          loc.iataCode.toLowerCase().includes(payload.keyword.toLowerCase()) ||
          loc.address.cityName.toLowerCase().includes(payload.keyword.toLowerCase()),
      )
      return { data: { data: filtered } }
    }
    throw error
  }
}

const fetchAirports = async (query: string) => {
  try {
    const response = await publicAxiosInstance.get('/amadeus/airports', {
      params: {
        keyword: query,  // Pass the search keyword
        subType: 'AIRPORT',  // Define the subType as 'AIRPORT'
        page: 0  // Optionally, pass the page number (default to 0)
      }
    });
    return response.data
  } catch (error) {
    // consoleerror('Error fetching airports:', error);
  }
};

const fetchAvailableFlights = async (searchParams: FlightSearchParams) => {
  try {
    const response = await publicAxiosInstance.get("/amadeus/search-flights", { params: searchParams })
    return response.data
  } catch (error: any) {
    if (isApiUnavailable(error)) {
      return { data: mockFlights }
    }
    console.error("Error fetching available flights:", error)
    throw error
  }
}

const createBooking = async (bookingDetails: any) => {
  try {
    const response = await publicAxiosInstance.post("/booking", bookingDetails)
    return response.data
  } catch (error) {
    console.error("Error creating booking:", error)
    throw error
  }
}

const getBookingsByEmail = async (email: string, skip = 0, limit = 10) => {
  try {
    const response = await publicAxiosInstance.get(
      `/booking/by-email?email=${encodeURIComponent(email)}&skip=${skip}&limit=${limit}`,
    )
    return response.data
  } catch (error) {
    console.error("Error fetching bookings:", error)
    throw error
  }
}

const getBookingDiscount = async () => {
  try {
    const response = await publicAxiosInstance.get("/booking/discount")
    return response.data
  } catch (error) {
    console.error("Error fetching booking discount:", error)
    throw error
  }
}

const getTransferOffers = async (payload: TransferOfferParams) => {
  try {
    const response = await publicAxiosInstance.post("/amadeus/transfer-offers", payload)
    return response.data
  } catch (error: any) {
    if (isApiUnavailable(error)) {
      return { data: mockTransferOffers }
    }
    console.error("Error fetching transfer offers:", error)
    throw error
  }
}

const createCarBooking = async (bookingDetails: any) => {
  try {
    const response = await publicAxiosInstance.post("/booking/car", bookingDetails)
    return response.data
  } catch (error: any) {
    console.error("Error creating car booking:", error.response || error)
    throw error
  }
}

const createHotelBooking = async (bookingDetails: HotelBookingDetails) => {
  try {
    const response = await publicAxiosInstance.post("/booking/hotel", bookingDetails)
    return response.data
  } catch (error: any) {
    console.error("Error creating hotel booking:", error.response || error)
    throw error
  }
}

const getHotelsByCity = async (cityCode: string) => {
  try {
    const response = await publicAxiosInstance.get("/amadeus/hotels/by-city", {
      params: { cityCode },
    })
    return response.data
  } catch (error: any) {
    if (isApiUnavailable(error)) {
      return { data: mockHotels }
    }
    console.error("Error fetching hotels by city:", error)
    throw error
  }
}

const getHotelOffers = async (params: {
  hotelIds: string
  checkInDate: string
  checkOutDate: string
  adults: number
}) => {
  try {
    const response = await publicAxiosInstance.get("/amadeus/hotels/offers", {
      params,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching hotel offers:", error)
    throw error
  }
}

const getHotelOfferDetails = async (offerId: string) => {
  try {
    const response = await publicAxiosInstance.get(`/amadeus/hotels/offers/${offerId}`)
    return response.data
  } catch (error) {
    console.error("Error fetching hotel offer details:", error)
    throw error
  }
}

const getDashboardData = async () => {
  const { data } = await publicAxiosInstance.get("/dashboard/data")
  return data
}

const getRecentBookings = async () => {
  const { data } = await publicAxiosInstance.get("/dashboard/recent-bookings")
  return data
}

const getAllBookings = async (params?: any) => {
  try {
    const { data } = await publicAxiosInstance.get('/booking', { params })
    return data
  } catch (error) {
    console.error('Error fetching all bookings:', error)
    throw error
  }
}

const apiService = {
  login,
  signup,
  fetchAirports,
  fetchAvailableFlights,
  createBooking,
  getBookingsByEmail,
  getBookingDiscount,
  searchLocations,
  getTransferOffers,
  createCarBooking,
  getHotelOfferDetails,
  getHotelOffers,
  getHotelsByCity,
  createHotelBooking,
  getDashboardData,
  getRecentBookings,
  getAllBookings
}

export default apiService
