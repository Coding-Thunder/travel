"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plane, Car, BedDouble, Users, Ticket, Clock, Briefcase, Luggage, User, Info, Calendar, MapPin, AlertCircle, LogIn,
} from "lucide-react";
import Link from "next/link";
import { routings } from "@/lib/utils";
import apiService from "@/lib/api/api-service";
import LoadingAbsolute from "@/components/Common/LoadingAbsolute";
import CallNow from "@/components/CallNow";

// --- TYPES & HELPERS ---

interface BookingUI {
  _id: string; bookingRef: string; status: string; type: "flight" | "car" | "hotel";
  price: string; currency: string; mainDate: string; createdAt: string;
  paymentMethod: string;
  airline?: string; from?: string; to?: string; passengers?: { adults: number; children: number; infants: number };
  itinerary?: {
    totalDuration: string;
    segments: {
      id: string; departure: { iataCode: string; at: string; terminal?: string };
      arrival: { iataCode: string; at: string; terminal?: string };
      carrier: string; flightNumber: string; duration: string;
    }[];
  };
  fareDetails?: { cabin: string; checkedBags: string; cabinBags: string };
  carProvider?: { name: string; logoUrl: string }; car?: { name: string; imageUrl: string; seats: number; bags: number };
  pickup?: { name: string; dateTime: string }; dropoff?: { name: string; dateTime: string };
  cancellationPolicy?: string;
  hotel?: { name: string }; room?: { description: string };
  checkInDate?: string; checkOutDate?: string;
  cancellationDeadline?: string;
}

const formatters = {
  currency: (code = "USD") => ({ USD: "$", EUR: "$", INR: "$", AUD: "$" }[code] || `${code} `),
  nights: (start?: string, end?: string) => {
    if (!start || !end) return 0;
    const diff = new Date(end).getTime() - new Date(start).getTime();
    return Math.max(1, Math.round(diff / (1000 * 3600 * 24)));
  },
  date: (dateStr?: string) => dateStr ? new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'N/A',
  time: (dateStr?: string) => dateStr ? new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : 'N/A',
  duration: (iso?: string) => {
    if (!iso) return '';
    const matches = iso.match(/PT(\d+H)?(\d+M)?/);
    if (!matches) return '';
    const hours = matches[1] ? parseInt(matches[1].slice(0, -1)) : 0;
    const minutes = matches[2] ? parseInt(matches[2].slice(0, -1)) : 0;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  },
  layover: (prevArrival: string, nextDeparture: string) => {
    const diffMs = new Date(nextDeparture).getTime() - new Date(prevArrival).getTime();
    if (diffMs <= 0) return '0m';
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.round((diffMs % 3600000) / 60000);
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  },
};

const styleConfig = {
  flight: { Icon: Plane, color: "blue" },
  car: { Icon: Car, color: "green" },
  hotel: { Icon: BedDouble, color: "purple" },
};

// --- DATA TRANSFORMATION ---
const transformFlightData = (b: any): BookingUI => {
  const itinerary = b.selectedFlight?.itineraries?.[0];
  const segments = itinerary?.segments || [];
  const fare = b.selectedFlight?.travelerPricings?.[0]?.fareDetailsBySegment?.[0];
  return {
    _id: b._id, type: "flight", bookingRef: b.bookingId, status: b.status?.value ? "confirmed" : "pending",
    price: b.selectedFlight?.price?.grandTotal, currency: b.selectedFlight?.price?.currency,
    mainDate: segments[0]?.departure?.at, createdAt: b.createdAt,
    paymentMethod: `Card ending in ${b.cardInfo.number.slice(-4)}`,
    airline: b.selectedFlight?.validatingAirlineCodes?.[0], from: segments[0]?.departure?.iataCode,
    to: segments[segments.length - 1]?.arrival?.iataCode,
    passengers: { adults: b.travelers.adults.length, children: b.travelers.childrens.length, infants: b.travelers.infants.length },
    itinerary: {
      totalDuration: formatters.duration(itinerary?.duration),
      segments: segments.map((s: any) => ({
        id: s.id, departure: { iataCode: s.departure.iataCode, at: s.departure.at },
        arrival: { iataCode: s.arrival.iataCode, at: s.arrival.at },
        carrier: s.carrierCode, flightNumber: s.number, duration: formatters.duration(s.duration),
      })),
    },
    fareDetails: {
      cabin: fare?.cabin || 'N/A', checkedBags: `${fare?.includedCheckedBags?.weight || '0'}${fare?.includedCheckedBags?.weightUnit || 'KG'}`,
      cabinBags: `${fare?.includedCabinBags?.weight || '7'}${fare?.includedCabinBags?.weightUnit || 'KG'}`,
    },
  };
};

const transformCarData = (b: any): BookingUI => {
  const car = b.selectedCar;
  const criteria = b.searchCriteria;
  const pickupName = criteria?.location?.startLocationCode?.name || criteria?.startLocationCode || 'N/A';
  const dropoffName = criteria?.location?.dropLocationCode?.name || criteria?.endName || 'N/A';
  const pickupTime = criteria?.startDateTime || car?.start?.dateTime;
  return {
    _id: b._id, type: "car", bookingRef: b.bookingId, status: b.status?.value ? "confirmed" : "pending",
    price: car?.quotation?.monetaryAmount, currency: car?.quotation?.currencyCode,
    mainDate: pickupTime, createdAt: b.createdAt,
    paymentMethod: `Card ending in ${b.cardInfo.number.slice(-4)}`,
    carProvider: { name: car?.serviceProvider?.name, logoUrl: car?.serviceProvider?.logoUrl },
    car: { name: car?.vehicle?.description, imageUrl: car?.vehicle?.imageURL, seats: car?.vehicle?.seats?.[0]?.count, bags: car?.vehicle?.baggages?.[0]?.count },
    pickup: { name: pickupName, dateTime: pickupTime },
    dropoff: { name: dropoffName, dateTime: car?.end?.dateTime },
    cancellationPolicy: car?.cancellationRules?.[0]?.ruleDescription,
  };
};

const transformHotelData = (b: any): BookingUI => {
  const offer = b.selectedOffer;
  return {
    _id: b._id, type: "hotel", bookingRef: b.bookingId, status: b.status?.value ? "confirmed" : "pending",
    price: offer?.price?.total, currency: offer?.price?.currency,
    mainDate: offer?.checkInDate, createdAt: b.createdAt,
    paymentMethod: `Card ending in ${b.cardInfo.number.slice(-4)}`,
    hotel: { name: offer?.hotelName }, room: { description: offer?.room?.description?.text },
    checkInDate: offer?.checkInDate, checkOutDate: offer?.checkOutDate,
    cancellationDeadline: offer?.policies?.cancellations?.[0]?.deadline,
  };
};

// --- UI COMPONENTS ---

const CardHeaderInfo = ({ booking }: { booking: BookingUI }) => {
  const { Icon, color } = styleConfig[booking.type];
  const title = booking.hotel?.name || booking.carProvider?.name || booking.airline || 'Booking';
  return (
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className={`flex items-center gap-3 text-lg text-${color}-700`}>
            <Icon className="h-5 w-5" />
            {title}
          </CardTitle>
          <p className="text-xs text-slate-500 mt-1">Booked on {formatters.date(booking.createdAt)}</p>
        </div>
        <Badge variant="secondary" className={`capitalize text-xs ${booking.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{booking.status}</Badge>
      </div>
    </CardHeader>
  );
};

const CardFooterInfo = ({ booking }: { booking: BookingUI }) => (
  <CardFooter className="flex flex-col sm:flex-row justify-between items-center bg-slate-50/70 pt-4">
    <div className="text-center sm:text-left mb-4 sm:mb-0">
      <p className="text-sm text-slate-500">{booking.paymentMethod}</p>
      <p className="text-2xl font-bold text-slate-900">
        {formatters.currency(booking.currency)}{booking.price}
      </p>
    </div>
    {/* <Button className="w-full sm:w-auto" onClick={() => window.print()}>Manage Booking</Button> */}
    <CallNow />
  </CardFooter>
);

const FlightCard = ({ booking }: { booking: BookingUI }) => (
  <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
    <CardHeaderInfo booking={booking} />
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <p className="text-4xl font-bold text-slate-800">{booking.from}</p>
          <p className="text-sm text-slate-500">{formatters.time(booking.itinerary?.segments[0].departure.at)}</p>
        </div>
        <div className="text-center px-4">
          <Plane className="text-slate-400" />
          <p className="text-xs text-slate-500 mt-1">{booking.itinerary?.totalDuration}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold text-slate-800">{booking.to}</p>
          <p className="text-sm text-slate-500">{formatters.time(booking.itinerary?.segments[booking.itinerary.segments.length - 1].arrival.at)}</p>
        </div>
      </div>
      <div className="text-center text-sm text-slate-600 mt-2 font-medium">{formatters.date(booking.mainDate)}</div>

      <Accordion type="single" collapsible className="w-full mt-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>View Flight Details</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {booking.itinerary?.segments.map((seg, index, segments) => (
              <React.Fragment key={seg.id}>
                {index > 0 && segments[index - 1] && (
                  <div className="flex items-center gap-3 text-xs text-slate-500 my-2 pl-8 border-l-2 border-dashed ml-3.5">
                    <Clock className="h-3 w-3" />
                    <span>Layover: {formatters.layover(segments[index - 1].arrival.at, seg.departure.at)}</span>
                  </div>
                )}
                <div className="flex gap-4 items-center">
                  <div className="font-bold text-sm bg-slate-100 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">{seg.carrier}</div>
                  <div className="text-sm flex-grow">
                    <div className="font-semibold text-slate-800">{seg.departure.iataCode} → {seg.arrival.iataCode} <span className="text-slate-500 font-normal">({seg.duration})</span></div>
                    <div className="text-xs text-slate-500">{formatters.time(seg.departure.at)} - {formatters.time(seg.arrival.at)}</div>
                  </div>
                </div>
              </React.Fragment>
            ))}
            <Separator className="my-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2"><User className="h-4 w-4 text-slate-500" /><span>{booking.passengers?.adults} Adult(s)</span></div>
              <div className="flex items-center gap-2"><Luggage className="h-4 w-4 text-slate-500" /><span>{booking.fareDetails?.checkedBags} Checked</span></div>
              <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-slate-500" /><span>{booking.fareDetails?.cabinBags} Cabin</span></div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
    <CardFooterInfo booking={booking} />
  </Card>
);

const CarCard = ({ booking }: { booking: BookingUI }) => (
  <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
    <CardHeaderInfo booking={booking} />
    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        {booking.car?.imageUrl && <img src={booking.car.imageUrl} alt={booking.car.name} className="rounded-lg object-cover w-full mb-2 aspect-video" />}
        <div className="flex justify-around text-center text-sm text-slate-600">
          <div className="flex items-center gap-1"><Users className="h-4 w-4" /> {booking.car?.seats || 'N/A'} Seats</div>
          <div className="flex items-center gap-1"><Luggage className="h-4 w-4" /> {booking.car?.bags || 'N/A'} Bags</div>
        </div>
      </div>
      <div className="md:col-span-2 space-y-4">
        <div className="flex gap-4">
          <MapPin className="h-5 w-5 text-slate-500 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-800">Pickup</p>
            <p className="text-slate-600">{booking.pickup?.name}</p>
            <p className="text-sm text-slate-500">{formatters.date(booking.pickup?.dateTime)} at {formatters.time(booking.pickup?.dateTime)}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <MapPin className="h-5 w-5 text-slate-500 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-800">Dropoff</p>
            <p className="text-slate-600">{booking.dropoff?.name}</p>
            <p className="text-sm text-slate-500">{formatters.date(booking.dropoff?.dateTime)} at {formatters.time(booking.dropoff?.dateTime)}</p>
          </div>
        </div>
        {booking.cancellationPolicy &&
          <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-md border">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>{booking.cancellationPolicy}</p>
          </div>
        }
      </div>
    </CardContent>
    <CardFooterInfo booking={booking} />
  </Card>
);

const HotelCard = ({ booking }: { booking: BookingUI }) => (
  <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
    <CardHeaderInfo booking={booking} />
    <CardContent className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm border-b pb-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-slate-500" />
          <div>
            <p className="font-semibold text-slate-800">Check-in</p>
            <p className="text-slate-600">{formatters.date(booking.checkInDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-slate-500" />
          <div>
            <p className="font-semibold text-slate-800">Check-out</p>
            <p className="text-slate-600">{formatters.date(booking.checkOutDate)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-slate-500" />
          <div>
            <p className="font-semibold text-slate-800">Duration</p>
            <p className="text-slate-600">{formatters.nights(booking.checkInDate, booking.checkOutDate)} night(s)</p>
          </div>
        </div>
      </div>
      {booking.room?.description &&
        <div>
          <p className="font-semibold text-slate-800 text-sm mb-1">Room Details</p>
          <p className="text-sm text-slate-600 whitespace-pre-line">{booking.room.description.split('\n').filter(line => line.trim() !== '').join('\n')}</p>
        </div>
      }
      {booking.cancellationDeadline &&
        <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-md border">
          <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <p>Free cancellation before {formatters.time(booking.cancellationDeadline)} on {formatters.date(booking.cancellationDeadline)}.</p>
        </div>
      }
    </CardContent>
    <CardFooterInfo booking={booking} />
  </Card>
);

// --- STATE COMPONENTS ---

const EmptyState = () => (
  <Card className="p-12 text-center bg-white shadow-sm rounded-2xl">
    <Ticket className="h-12 w-12 mx-auto text-slate-400 mb-4" />
    <h3 className="text-xl font-semibold text-slate-800 mb-2">You have no upcoming trips</h3>
    <p className="text-slate-500 max-w-md mx-auto mb-6">When you book a trip, all your itinerary details will appear right here.</p>
    <Link href={routings.home}>
      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Start Planning a Trip</Button>
    </Link>
  </Card>
);

const LoginPrompt = () => (
  <Card className="p-12 text-center bg-white shadow-sm rounded-2xl">
    <LogIn className="h-12 w-12 mx-auto text-slate-400 mb-4" />
    <h3 className="text-xl font-semibold text-slate-800 mb-2">See Your Trips</h3>
    <p className="text-slate-500 max-w-md mx-auto mb-6">Please log in to view your bookings and manage your travel plans.</p>
    <Link href={routings.sign_in}>
      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Log In</Button>
    </Link>
  </Card>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <Card className="p-12 text-center bg-red-50 border border-red-200 rounded-2xl">
    <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
    <h3 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong.</h3>
    <p className="text-red-700 max-w-md mx-auto mb-6">We couldn't load your bookings right now. Please try again.</p>
    <Button size="lg" variant="destructive" onClick={onRetry}>Try Again</Button>
  </Card>
);


// --- MAIN COMPONENT ---

const MyBookings: React.FC = () => {
  const [flightBookings, setFlightBookings] = useState<BookingUI[]>([]);
  const [carBookings, setCarBookings] = useState<BookingUI[]>([]);
  const [hotelBookings, setHotelBookings] = useState<BookingUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  const fetchBookings = useCallback(async () => {
    if (!userEmail) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getBookingsByEmail(userEmail);
      const sorter = (a: { mainDate: string }, b: { mainDate: string }) => new Date(b.mainDate).getTime() - new Date(a.mainDate).getTime();

      if (response.flights) setFlightBookings(response.flights.map(transformFlightData).sort(sorter));
      if (response.cars) setCarBookings(response.cars.map(transformCarData).sort(sorter));
      if (response.hotels) setHotelBookings(response.hotels.map(transformHotelData).sort(sorter));

    } catch (err) {
      console.error(err);
      setError("Failed to fetch bookings. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const renderContent = () => {
    if (!userEmail && !loading) return <LoginPrompt />;
    if (loading) return <LoadingAbsolute />;
    if (error) return <ErrorState onRetry={fetchBookings} />;

    const allBookingsCount = flightBookings.length + carBookings.length + hotelBookings.length;
    if (allBookingsCount === 0) return <EmptyState />;

    return (
      <Tabs defaultValue="flights" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="flights">
            <Plane className="mr-2 h-4 w-4" /> Flights ({flightBookings.length})
          </TabsTrigger>
          <TabsTrigger value="cars">
            <Car className="mr-2 h-4 w-4" /> Cars ({carBookings.length})
          </TabsTrigger>
          <TabsTrigger value="hotels">
            <BedDouble className="mr-2 h-4 w-4" /> Hotels ({hotelBookings.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="flights" className="mt-6 space-y-6">
          {flightBookings.map((b) => <FlightCard key={b._id} booking={b} />)}
        </TabsContent>
        <TabsContent value="cars" className="mt-6 space-y-6">
          {carBookings.map((b) => <CarCard key={b._id} booking={b} />)}
        </TabsContent>
        <TabsContent value="hotels" className="mt-6 space-y-6">
          {hotelBookings.map((b) => <HotelCard key={b._id} booking={b} />)}
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">My Trips</h1>
        {renderContent()}
      </main>
    </div>
  );
};

export default MyBookings;