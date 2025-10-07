import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // Assuming you're using Shadcn's Input component
import { CardInfo } from "@/lib/types";

// Define the props type for the ExpirySelect component
interface ExpirySelectProps {
  cardInfo: CardInfo;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
}

const ExpirySelect: React.FC<ExpirySelectProps> = ({
  cardInfo,
  setCardInfo,
}) => {
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const handleMonthChange = (value: string) => {
    setCardInfo({ ...cardInfo, month: value });
  };

  // Function to handle year selection
  const handleYearChange = (value: string) => {
    setCardInfo({ ...cardInfo, year: value });
  };

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() + i
  ); // 10 years starting from current year

  return (
    <div className="w-full mb-4 flex flex-wrap xl:flex-nowrap gap-4">
      {/* Month Select */}
      <div className="w-32">
        <label className="block mb-1 text-sm">Expiry Month</label>
        <Select onValueChange={handleMonthChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Year Select */}
      <div className="w-32">
        <label className="block mb-1 text-sm">Expiry Year</label>
        <Select onValueChange={handleYearChange}>
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* CVV Input */}
      <div className="lg:w-20">
        <label className="block text-sm mb-1">CVV</label>
        <Input
          type="number"
          value={cardInfo.cvc}
          onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
          placeholder="CVV"
          required
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ExpirySelect;
