import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HotelOffer {
    hotelId: string;
    hotelName: string;
    offerId: string;
    checkInDate: string;
    checkOutDate: string;
    policies:any
    price: {
        currency: string;
        total: string;
    };
    room: {
        description?: { text: string };
        typeEstimated?: { beds?: number; bedType?: string };
    };
}

interface HotelState {
    selectedOffer: HotelOffer | null;
}

const initialState: HotelState = {
    selectedOffer: null,
};

export const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {
        setSelectedOffer: (state, action: PayloadAction<HotelOffer>) => {
            state.selectedOffer = action.payload;
        },
        clearSelectedOffer: (state) => {
            state.selectedOffer = null;
        },
    },
});

export const { setSelectedOffer, clearSelectedOffer } = hotelSlice.actions;
export default hotelSlice.reducer;
