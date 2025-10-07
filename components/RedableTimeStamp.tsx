// components/ReadableTimestamp.tsx
import React from "react";

interface ReadableTimestampProps {
  timestamp: string | Date;
  withTime?: boolean; // default true
}

const ReadableTimestamp: React.FC<ReadableTimestampProps> = ({
  timestamp,
  withTime = true,
}) => {
  const date = new Date(timestamp);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return <span>{withTime ? `${formattedDate} – ${formattedTime}` : formattedDate}</span>;
};

export default ReadableTimestamp;
