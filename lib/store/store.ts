import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import bookingReducer from "./slices/bookSlice"
import adminReducer from "./slices/adminSlice"
import flightsReducer from "./slices/flightslice"
import tripReducer from "./slices/tripSlice"
import carReducer from "./slices/carSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer,
    admin: adminReducer,
    flights: flightsReducer,
    trip: tripReducer,
    car: carReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
