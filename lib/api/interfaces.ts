export interface EXISTING_USER_LOGIN {
  email: string
  password: string
}

export interface REGISTER_A_NEW_USER {
  email: string
  password: string
  full_name: string
  confirm_password: string
}

export interface Airport {
  iataCode: string
  name: string
  address: {
    cityName: string
    countryName: string
  }
}

export interface FlightSearchParams {
  from: string
  to: string
  departureDate: string
  returnDate: string | null
  adults: number
  children: number
  infants: number
  classType: string
}

export interface FlightOffer {
  id: string
  price: {
    total: string
    currency: string
  }
  itineraries: Array<{
    duration: string
    segments: Array<{
      departure: {
        iataCode: string
        at: string
      }
      arrival: {
        iataCode: string
        at: string
      }
      carrierCode: string
      number: string
      aircraft: {
        code: string
      }
      duration: string
    }>
  }>
  travelerPricings: Array<{
    travelerId: string
    fareOption: string
    travelerType: string
    price: {
      total: string
      base: string
    }
  }>
}


export interface TransferOfferParams {
  startLocationCode: string
  endAddressLine: string
  endCityName: string
  endZipCode: string
  endCountryCode: string
  endName: string
  endGeoCode: string
  transferType: string
  startDateTime: string
  passengers: number
}

export interface CarBookingDetails {
  transferOffer: any
  driver: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  pickupDetails: {
    date: string
    time: string
    location: string
  }
  dropoffDetails: {
    location: string
  }
  passengers: number
  specialRequests?: string
}

export interface HotelSearchParams {
  cityCode: string
  checkInDate: string
  checkOutDate: string
  adults: number
}

export interface HotelOffer {
  id: string
  hotel: {
    hotelId: string
    name: string
    rating?: string
  }
  available: boolean
  offers: Array<{
    id: string
    checkInDate: string
    checkOutDate: string
    room: {
      type: string
      typeEstimated: {
        category: string
        beds: number
        bedType: string
      }
      description: {
        text: string
      }
    }
    guests: {
      adults: number
    }
    price: {
      currency: string
      total: string
      base: string
    }
    policies: {
      cancellation?: {
        description: {
          text: string
        }
      }
    }
  }>
}

export interface HotelBookingDetails {
  offerId: string
  guests: Array<{
    name: {
      title: string
      firstName: string
      lastName: string
    }
    contact: {
      phone: string
      email: string
    }
  }>
  payments: Array<{
    method: string
    card: {
      vendorCode: string
      cardNumber: string
      expiryDate: string
    }
  }>
}
