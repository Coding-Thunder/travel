"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Calendar,
  MapPin,
  Users,
  CircleAlert,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import { routings } from "@/lib/utils";
import apiService from "@/lib/api/api-service";
import LoadingAbsolute from "@/components/Common/LoadingAbsolute";

interface BookingUI {
  _id: string;
  bookingRef: string;
  status: string;
  type: "flight" | "car";
  airline?: string;
  from?: string;
  to?: string;
  date?: string;
  price?: string;
  segments?: {
    id: string;
    from: string;
    to: string;
    depTime: string;
    arrTime: string;
    duration: string;
  }[];
  passengers?: number;
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userEmail) {
        setError("No user email found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const fetchedBookings = await apiService.getBookingsByEmail(userEmail);
        const normalized: BookingUI[] = (fetchedBookings || []).map((b: any) => {
          const segs =
            b.selectedFlight?.itineraries?.[0]?.segments?.map((s: any) => ({
              id: s.id,
              from: s.departure?.iataCode,
              to: s.arrival?.iataCode,
              depTime: s.departure?.at,
              arrTime: s.arrival?.at,
              duration: s.duration,
            })) || [];
          return {
            _id: b._id,
            type: "flight",
            bookingRef: b.bookingId,
            status: b.status?.value ? "confirmed" : "pending",
            airline:
              b.selectedFlight?.validatingAirlineCodes?.[0] || "Unknown Airline",
            from: segs[0]?.from,
            to: segs[segs.length - 1]?.to,
            date: segs[0]?.depTime,
            price: b.selectedFlight?.price?.grandTotal || "0.00",
            segments: segs,
            passengers:
              (b.travelers?.adults?.length || 0) +
              (b.travelers?.childrens?.length || 0) +
              (b.travelers?.infants?.length || 0),
          };
        });
        setBookings(normalized);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [userEmail]);

  if (loading) return <LoadingAbsolute />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            My Bookings
          </h1>

          {error && (
            <Alert variant="destructive" className="mb-8">
              <CircleAlert className="h-5 w-5 text-red-600" />
              <div>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </div>
              <Link href={routings.sign_in}>
                <Button className="ml-auto bg-blue-600 text-white hover:bg-blue-700">
                  Login
                </Button>
              </Link>
            </Alert>
          )}

          {!error && bookings.length > 0 && (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card
                  key={booking._id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm print:shadow-none print:border-gray-300"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center bg-blue-50 px-6 py-3 border-b border-dashed border-gray-300">
                    <div className="flex items-center gap-3">
                      <Plane className="h-5 w-5 text-blue-700" />
                      <p className="font-semibold text-gray-800">
                        {booking.airline}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm text-gray-600">
                        Booking Ref:{" "}
                        <span className="font-semibold">
                          {booking.bookingRef}
                        </span>
                      </p>
                      <Badge
                        variant="secondary"
                        className={`capitalize ${booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col lg:flex-row justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <p className="text-4xl font-bold text-gray-900">
                            {booking.from || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500">From</p>
                        </div>
                        <div className="text-center w-16 border-t border-gray-300 relative">
                          <Plane className="h-5 w-5 text-gray-500 absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-1" />
                        </div>
                        <div className="text-center flex-1">
                          <p className="text-4xl font-bold text-gray-900">
                            {booking.to || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500">To</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>
                            {booking.date
                              ? new Date(booking.date).toLocaleDateString(
                                undefined,
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{booking.passengers} Passenger(s)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{booking.segments?.length || 1} Segment(s)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between border-l border-dashed border-gray-300 pl-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Total Paid</p>
                        <p className="text-2xl font-bold text-blue-800">
                          ${booking.price || "0.00"}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-sm mt-3"
                        onClick={() => window.print()}
                      >
                        Print Ticket
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!error && bookings.length === 0 && (
            <Card className="p-12 text-center bg-white shadow-sm">
              <Ticket className="h-10 w-10 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 text-lg mb-4">
                You have no bookings yet.
              </p>
              <Link href={routings.home}>
                <Button className="bg-blue-800 hover:bg-blue-700 text-white">
                  Start Booking
                </Button>
              </Link>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyBookings;
