// src/store/searchSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchCriteria {
  startLocationCode: string;
  endAddressLine: string;
  endCityName: string;
  endZipCode: string;
  endCountryCode: string;
  endName: string;
  endGeoCode: string;
  transferType: string;
  startDateTime: string;
  passengers: number;
  time: string;
}

interface SelectedCar {
  id: string;
  vehicle: {
    description: string;
    imageURL?: string;
    seats?: { count: number }[];
    baggages?: { count: number; size: string }[];
  };
  serviceProvider?: {
    name: string;
    logoUrl?: string;
  };
  quotation?: {
    monetaryAmount: number;
    currency?: string;
  };
  extraServices?: { description: string }[];
}

interface SearchState {
  criteria: SearchCriteria | null;
  selectedCar: SelectedCar | null;
}

const initialState: SearchState = {
  criteria: null,
  selectedCar: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchCriteria: (state, action: PayloadAction<SearchCriteria>) => {
      state.criteria = action.payload;
    },
    clearSearchCriteria: (state) => {
      state.criteria = null;
      state.selectedCar = null;
    },
    setSelectedCar: (state, action: PayloadAction<SelectedCar>) => {
      state.selectedCar = action.payload;
    },
    clearSelectedCar: (state) => {
      state.selectedCar = null;
    },
  },
});

export const {
  setSearchCriteria,
  clearSearchCriteria,
  setSelectedCar,
  clearSelectedCar,
} = searchSlice.actions;

export default searchSlice.reducer;
