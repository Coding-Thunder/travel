const endpoints = {
  auth: {
    EXISTING_USER_LOGIN: "/auth/existing-user-login",
    REGISTER_A_NEW_USER: "/auth/register-a-new-user",
  },
  amadeus: {
    SEARCH_LOCATIONS: "/amadeus/locations",
    FETCH_AIRPORTS: "/amadeus/airports",
    SEARCH_FLIGHTS: "/amadeus/search-flights",
    TRANSFER_OFFERS: "/amadeus/transfer-offers",
    HOTELS_BY_CITY: "/amadeus/hotels/by-city",
    HOTEL_OFFERS: "/amadeus/hotels/offers",
    HOTEL_OFFER_DETAILS: "/amadeus/hotels/offers/:offerId",
  },
  booking: {
    CREATE_BOOKING: "/booking",
    GET_BOOKINGS_BY_EMAIL: "/booking/by-email",
    GET_DISCOUNT: "/booking/discount",
    CREATE_CAR_BOOKING: "/booking/car",
    CREATE_HOTEL_BOOKING: "/booking/hotel",
  },
}

export default endpoints
