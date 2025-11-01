"use client";
import {
    convertISO8601DurationToHumanReadable,
    formatCustomFlightDate,
    getAirlineName,
    getAirportName,
    routings,
} from "@/lib/utils";
import {
    CheckCircle,
    Lock,
    XCircle,
    Circle,
    AlertTriangle,
    Clock,
    User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AirlineLogo from "@/components/AirlineLogo";
import { RootState } from "@/lib/store/store";
import LoadingAbsolute from "@/components/Common/LoadingAbsolute";
import SslSecured from "@/components/SslSecured";

// =================================================================
// TYPE DEFINITIONS for Flight Data
// =================================================================

interface FlightSegmentData {
    carrierCode: string;
    duration: string; // ISO 8601 duration format e.g., "PT2H39M"
    departure: {
        iataCode: string;
        at: string; // ISO 8601 date-time format e.g., "2025-09-25T16:36:00"
    };
    arrival: {
        iataCode: string;
        at: string;
    };
}

interface ItineraryData {
    duration: string;
    segments: FlightSegmentData[];
}

interface FlightOffer {
    price: {
        total: string;
        currency: string;
    };
    itineraries: ItineraryData[];
}

// =================================================================
// Helper function to calculate duration between two dates (for layovers)
// =================================================================
const calculateLayoverDuration = (
    arrival: string,
    departure: string
): string => {
    const arrivalTime = new Date(arrival).getTime();
    const departureTime = new Date(departure).getTime();
    const diffMs = departureTime - arrivalTime;

    if (diffMs <= 0) return "0m";

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
};

// =================================================================
// Reusable sub-components for the new UI structure
// =================================================================

interface FlightSegmentProps {
    segment: FlightSegmentData;
}

const FlightSegment = ({ segment }: FlightSegmentProps) => (
    <div>
        <div className="flex items-center gap-3 mb-4">
            <AirlineLogo code={segment.carrierCode as any} />
            <div>
                <p className="font-semibold text-gray-800">
                    {getAirlineName(segment.carrierCode)}
                </p>
                <p className="text-sm text-gray-500">
                    {convertISO8601DurationToHumanReadable(segment.duration)} in flight
                </p>
            </div>
        </div>
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <Circle className="w-4 h-4 text-gray-400" />
                <div className="flex-grow w-px bg-gray-300"></div>
                <Circle className="w-4 h-4 text-gray-400 fill-current" />
            </div>
            <div className="w-full">
                <div className="flex justify-between items-start pb-10">
                    <div>
                        <p className="font-semibold text-gray-800">
                            {formatCustomFlightDate(segment.departure.at)}
                        </p>
                        <p className="text-gray-600">
                            {getAirportName(segment.departure.iataCode)}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">
                        {formatCustomFlightDate(segment.departure.at)}
                    </p>
                </div>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold text-gray-800">
                            {formatCustomFlightDate(segment.arrival.at)}
                        </p>
                        <p className="text-gray-600">
                            {getAirportName(segment.arrival.iataCode)}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">
                        {formatCustomFlightDate(segment.arrival.at)}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

interface LayoverInfoProps {
    duration: string;
    location: string;
    repeatCheckIn: boolean;
}

const LayoverInfo = ({
    duration,
    location,
    repeatCheckIn,
}: LayoverInfoProps) => (
    <div className="my-4 p-4 rounded-lg bg-orange-500 text-white">
        <div className="flex items-center gap-3 ">
            <div>
                <User size={20} />
            </div>
            <div className="flex-grow">
                <p className="font-semibold">
                    {repeatCheckIn
                        ? `Repeat check-in in ${location}`
                        : `Layover in ${location}`}
                </p>
                {repeatCheckIn && (
                    <p className="text-xs">You are switching airlines.</p>
                )}
            </div>
            <div className="flex items-center gap-1 text-sm">
                <Clock size={14} />
                <span>{duration}</span>
            </div>
        </div>
    </div>
);


const Itinerary = () => {
    const selectedFlight = useSelector(
        (state: RootState): FlightOffer | null => state.booking.selectedFlight
    );

    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 100);
        return () => clearTimeout(timer);
    }, [selectedFlight]);

    const handleBookNow = () => {
        setLoading(true);
        router.push(routings.book_now);
    };

    if (!selectedFlight) {
        return (
            <div className="p-4 text-center">
                No flight selected. Please go back and choose a flight.
            </div>
        );
    }

    const price = selectedFlight.price?.total || "0.00";

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
            {loading && <LoadingAbsolute />}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <FareDetailsCard />
                    <Journey itinerary={selectedFlight.itineraries[0]} />
                    {selectedFlight.itineraries[1] && (
                        <Journey
                            itinerary={selectedFlight.itineraries[1]}
                            isInbound={true}
                        />
                    )}
                </div>

                <div className="lg:col-span-1">
                    <BookingCard price={price} onBook={handleBookNow} />
                    <SslSecured />
                </div>
            </div>
        </div>
    );
};

// =================================================================
// Supporting Components
// =================================================================

const FareDetailsCard = () => (
    <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Cheap fare</h3>
        <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500" />
                <span>Personal item</span>
            </li>
            <li className="flex items-center gap-3">
                <XCircle size={20} className="text-red-500" />
                <span>Checked baggage paid separately</span>
            </li>
            <li className="flex items-center gap-3">
                <XCircle size={20} className="text-red-500" />
                <span>Non-exchangeable</span>
            </li>
            <li className="flex items-center gap-3">
                <XCircle size={20} className="text-red-500" />
                <span>Non-refundable</span>
            </li>
        </ul>
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start gap-3">
            <AlertTriangle size={20} className="text-yellow-600 mt-0.5" />
            <p className="text-sm text-yellow-800">
                <strong>Repeat check-in on layover</strong> (make sure you know what to
                expect)
            </p>
        </div>
    </div>
);

interface BookingCardProps {
    price: string;
    onBook: () => void;
}

const BookingCard = ({ price, onBook }: BookingCardProps) => (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
            <div>
                <p className="text-2xl font-bold text-gray-900">${price}</p>
                {/* <p className="text-sm text-gray-500">Onetwotrip.com</p> */}
            </div>
            {/* <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center font-bold text-gray-500">
        Logo
      </div> */}
        </div>
        <Button
            onClick={onBook}
            className="w-full bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-800 transition duration-300 h-12 text-lg"
        >
            Continue
        </Button>
        <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500">
            <Lock size={14} />
            <span className="text-green-600">SSL Secured</span>
        </div>
    </div>
);

interface JourneyProps {
    itinerary: ItineraryData;
    isInbound?: boolean;
}

const Journey = ({ itinerary, isInbound = false }: JourneyProps) => {
    const segments = itinerary.segments;
    if (!segments || segments.length === 0) return null;

    // Safely get the start airport name
    const startAirportName = getAirportName(segments[0].departure.iataCode);
    const startAirport = startAirportName
        ? startAirportName.split(",")[0]
        : segments[0].departure.iataCode;

    // Safely get the end airport name
    const endAirportName = getAirportName(
        segments[segments.length - 1].arrival.iataCode
    );
    const endAirport = endAirportName
        ? endAirportName.split(",")[0]
        : segments[segments.length - 1].arrival.iataCode;

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
                <p className="text-xl font-bold text-gray-800">
                    {isInbound ? "Return: " : ""}
                    {startAirport} - {endAirport}
                </p>
                <p className="text-gray-500">
                    Total travel time:{" "}
                    {convertISO8601DurationToHumanReadable(itinerary.duration)}
                </p>
            </div>
            <div className="space-y-6">
                {segments.map((segment, idx) => {
                    const isLastSegment = idx === segments.length - 1;
                    const nextSegment = isLastSegment ? null : segments[idx + 1];

                    // Safely get the layover location name
                    const layoverLocationName =
                        !isLastSegment && nextSegment
                            ? getAirportName(segment.arrival.iataCode)
                            : null;

                    const layoverLocation = layoverLocationName
                        ? layoverLocationName.split(",")[0]
                        : segment.arrival.iataCode;

                    return (
                        <React.Fragment key={idx}>
                            <FlightSegment segment={segment} />
                            {!isLastSegment && nextSegment && (
                                <LayoverInfo
                                    duration={calculateLayoverDuration(
                                        segment.arrival.at,
                                        nextSegment.departure.at
                                    )}
                                    location={layoverLocation}
                                    repeatCheckIn={
                                        segment.carrierCode !== nextSegment.carrierCode
                                    }
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default Itinerary;
