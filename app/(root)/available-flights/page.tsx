"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  Suspense,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { getAirlineName, routings } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { Flight, SearchCriteria } from "@/lib/types";
import { toast } from "react-toastify";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { Plane, Share2 } from "lucide-react";

// ShadCN UI components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TimeFormatter from "@/components/TimeFormatter";
import { RootState } from "@/lib/store/store";
import { bookFlight } from "@/lib/store/slices/bookSlice";
import apiService from "@/lib/api/api-service";
import LoadingAbsolute from "@/components/Common/LoadingAbsolute";
import NoResults from "@/components/NoResults";

// Debounce utility
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Flight Timeline component
const FlightTimeline = ({
  itinerary,
}: {
  itinerary: Flight["itineraries"][0];
}) => {
  const dep = itinerary.segments[0].departure;
  const arr = itinerary.segments[itinerary.segments.length - 1].arrival;

  return (
    <div className="grid grid-cols-5 items-center text-sm text-gray-700">
      <div>
        <p className="text-lg font-semibold">
          <TimeFormatter stamp={dep.at} />
        </p>
        <p>{dep.cityName || dep.iataCode}</p>
        <p className="text-xs text-gray-500">
          {new Date(dep.at).toDateString()}
        </p>
        <p className="text-sm text-red-600 font-semibold">{dep.iataCode}</p>
      </div>

      <div className="col-span-3 flex items-center justify-center relative">
        <span className="absolute top-[-20px] text-xs text-gray-500">
          Travel time: {itinerary.duration.replace("PT", "").toLowerCase()}
        </span>
        <div className="flex-1 h-[2px] bg-gray-300 relative mx-4">
          <Plane
            className="absolute -top-3 left-1/2 -translate-x-1/2 text-gray-500"
            size={18}
          />
        </div>
      </div>

      <div className="text-right">
        <p className="text-lg font-semibold">
          <TimeFormatter stamp={arr.at} />
        </p>
        <p>{arr.cityName || arr.iataCode}</p>
        <p className="text-xs text-gray-500">
          {new Date(arr.at).toDateString()}
        </p>
        <p className="text-sm text-red-600 font-semibold">{arr.iataCode}</p>
      </div>
    </div>
  );
};

const AvailableFlights = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  const searchCriteria = useSelector(
    (state: RootState) => state.flights.searchCriteria
  ) as SearchCriteria;
  const isRoundTrip = useSelector((state: RootState) => state.trip.isRoundTrip);

  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState<number | null>(null);
  const [error, setError] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 5;
  const totalPages = Math.ceil(flights.length / flightsPerPage);
  const paginatedFlights = flights.slice(
    (currentPage - 1) * flightsPerPage,
    currentPage * flightsPerPage
  );

  useEffect(() => {
    if (!loading && flights.length > 0) {
      const timer = setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight * 1,
          behavior: "smooth",
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [loading, flights]);


  // Book Now
  const handleBookNow = (flight: Flight) => {
    setLoading(true);
    try {
      if (discount !== null) flight.price.discount = discount;
      dispatch(bookFlight(flight));
      router.push(routings.itinerary);
    } catch (err) {
      // consoleerror(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch flights
  const fetchFlights = useCallback(
    debounce(async () => {
      setLoading(true);
      try {
        const {
          fromAirport,
          toAirport,
          departureDate,
          adults,
          childrens,
          infants,
          selectedClass,
          returnDate,
        } = searchCriteria;

        if (!fromAirport || !toAirport || !departureDate) return;

        const [flightsResponse, discountValue] = await Promise.all([
          apiService.fetchAvailableFlights({
            from: fromAirport.iataCode,
            to: toAirport.iataCode,
            departureDate,
            returnDate: isRoundTrip ? returnDate : null,
            adults: Number(adults),
            children: Number(childrens),
            infants: Number(infants),
            classType: selectedClass,
          }),
          apiService.getBookingDiscount(),
        ]);

        setFlights(flightsResponse.data);
        if (discountValue?.discount) setDiscount(discountValue.discount);
      } catch (err: any) {
        // consoleerror("Error fetching flights:", err.message);
        setError("Failed to fetch flights. Please try again.");
        toast.error("Failed to fetch flights. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 500),
    [searchCriteria]
  );

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  if (loading) return <LoadingAbsolute />;



  return (
    <>
      {/* <HeroSection /> */}
      <div
        ref={scrollRef}
        className="w-full px-4 min-h-screen max-h-fit lg:mt-10"
      >
        <div className="w-full mx-auto sm:w-[78vw] md:w-[65vw] lg:w-[60vw] xl:w-[50vw]">
          {/* Top Badges */}
          <div className="p-2 flex items-center gap-6">
            <Badge
              variant="outline"
              className="border-orange text-orange flex items-center gap-2"
            >
              <FaStar size={18} /> Recommended
            </Badge>
            <Badge
              variant="outline"
              className="border-orange text-orange flex items-center gap-2"
            >
              <AiFillThunderbolt size={18} /> Faster
            </Badge>
          </div>

          {paginatedFlights.length > 0 ? (
            <ul className="space-y-6 mt-6">
              {paginatedFlights.map((flight) => {
                const priceBase = Number(flight.price.grandTotal);
                const finalPrice =
                  discount !== null
                    ? priceBase - (priceBase / 100) * discount
                    : priceBase;

                return (
                  <Card
                    key={flight.id}
                    className="flex flex-col-reverse md:flex-row overflow-hidden"
                  >
                    {/* RIGHT PANEL (on mobile: top) */}
                    <CardContent className="flex-1 p-4 relative order-1 md:order-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4"
                      >
                        <Share2 size={18} />
                      </Button>

                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-lg font-semibold">
                          {getAirlineName(flight.validatingAirlineCodes[0])}
                        </CardTitle>
                      </CardHeader>

                      <div className="flex flex-col gap-6">
                        <FlightTimeline itinerary={flight.itineraries[0]} />
                        {isRoundTrip && flight.itineraries[1] && (
                          <FlightTimeline itinerary={flight.itineraries[1]} />
                        )}
                      </div>
                    </CardContent>

                    {/* LEFT PANEL (on mobile: bottom) */}
                    <CardContent className="w-full md:w-[200px] border-t md:border-t-0 md:border-r flex flex-col items-center justify-start gap-4 p-4 order-2 md:order-1">
                      <Badge
                        variant="destructive"
                        className="bg-green-500 text-white px-2 py-1 rounded-full"
                      >
                        Cheapest
                      </Badge>
                      <p className="text-2xl font-bold text-orange">
                        ${finalPrice.toFixed(2)}
                      </p>

                      {discount && (
                        <span className="line-through text-sm text-gray-500">
                          ${priceBase.toFixed(2)}
                        </span>
                      )}

                      <label className="flex items-center gap-2 text-sm border rounded-lg px-2 py-1">
                        <Checkbox className="accent-orange-500" />
                        <span className="text-gray-600">
                          Baggage <span className="text-red-500">+$100</span>
                        </span>
                      </label>

                      <Button
                        onClick={() => handleBookNow(flight)}
                        className="w-full bg-orange-500 text-white hover:bg-orange-800"
                      >
                        Select Ticket
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </ul>
          ) : (
            <div className="text-center text-lg">
              <NoResults type="flight" />
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 my-6">
              <Button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                variant="outline"
                className="border-orange text-orange hover:bg-orange hover:text-white"
              >
                Prev
              </Button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                variant="outline"
                className="border-orange text-orange hover:bg-orange hover:text-white"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const AvailableFlightsWrapper = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <AvailableFlights />
  </Suspense>
);

export default AvailableFlightsWrapper;
