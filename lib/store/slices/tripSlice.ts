import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface TripState {
  isRoundTrip: boolean
}

const initialState: TripState = {
  isRoundTrip: false,
}

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setRoundTrip: (state, action: PayloadAction<boolean>) => {
      state.isRoundTrip = action.payload
    },
  },
})

export const { setRoundTrip } = tripSlice.actions
export default tripSlice.reducer
