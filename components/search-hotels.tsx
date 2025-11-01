"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Loader, Users, Search } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as DateCalendar } from "@/components/ui/calendar";
import apiService from "@/lib/api/api-service";
import { Label } from "./ui/label";

interface LocationResult {
    iataCode: string;
    name: string;
    address: { cityName: string; countryCode: string };
    geoCode: { latitude: number; longitude: number };
}

const SearchHotels: React.FC = () => {
    const router = useRouter();
    const { toast } = useToast();

    // Form states
    const [cityQuery, setCityQuery] = useState("");
    const [cityResults, setCityResults] = useState<LocationResult[]>([]);
    const [selectedCity, setSelectedCity] = useState<LocationResult | null>(null);
    const [loadingCity, setLoadingCity] = useState(false);

    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [adults, setAdults] = useState<number>(1);

    const [loading, setLoading] = useState(false);

    // Popover states
    const [checkInOpen, setCheckInOpen] = useState(false);
    const [checkOutOpen, setCheckOutOpen] = useState(false);

    // Fetch matching cities
    useEffect(() => {
        if (cityQuery.length < 3) {
            setCityResults([]);
            return;
        }

        const fetchCities = async () => {
            setLoadingCity(true);
            try {
                const { data }: any = await apiService.searchLocations({ keyword: cityQuery });
                const mapped = (data.data || [])
                    .filter((item: any) => item.iataCode)
                    .map((item: any) => ({
                        iataCode: item.iataCode,
                        name: item.name,
                        address: {
                            cityName: item.name,
                            countryCode: item.address?.countryCode || "",
                        },
                        geoCode: {
                            latitude: item.geoCode?.latitude || 0,
                            longitude: item.geoCode?.longitude || 0,
                        },
                    }));
                setCityResults(mapped);
            } catch {
                toast({
                    title: "Error fetching locations",
                    description: "Please try again later.",
                    variant: "destructive",
                });
            } finally {
                setLoadingCity(false);
            }
        };

        fetchCities();
    }, [cityQuery, toast]);

    // Date Picker Popover
    const renderDatePopover = (
        label: string,
        selectedDate: Date | null,
        setDate: (date: Date | null) => void,
        open: boolean,
        setOpen: (val: boolean) => void
    ) => (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-start text-left font-medium text-gray-700"
                >
                    <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                    {selectedDate ? format(selectedDate, "PPP") : label}
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-auto p-0 bg-white">
                <DateCalendar
                    mode="single"
                    selected={selectedDate ?? undefined}
                    onSelect={(date) => {
                        if (!date) return;
                        setDate(new Date(date));
                        setOpen(false);
                    }}
                    disabled={{ before: new Date() }}
                    className="rounded-md border"
                />
            </PopoverContent>
        </Popover>
    );

    // Handle search
    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

        if (!selectedCity || !checkInDate || !checkOutDate || adults <= 0) {
            toast({
                title: "Missing Information",
                description: "Please fill in city, dates, and number of guests.",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const query = new URLSearchParams({
                city: selectedCity.iataCode,
                cityName: selectedCity.name,
                checkIn: format(checkInDate, "yyyy-MM-dd"),
                checkOut: format(checkOutDate, "yyyy-MM-dd"),
                adults: adults.toString(),
            }).toString();

            router.push(`/available-hotels?${query}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className="w-full flex flex-col gap-4 lg:flex-row lg:items-stretch"
        >
            {/* City Selector */}
            <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-all relative">
                <Label className="text-sm font-semibold text-gray-600 mb-2 block">
                    City
                </Label>
                <input
                    type="text"
                    placeholder="Search for city..."
                    value={selectedCity ? selectedCity.name : cityQuery}
                    onChange={(e) => {
                        setCityQuery(e.target.value);
                        setSelectedCity(null);
                    }}
                    className="w-full bg-white border rounded-md py-2 px-3 outline-none"
                />
                {cityResults.length > 0 && !selectedCity && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                        {loadingCity ? (
                            <p className="p-2 text-center text-gray-500">Loading...</p>
                        ) : (
                            cityResults.map((city) => (
                                <div
                                    key={city.iataCode}
                                    onClick={() => {
                                        setSelectedCity(city);
                                        setCityQuery("");
                                    }}
                                    className="p-2 hover:bg-orange-50 cursor-pointer"
                                >
                                    <p className="font-semibold text-gray-800">{city.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {city.address.cityName}, {city.address.countryCode} (
                                        {city.iataCode})
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Dates Section */}
            <div className="flex flex-col sm:flex-row flex-1 gap-4 bg-gray-50 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-all">
                <div className="flex-1">
                    <Label className="text-sm font-semibold text-gray-600 mb-2 block">
                        Check-in
                    </Label>
                    {renderDatePopover(
                        "Select Check-in Date",
                        checkInDate,
                        setCheckInDate,
                        checkInOpen,
                        setCheckInOpen
                    )}
                </div>
                <div className="flex-1">
                    <Label className="text-sm font-semibold text-gray-600 mb-2 block">
                        Check-out
                    </Label>
                    {renderDatePopover(
                        "Select Check-out Date",
                        checkOutDate,
                        setCheckOutDate,
                        checkOutOpen,
                        setCheckOutOpen
                    )}
                </div>
            </div>

            {/* Guests Section */}
            <div className="flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-all lg:w-auto w-full sm:w-auto">
                <div className="flex items-center gap-3">
                    <Users size={18} className="text-gray-600" />
                    <input
                        type="number"
                        min={1}
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-20 text-center border rounded-md py-2 px-2 outline-none"
                    />
                    <span className="text-sm text-gray-600 font-medium">Guests</span>
                </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center items-center">
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full  sm:w-fit  h-14 text-base font-semibold shadow-md hover:shadow-lg transition-all bg-orange-500 hover:bg-orange-700 text-white flex items-center justify-center gap-2"
                >
                    {loading ? <Loader className="animate-spin" /> : <Search size={16} />}
                    {!loading && <span>Search Hotels</span>}
                </Button>
            </div>
        </form>
    );
};

export default SearchHotels;
