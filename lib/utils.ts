export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Segment } from "./types";

type AirlineCode =
  | "AA"
  | "AC"
  | "AD"
  | "AE"
  | "AF"
  | "AG"
  | "AH"
  | "AK"
  | "AM"
  | "AS"
  | "AT"
  | "AV"
  | "AY"
  | "B6"
  | "BA"
  | "BD"
  | "BF"
  | "BG"
  | "BR"
  | "CA"
  | "CI"
  | "CL"
  | "CM"
  | "CX"
  | "DA"
  | "DL"
  | "EI"
  | "EK"
  | "EY"
  | "FJ"
  | "FM"
  | "FR"
  | "GA"
  | "GF"
  | "GL"
  | "GQ"
  | "GY"
  | "HA"
  | "HX"
  | "IB"
  | "IC"
  | "IL"
  | "IR"
  | "JL"
  | "JM"
  | "KL"
  | "KM"
  | "LA"
  | "LH"
  | "LX"
  | "LY"
  | "MA"
  | "MH"
  | "MU"
  | "NZ"
  | "OK"
  | "OS"
  | "OZ"
  | "P2"
  | "QF"
  | "QR"
  | "RA"
  | "RJ"
  | "SK"
  | "SL"
  | "SQ"
  | "SU"
  | "SV"
  | "TG"
  | "TK"
  | "UA"
  | "UL"
  | "US"
  | "VA"
  | "VS"
  | "WN"
  | "WY"
  | "YX";


export const routings = {
  home: "/",
  search_flights: "/search-flights",
  my_bookings: "/my-bookings",
  about: "/about",
  support: "/support",
  sign_in: "/login",
  sign_up: "/sign-up",
  terms_and_conditions: "/terms-and-conditions",
  sign_in_success: "/sign-in-success",
  book_now: "/book-now",
  booking_successfull: "/booking-successfull",
  itinerary: "/itinerary",
  cancelation_policy: "/cancelation-policy",
  privacy_policy: "/privacy-policy"
};

export const handleError = (error: any, toast: any) => {
  // consolelog(error, "error");
  const messageError = error.response.data.message;
  if (Array.isArray(messageError)) {
    toast({ description: messageError[0], duration: 2000 });
  }
  toast({ description: messageError, duration: 2000 });
};

export const config = {
  localServerUrl: "http://localhost:3002",
  productionServerUrl: "https://api.universalticketss.com",
};

export const getAirlineName = (carrierCode: string) => {
  const airlines: { [key: string]: string } = {
    AA: "American Airlines",
    AC: "Air Canada",
    AD: "Azul Brazilian Airlines",
    AE: "Mandarin Airlines",
    AF: "Air France",
    AG: "Aloha Airlines",
    AH: "Air Algerie",
    AK: "Alaska Airlines",
    AM: "Aeromexico",
    AS: "Alaska Airlines",
    AT: "Royal Air Maroc",
    AV: "Avianca",
    AY: "Finnair",
    B6: "JetBlue Airways",
    BA: "British Airways",
    BD: "BMI",
    BF: "Air Burkina",
    BG: "Biman Bangladesh Airlines",
    BR: "EVA Air",
    CA: "Air China",
    CI: "China Airlines",
    CL: "Lufthansa CityLine",
    CM: "Copa Airlines",
    CX: "Cathay Pacific",
    DA: "Flybe",
    DL: "Delta Air Lines",
    EI: "Aer Lingus",
    EK: "Emirates",
    EY: "Etihad Airways",
    FJ: "Fiji Airways",
    FM: "Shanghai Airlines",
    FR: "Ryanair",
    GA: "Garuda Indonesia",
    GF: "Gulf Air",
    GL: "Air Greenland",
    GQ: "Air Guinea",
    GY: "Sky Airline",
    HA: "Hawaiian Airlines",
    HX: "Hong Kong Airlines",
    IB: "Iberia",
    IC: "Indian Airlines",
    IL: "Icelandair",
    IR: "Iran Air",
    JL: "Japan Airlines",
    JM: "Air Jamaica",
    KL: "KLM Royal Dutch Airlines",
    KM: "Air Malta",
    LA: "LATAM Airlines",
    LH: "Lufthansa",
    LX: "Swiss International Air Lines",
    LY: "El Al",
    MA: "Moroccan Airlines",
    MH: "Malaysia Airlines",
    MU: "China Eastern Airlines",
    NZ: "Air New Zealand",
    NK: "Spirit Airlines",
    OK: "Czech Airlines",
    OS: "Austrian Airlines",
    OZ: "Asiana Airlines",
    P2: "PGA-Portugalia Airlines",
    QF: "Qantas Airways",
    QR: "Qatar Airways",
    RA: "Royal Nepal Airlines",
    RJ: "Royal Jordanian",
    SK: "Scandinavian Airlines",
    SL: "Thai Smile Airways",
    SQ: "Singapore Airlines",
    SU: "Aeroflot",
    SV: "Saudia",
    TG: "Thai Airways",
    TK: "Turkish Airlines",
    UA: "United Airlines",
    UL: "SriLankan Airlines",
    US: "US Airways",
    VA: "Virgin Australia",
    VS: "Virgin Atlantic Airways",
    WN: "Southwest Airlines",
    WY: "Oman Air",
    YX: "Republic Airways",
    AI: "Air India",
    BJ: "Nouvelair",
    HV: "Transavia",
    KE: "Korean Air",
    ME: "Middle East Airlines",
    PK: "Pakistan International Airlines",
    SN: "Brussels Airlines",
    UX: "Air Europa",
    WF: "Air Tahiti Nui",
    XJ: "Thai AirAsia",
  };

  return airlines[carrierCode] || carrierCode; // Fallback to the carrier code if not found
};


export const flightCodes = {
  NK: "NK", // Spirit Airlines
  DL: "DL", // Delta Air Lines
  WN: "WN", // Southwest Airlines
  UA: "UA", // United Airlines
  HA: "HA", // Hawaiian Airlines
  AS: "AS", // Alaska Airlines
  F9: "F9", // Frontier Airlines
  B6: "B6", // JetBlue Airways
  G4: "G4", // Allegiant Air
  AA: "AA", // American Airlines
};

export const trustPilotScript =
  "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";

const usaAirports = {
  ATL: "Hartsfield-Jackson Atlanta International Airport",
  LAX: "Los Angeles International Airport",
  ORD: "O'Hare International Airport",
  DFW: "Dallas/Fort Worth International Airport",
  DEN: "Denver International Airport",
  JFK: "John F. Kennedy International Airport",
  SFO: "San Francisco International Airport",
  SEA: "Seattle-Tacoma International Airport",
  MIA: "Miami International Airport",
  LAS: "McCarran International Airport",
  BOS: "Logan International Airport",
  MSP: "Minneapolis-Saint Paul International Airport",
  DTW: "Detroit Metropolitan Airport",
  PHX: "Phoenix Sky Harbor International Airport",
  IAH: "George Bush Intercontinental Airport",
  EWR: "Newark Liberty International Airport",
  SAN: "San Diego International Airport",
  TPA: "Tampa International Airport",
  MSY: "Louis Armstrong New Orleans International Airport",
  PIT: "Pittsburgh International Airport",
  SLC: "Salt Lake City International Airport",
  Nash: "Nashville International Airport",
  OKC: "Will Rogers World Airport",
  CLE: "Cleveland Hopkins International Airport",
  CMH: "John Glenn Columbus International Airport",
  RDU: "Raleigh-Durham International Airport",
  BWI: "Baltimore/Washington International Thurgood Marshall Airport",
  ABQ: "Albuquerque International Sunport",
  BUF: "Buffalo Niagara International Airport",
  GEG: "Spokane International Airport",
  BOI: "Boise Airport",
  FLL: "Fort Lauderdale-Hollywood International Airport",
  PDX: "Portland International Airport",
  SMF: "Sacramento International Airport",
  RIC: "Richmond International Airport",
  HSV: "Huntsville International Airport",
  TUL: "Tulsa International Airport",
  LIH: "Lihue Airport",
  OGG: "Kahului Airport",
  KOA: "Kona International Airport",
  BLI: "Bellingham International Airport",
  ELP: "El Paso International Airport",
  SAF: "Santa Fe Municipal Airport",
  MCO: "Orlando International Airport",
};

export const getAirportName = (key: string) => {
  return usaAirports[key as keyof typeof usaAirports];
};

export const convertISO8601DurationToHumanReadable = (duration: string) => {
  // Use regex to extract hours and minutes from the ISO 8601 duration
  const regex = /^PT(?:(\d+)H)?(?:(\d+)M)?$/;
  const match = duration.match(regex);

  if (!match) {
    return "Invalid duration format";
  }

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;

  let result = "";

  if (hours > 0) {
    result += `${hours}h`;
  }

  if (minutes > 0) {
    result += `${minutes}m`;
  }

  return result || "0 min"; // If no hours or minutes, return '0 minutes'
};

export const calculateTotalLayoverDuration = (segments: Segment[]): string => {
  let totalLayoverMs = 0; // Total layover duration in milliseconds

  for (let i = 0; i < segments.length - 1; i++) {
    const currentSegment = segments[i];
    const nextSegment = segments[i + 1];

    // Ensure the layover happens at the same airport
    if (currentSegment.arrival.iataCode === nextSegment.departure.iataCode) {
      const arrivalTime = new Date(currentSegment.arrival.at);
      const departureTime = new Date(nextSegment.departure.at);

      // Calculate the layover duration in milliseconds
      const layoverDurationMs = departureTime.getTime() - arrivalTime.getTime();
      totalLayoverMs += layoverDurationMs;
    }
  }

  // Convert total layover duration to hours and minutes
  const totalHours = Math.floor(totalLayoverMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(
    (totalLayoverMs % (1000 * 60 * 60)) / (1000 * 60)
  );

  // Format the duration as `XhYm`
  return `${totalHours}h${totalMinutes.toString().padStart(2, "0")}m`;
};

export const formatCustomFlightDate = (dateStr: string): string => {
  const date = new Date(dateStr);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // Get short month name
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 24-hour to 12-hour format

  return `${day} ${month}, ${year} ${hours}:${minutes} ${ampm}`;
};


export const BUSINESS = {
  phone: {
    display: "+1-855-761-6979",
    call: "+18557616979"
  },
  emails: {
    main: "support@rentalconfirmation.com"
  },
  brand_name: {
    first: "Rental",
    second: "Confirmation"
  },
  domain: "rentalconfirmation.com"
};
export const testimonials = [
  { name: "Ethan Parker", testimonial: "Booked my SUV over the phone, the agent guided me perfectly. Pickup was seamless.", date: "Sep 20, 2025", rating: 5, service: "Cars" },
  { name: "Liam Roberts", testimonial: "Called to confirm my rental in Dallas, got everything sorted in minutes.", date: "Sep 12, 2025", rating: 4, service: "Cars" },
  { name: "Olivia Bennett", testimonial: "Had to cancel a car booking, called support and refund was processed instantly.", date: "Aug 28, 2025", rating: 5, service: "Cars" },
  { name: "Noah Carter", testimonial: "Quick call to support, they handled my last-minute car rental perfectly.", date: "Aug 15, 2025", rating: 4, service: "Cars" },
  { name: "Ava Hughes", testimonial: "Phone support was great — my car was ready when I arrived.", date: "Aug 05, 2025", rating: 5, service: "Cars" },
  { name: "Mason Price", testimonial: "Agent on call explained everything clearly, made booking simple and fast.", date: "Jul 22, 2025", rating: 4, service: "Cars" },
  { name: "Sophia Powell", testimonial: "Called to modify my rental, everything went smoothly.", date: "Jul 10, 2025", rating: 5, service: "Cars" },
  { name: "Lucas Gray", testimonial: "Support team handled my refund request over the phone immediately.", date: "Jun 25, 2025", rating: 4, service: "Cars" },
  { name: "Isabella Ward", testimonial: "Booking a car over call was fast, and staff were super helpful.", date: "Jun 12, 2025", rating: 5, service: "Cars" },
  { name: "Benjamin Perry", testimonial: "Had questions about insurance, called support and they resolved everything quickly.", date: "Jun 02, 2025", rating: 4, service: "Cars" },

  { name: "Ronnel Baptiste", testimonial: "Called to book my flight from NYC to LA, agent confirmed in minutes.", date: "Jul 20, 2025", rating: 5, service: "Flights" },
  { name: "Emily Johnson", testimonial: "Phone support made booking super easy, they guided me step by step.", date: "Jun 10, 2025", rating: 5, service: "Flights" },
  { name: "Michael Davis", testimonial: "Had to cancel a ticket, called support and refund was instant.", date: "May 02, 2025", rating: 4, service: "Flights" },
  { name: "Sophia Taylor", testimonial: "Booking over call was seamless, flight confirmed immediately.", date: "Apr 18, 2025", rating: 3, service: "Flights" },
  { name: "David Brown", testimonial: "Agent helped me with a last-minute flight change via phone, excellent support.", date: "Mar 25, 2025", rating: 5, service: "Flights" },
  { name: "Olivia Martinez", testimonial: "Called to book and got instant confirmation — smooth process!", date: "Mar 10, 2025", rating: 2, service: "Flights" },
  { name: "James Wilson", testimonial: "Phone support was friendly and helped with my group booking quickly.", date: "Feb 22, 2025", rating: 2, service: "Flights" },
  { name: "Ava Clark", testimonial: "Had to cancel one leg of my trip, called support and it was resolved immediately.", date: "Feb 02, 2025", rating: 4, service: "Flights" },
  { name: "Ethan Lewis", testimonial: "Support handled my flight refund over call without any hassle.", date: "Jan 19, 2025", rating: 5, service: "Flights" },
  { name: "William Harris", testimonial: "Called to confirm multiple tickets, everything went smoothly.", date: "Jan 05, 2025", rating: 5, service: "Flights" },

  { name: "Zoe Morgan", testimonial: "Called support to extend my rental, everything was handled immediately.", date: "Sep 15, 2025", rating: 5, service: "Cars" },
  { name: "Nathan Brooks", testimonial: "Agent helped me over the phone to change my pickup location, very smooth.", date: "Sep 10, 2025", rating: 4, service: "Cars" },
  { name: "Lily Bennett", testimonial: "Last-minute car cancellation, called support and refund processed instantly.", date: "Aug 30, 2025", rating: 5, service: "Cars" },
  { name: "Evan Ward", testimonial: "Quick call resolved my rental issue, car was ready on time.", date: "Aug 18, 2025", rating: 4, service: "Cars" },
  { name: "Maya Hughes", testimonial: "Phone support helped me choose the right SUV, smooth experience.", date: "Aug 12, 2025", rating: 5, service: "Cars" },
  { name: "Owen Price", testimonial: "Called to clarify insurance details, agent explained everything clearly.", date: "Jul 28, 2025", rating: 4, service: "Cars" },
  { name: "Ella Cooper", testimonial: "Booked my car over the phone, and pickup went perfectly.", date: "Jul 18, 2025", rating: 5, service: "Cars" },
  { name: "Logan Gray", testimonial: "Phone support made a last-minute rental change easy and fast.", date: "Jul 05, 2025", rating: 4, service: "Cars" },
  { name: "Aria Ross", testimonial: "Car rental confirmed on call, excellent service and smooth pickup.", date: "Jun 22, 2025", rating: 5, service: "Cars" },
  { name: "Caleb Murphy", testimonial: "Called support for refund after cancellation, processed without hassle.", date: "Jun 10, 2025", rating: 1, service: "Cars" },

  { name: "Lucas Bennett", testimonial: "Called to change my flight date, phone support was super helpful.", date: "Sep 18, 2025", rating: 5, service: "Flights" },
  { name: "Avery Price", testimonial: "Agent confirmed my international booking over the phone quickly.", date: "Sep 08, 2025", rating: 5, service: "Flights" },
  { name: "Sophia Gray", testimonial: "Phone support helped me get a refund for a canceled flight, very fast.", date: "Aug 29, 2025", rating: 5, service: "Flights" },
  { name: "Mason Ross", testimonial: "Called to book tickets for my family, everything confirmed instantly.", date: "Aug 14, 2025", rating: 5, service: "Flights" },
  { name: "Emma Hughes", testimonial: "Support agent helped with a last-minute flight change via phone, excellent.", date: "Aug 05, 2025", rating: 4, service: "Flights" },
  { name: "Ethan Collins", testimonial: "Booked a multi-city flight on call, smooth and hassle-free.", date: "Jul 25, 2025", rating: 5, service: "Flights" },
  { name: "Chloe Watson", testimonial: "Phone support guided me through canceling one leg of my journey, refund processed immediately.", date: "Jul 12, 2025", rating: 4, service: "Flights" },
  { name: "Benjamin Murphy", testimonial: "Called to confirm flight details, very professional and helpful.", date: "Jun 30, 2025", rating: 5, service: "Flights" },
  { name: "Mia Cooper", testimonial: "Agent handled my flight change over the phone quickly and efficiently.", date: "Jun 18, 2025", rating: 4, service: "Flights" },
  { name: "William Brooks", testimonial: "Phone support confirmed my tickets in minutes, very smooth experience.", date: "Jun 05, 2025", rating: 5, service: "Flights" },
];
