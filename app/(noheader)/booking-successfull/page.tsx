"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import TrustPilot from "@/components/Common/TrustPilot";



const BookingSuccessful: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-6">
      {/* TrustPilot is now dynamically loaded client-side */}
      <TrustPilot />

      <h1 className="text-4xl font-bold mb-2 text-center">
        Booking Successful!
      </h1>

      <CheckCircle size={100} className="text-orange-500 text-8xl mb-4" />

      <p className="text-xl mb-2 text-center">Thank you for your booking!</p>

      <p className="text-lg text-gray-600 text-center">
        We have received your request; you&apos;ll soon hear from us. Please be
        patient.
      </p>
    </div>
  );
};

export default BookingSuccessful;
