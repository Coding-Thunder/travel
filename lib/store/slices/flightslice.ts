import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { SearchCriteria } from "@/lib/types"

interface FlightState {
  searchCriteria: SearchCriteria
  availableFlights: any[]
  selectedFlight: any | null
}

const initialState: FlightState = {
  searchCriteria: {
    fromAirport: null,
    toAirport: null,
    departureDate: new Date().toISOString(),
    returnDate: "",
    adults: 1,
    childrens: 0,
    infants: 0,
    selectedClass: "ECONOMY",
  },
  availableFlights: [],
  selectedFlight: null,
}

const flightSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    setSearchCriteria: (state, action: PayloadAction<SearchCriteria>) => {
      state.searchCriteria = action.payload
    },
    setAvailableFlights: (state, action: PayloadAction<any[]>) => {
      state.availableFlights = action.payload
    },
    setSelectedFlight: (state, action: PayloadAction<any>) => {
      state.selectedFlight = action.payload
    },
  },
})

export const { setSearchCriteria, setAvailableFlights, setSelectedFlight } = flightSlice.actions
export default flightSlice.reducer
