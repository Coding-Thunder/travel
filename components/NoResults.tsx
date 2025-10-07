"use client";

import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Car, Plane, CircleAlert } from "lucide-react";
import CallNow from "./CallNow";

interface NoResultsProps {
  /** Type of search result — defaults to "car" */
  type?: "car" | "flight";
}

const NoResults: React.FC<NoResultsProps> = ({ type = "car" }) => {
  const isFlight = type === "flight";

  const title = isFlight ? "No Flights Found" : "No Cars Found";
  const emoji = isFlight ? "✈️" : "🚘";
  const description = isFlight
    ? "We couldn’t find any flights matching your search. Try changing your filters or contact us for quick help."
    : "We couldn’t find any cars matching your search. Try changing your filters or contact us for quick help.";

  const iconColor = isFlight ? "text-sky-700" : "text-blue-700";

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <Alert className="max-w-md border-0 shadow-none flex flex-col items-center p-6">
        <div className="flex flex-col items-center gap-4">
          {/* Dynamic main icon */}
          <div className="relative">
            {isFlight ? (
              <Plane className={`w-16 h-16 ${iconColor}`} />
            ) : (
              <Car className={`w-16 h-16 ${iconColor}`} />
            )}
            <CircleAlert className="w-6 h-6 text-red-500 absolute -top-2 -right-2" />
          </div>

          {/* Title */}
          <AlertTitle className="text-slate-800 font-semibold text-lg mt-2">
            {title}
          </AlertTitle>

          {/* Description */}
          <AlertDescription className="text-gray-600 text-base leading-relaxed">
            {description}
          </AlertDescription>

          {/* Call-to-action */}
          <CallNow />
        </div>
      </Alert>
    </div>
  );
};

export default NoResults;
