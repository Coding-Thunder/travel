import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Flight {
  id: string
  airline: string
  from: string
  to: string
  departure: string
  arrival: string
  price: number
  duration: string
}

interface Car {
  id: string
  brand: string
  model: string
  type: string
  price: number
  image: string
  features: string[]
}

interface Destination {
  id: string
  city: string
  country: string
  image: string
  description: string
}

interface Deal {
  id: string
  title: string
  description: string
  discount: number
  validUntil: string
}

interface AdminState {
  flights: Flight[]
  cars: Car[]
  destinations: Destination[]
  deals: Deal[]
}

const initialState: AdminState = {
  flights: [
    {
      id: "1",
      airline: "American Airlines",
      from: "New York (JFK)",
      to: "Los Angeles (LAX)",
      departure: "2025-06-15T08:00",
      arrival: "2025-06-15T11:30",
      price: 299,
      duration: "5h 30m",
    },
    {
      id: "2",
      airline: "Delta",
      from: "Chicago (ORD)",
      to: "Miami (MIA)",
      departure: "2025-06-20T14:00",
      arrival: "2025-06-20T18:00",
      price: 249,
      duration: "3h 00m",
    },
  ],
  cars: [
    {
      id: "1",
      brand: "Toyota",
      model: "Camry",
      type: "Sedan",
      price: 45,
      image: "/toyota-camry.png",
      features: ["Automatic", "AC", "5 Seats", "Bluetooth"],
    },
    {
      id: "2",
      brand: "Ford",
      model: "Explorer",
      type: "SUV",
      price: 75,
      image: "/ford-explorer-suv.jpg",
      features: ["Automatic", "AC", "7 Seats", "GPS", "4WD"],
    },
  ],
  destinations: [
    {
      id: "1",
      city: "Paris",
      country: "France",
      image: "/paris-eiffel-tower.png",
      description: "The City of Light awaits with iconic landmarks and world-class cuisine.",
    },
    {
      id: "2",
      city: "Tokyo",
      country: "Japan",
      image: "/tokyo-skyline.png",
      description: "Experience the perfect blend of tradition and cutting-edge technology.",
    },
    {
      id: "3",
      city: "New York",
      country: "USA",
      image: "/new-york-city-skyline.png",
      description: "The city that never sleeps offers endless entertainment and culture.",
    },
  ],
  deals: [
    {
      id: "1",
      title: "Summer Flight Sale",
      description: "Save up to 30% on flights to Europe",
      discount: 30,
      validUntil: "2025-08-31",
    },
  ],
}

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Flight CRUD
    addFlight: (state, action: PayloadAction<Flight>) => {
      state.flights.push(action.payload)
    },
    updateFlight: (state, action: PayloadAction<Flight>) => {
      const index = state.flights.findIndex((f) => f.id === action.payload.id)
      if (index !== -1) state.flights[index] = action.payload
    },
    deleteFlight: (state, action: PayloadAction<string>) => {
      state.flights = state.flights.filter((f) => f.id !== action.payload)
    },
    // Car CRUD
    addCar: (state, action: PayloadAction<Car>) => {
      state.cars.push(action.payload)
    },
    updateCar: (state, action: PayloadAction<Car>) => {
      const index = state.cars.findIndex((c) => c.id === action.payload.id)
      if (index !== -1) state.cars[index] = action.payload
    },
    deleteCar: (state, action: PayloadAction<string>) => {
      state.cars = state.cars.filter((c) => c.id !== action.payload)
    },
    // Destination CRUD
    addDestination: (state, action: PayloadAction<Destination>) => {
      state.destinations.push(action.payload)
    },
    updateDestination: (state, action: PayloadAction<Destination>) => {
      const index = state.destinations.findIndex((d) => d.id === action.payload.id)
      if (index !== -1) state.destinations[index] = action.payload
    },
    deleteDestination: (state, action: PayloadAction<string>) => {
      state.destinations = state.destinations.filter((d) => d.id !== action.payload)
    },
    // Deal CRUD
    addDeal: (state, action: PayloadAction<Deal>) => {
      state.deals.push(action.payload)
    },
    updateDeal: (state, action: PayloadAction<Deal>) => {
      const index = state.deals.findIndex((d) => d.id === action.payload.id)
      if (index !== -1) state.deals[index] = action.payload
    },
    deleteDeal: (state, action: PayloadAction<string>) => {
      state.deals = state.deals.filter((d) => d.id !== action.payload)
    },
  },
})

export const {
  addFlight,
  updateFlight,
  deleteFlight,
  addCar,
  updateCar,
  deleteCar,
  addDestination,
  updateDestination,
  deleteDestination,
  addDeal,
  updateDeal,
  deleteDeal,
} = adminSlice.actions
export default adminSlice.reducer
