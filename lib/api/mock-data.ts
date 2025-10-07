// Mock data for development/preview when backend API is unavailable

export const mockLocations = [
  {
    iataCode: "JFK",
    name: "John F. Kennedy International Airport",
    address: {
      cityName: "New York",
      countryCode: "US",
      postalCode: "11430",
    },
    geoCode: { latitude: 40.6413, longitude: -73.7781 },
  },
  {
    iataCode: "LAX",
    name: "Los Angeles International Airport",
    address: {
      cityName: "Los Angeles",
      countryCode: "US",
      postalCode: "90045",
    },
    geoCode: { latitude: 33.9416, longitude: -118.4085 },
  },
  {
    iataCode: "ORD",
    name: "O'Hare International Airport",
    address: {
      cityName: "Chicago",
      countryCode: "US",
      postalCode: "60666",
    },
    geoCode: { latitude: 41.9742, longitude: -87.9073 },
  },
  {
    iataCode: "MIA",
    name: "Miami International Airport",
    address: {
      cityName: "Miami",
      countryCode: "US",
      postalCode: "33142",
    },
    geoCode: { latitude: 25.7959, longitude: -80.287 },
  },
  {
    iataCode: "LHR",
    name: "London Heathrow Airport",
    address: {
      cityName: "London",
      countryCode: "GB",
      postalCode: "TW6",
    },
    geoCode: { latitude: 51.47, longitude: -0.4543 },
  },
]

export const mockAirports = mockLocations

export const mockFlights = [
  {
    id: "FL001",
    airline: "American Airlines",
    flightNumber: "AA100",
    departure: {
      airport: "JFK",
      time: "08:00",
      date: new Date().toISOString(),
    },
    arrival: {
      airport: "LAX",
      time: "11:30",
      date: new Date().toISOString(),
    },
    price: 299,
    duration: "5h 30m",
    stops: 0,
  },
  {
    id: "FL002",
    airline: "Delta Airlines",
    flightNumber: "DL200",
    departure: {
      airport: "JFK",
      time: "10:00",
      date: new Date().toISOString(),
    },
    arrival: {
      airport: "LAX",
      time: "13:30",
      date: new Date().toISOString(),
    },
    price: 349,
    duration: "5h 30m",
    stops: 0,
  },
]

export const mockTransferOffers = [
  {
    id: "TR001",
    vehicleType: "Sedan",
    capacity: 4,
    price: 75,
    duration: "45 minutes",
    provider: "Premium Transfers",
  },
  {
    id: "TR002",
    vehicleType: "SUV",
    capacity: 6,
    price: 95,
    duration: "45 minutes",
    provider: "Premium Transfers",
  },
]

export const mockHotels = [
  {
    id: "HT001",
    name: "Grand Plaza Hotel",
    rating: 4.5,
    price: 150,
    address: "123 Main St, New York, NY",
    amenities: ["WiFi", "Pool", "Gym", "Restaurant"],
  },
  {
    id: "HT002",
    name: "City Center Inn",
    rating: 4.0,
    price: 120,
    address: "456 Park Ave, New York, NY",
    amenities: ["WiFi", "Breakfast", "Parking"],
  },
]
