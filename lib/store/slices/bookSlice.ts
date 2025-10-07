import { BookingState, Flight } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BookingState = {
    selectedFlight: null,
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        bookFlight: (state, action: PayloadAction<Flight>) => {
            state.selectedFlight = action.payload;
        },
        resetBooking: (state) => {
            state.selectedFlight = null;
        },
    },
});

export const { bookFlight, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
