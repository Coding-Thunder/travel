export interface Airport {
  iataCode: string
  name: string
  cityName: string
  countryCode: string
  countryName?: string
}

export interface SearchCriteria {
  fromAirport: Airport | null
  toAirport: Airport | null
  departureDate: string | null
  returnDate: string | null
  adults: number
  childrens: number
  infants: number
  selectedClass: string
}

export interface CarSearchCriteria {
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
  time?: string
}


export interface Flight {
  [x: string]: {};
  selectedFlight: {};
  id: string;
  oneWay: boolean;
  numberOfBookableSeats: number
  price: {
    total: string;
    currency: string;
    grandTotal: string;
    base: string;
    discount?: number;
  };
  validatingAirlineCodes: string[]
  itineraries: {
    duration: string;
    segments: {
      departure: {
        cityName: string;
        iataCode: string;
        at: string;
      };
      arrival: {
        cityName: string;
        iataCode: string;
        at: string;
      };
      carrierCode: string;
      number: string;
      numberOfStops: number;
      duration: string;
    }[];
  }[];
  refundable: boolean;
}

export interface Airport {
  iataCode: string;
  name: string;
  cityName: string;
  countryName?: string;
}

export interface SearchCriteria {
  fromAirport: Airport | null; // Changed to include airport details
  toAirport: Airport | null; // Changed to include airport details
  departureDate: string | null;
  returnDate: string | null;
  adults: number;
  childrens: number;
  infants: number;
  selectedClass: string;
}

export interface FlightState {
  searchCriteria: SearchCriteria;
}

export interface BookingState {
  selectedFlight: Flight | null;
}

export interface CardInfo {
  number: string;
  month: string;
  year: string;
  cvc: string;
  name: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
}

export interface BillingInfo {
  country: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

// Define interfaces for nested structures
export interface ContactInfo {
  phone: string;
  email: string;
}

export interface Traveler {
  type: "adults" | "childrens" | "infants";
  gender: "male" | "female";
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
}

export interface Segment {
  departure: {
    iataCode: string;
    terminal: string;
    at: string; // ISO 8601 date-time string
  };
  arrival: {
    iataCode: string;
    terminal: string;
    at: string; // ISO 8601 date-time string
  };
  carrierCode: string;
  number: string; // Flight number
  aircraft: {
    code: string;
  };
  operating: {
    carrierCode: string;
  };
  duration: string; // Duration in ISO 8601 format
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface Itinerary {
  duration: string; // Duration in ISO 8601 format
  segments: Segment[];
}

export interface Price {
  currency: string;
  total: string; // Total price
  base: string; // Base price
  fees: {
    amount: string; // Fee amount
    type: string; // Fee type
  }[];
  discount?: number;
  grandTotal: string; // Grand total price
}

export interface PricingOptions {
  fareType: string[]; // Example: ['PUBLISHED']
  includedCheckedBagsOnly: boolean; // Indicates if only checked bags are included
}

export interface TravelerPricing {
  travelerId: string; // ID of the traveler
  fareOption: string; // Fare option
  travelerType: string; // Type of traveler (e.g., ADULT, CHILD)
  price: Price; // Pricing details
  fareDetailsBySegment: {
    segmentId: string; // Segment ID
    cabin: string; // Cabin class
    fareBasis: string; // Fare basis code
    brandedFare: string; // Branded fare type
    brandedFareLabel: string; // Branded fare label
    class: string; // Booking class
    includedCheckedBags: {
      weight: number; // Weight of included checked bags
      weightUnit: string; // Unit of weight (e.g., 'KG')
    };
    includedCabinBags: {
      weight: number; // Weight of included cabin bags
      weightUnit: string; // Unit of weight (e.g., 'KG')
    };
    amenities: {
      description: string; // Description of the amenity
      isChargeable: boolean; // Whether the amenity is chargeable
      amenityType: string; // Type of the amenity
      amenityProvider: {
        name: string; // Provider of the amenity
      };
    }[];
  }[];
}

export interface SelectedFlight {
  type: string; // Type of the flight offer
  id: string; // Flight offer ID
  source: string; // Source of the offer
  instantTicketingRequired: boolean; // Indicates if instant ticketing is required
  nonHomogeneous: boolean; // Indicates if it's a non-homogeneous offer
  oneWay: boolean; // Indicates if it's a one-way flight
  isUpsellOffer: boolean; // Indicates if it's an upsell offer
  lastTicketingDate: string; // Last date for ticketing
  lastTicketingDateTime: string; // Last date and time for ticketing
  numberOfBookableSeats: number; // Number of available seats
  itineraries: Itinerary[]; // List of itineraries
  price: Price; // Price details
  pricingOptions: PricingOptions; // Pricing options
  validatingAirlineCodes: string[]; // List of validating airline codes
  travelerPricings: TravelerPricing[]; // List of traveler pricing details
}

export interface CardInfo {
  number: string; // Card number
  month: string; // Expiration month
  year: string; // Expiration year
  cvc: string; // CVC code
  name: string; // Cardholder name
}

export interface BillingInfo {
  country: string; // Country of the billing address
  address: string; // Address of the billing
  city: string; // City of the billing
  state: string; // State of the billing
  postalCode: string; // Postal code of the billing
}

// Main Booking interface
export interface Booking {
  bookingRef: string
  status: string
  airline: string
  from: string
  to: string
  date: any
  vehicle: string
  location: string
  pickupDate: any
  returnDate: any
  price: number
  type: string
  id: string
  _id: string
  contactInfo: ContactInfo;
  travelers: Traveler[];
  selectedFlight: SelectedFlight;
  cardInfo: CardInfo;
  billingInfo: BillingInfo;
}

export interface DiscountResponse {
  value: number;
}

export interface Layover {
  location: string; // Airport code where the layover occurs
  duration: string; // Layover duration in HH:MM format
}

export interface LayoverResult {
  totalDuration: string; // Total layover duration in HH:MM format
  layovers: Layover[]; // Individual layover details
}

interface Window {
  gtag: (...args: any[]) => void
}