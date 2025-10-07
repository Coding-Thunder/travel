"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { format, differenceInDays } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { User, Briefcase, Gauge, Info, Mail, Phone } from "lucide-react";
import { RootState } from "@/lib/store/store";
import apiService from "@/lib/api/api-service";
import { setSelectedCar } from "@/lib/store/slices/carSlice";
import LoadingAbsolute from "@/components/Common/LoadingAbsolute";
import NoResults from "@/components/NoResults";

const CarCard = ({
  offer,
  searchCriteria,
  isTopPick = false,
  onSelect,
}: {
  offer: any;
  searchCriteria: any;
  isTopPick?: boolean;
  onSelect?: (offer: any) => void;
}) => {
  const vehicle = offer.vehicle || {};
  const provider = offer.serviceProvider || {};
  const quotation = offer.quotation || {};

  const startDate = searchCriteria?.startDateTime
    ? new Date(searchCriteria.startDateTime)
    : new Date();
  const endDate = searchCriteria?.endDateTime
    ? new Date(searchCriteria.endDateTime)
    : new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

  const rentalDays = differenceInDays(endDate, startDate) || 1;

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-shadow relative">
      {isTopPick && (
        <div className="absolute -top-2 left-4 bg-blue-800 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          Top Pick
        </div>
      )}

      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image */}
          <div className="flex-shrink-0 md:w-48 flex items-center justify-center">
            <img
              src={vehicle.imageURL || "/placeholder-car.png"}
              alt={vehicle.description || "Vehicle"}
              className="w-full h-auto object-contain rounded-md"
            />
          </div>

          {/* Details */}
          <div className="flex-grow flex flex-col md:flex-1 gap-2">
            <h3 className="text-lg font-bold text-gray-800">
              {vehicle.description || "Vehicle"}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              or similar large car <Info size={14} />
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <User size={16} /> {vehicle.seats?.[0]?.count || "5+"} seats
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} /> {vehicle.baggages?.[0]?.count || "N/A"}{" "}
                large bags
              </div>
              <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                <Gauge size={16} /> Unlimited mileage
              </div>
            </div>

            <p className="text-sm font-medium text-blue-800 mt-2">
              {searchCriteria?.startLocationCode || "-"}
            </p>
            <p className="text-xs text-gray-500">Pickup Location</p>
          </div>

          {/* Booking */}
          <div className="flex-shrink-0 md:w-56 md:border-l md:pl-4 flex flex-col items-end justify-between mt-4 md:mt-0">
            <div>
              <p className="text-xs text-gray-500 text-right">
                Price for {rentalDays} {rentalDays === 1 ? "day" : "days"}:
              </p>
              <p className="text-2xl font-bold text-right text-gray-900">
                USD {quotation.monetaryAmount || "-"}
              </p>
              <p className="text-sm text-green-600 text-right font-medium">
                Free cancellation
              </p>
            </div>
            <Button
              className="w-full mt-4 bg-blue-800 text-white"
              variant="default"
              onClick={() => onSelect && onSelect(offer)}
            >
              View deal
            </Button>
          </div>
        </div>

        {/* Provider */}
        <div className="border-t mt-4 pt-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <img
              src={provider.logoUrl || "/placeholder-logo.png"}
              alt={provider.name || "Provider"}
              className="h-6 object-contain"
            />
            <div className="bg-blue-800 text-white font-bold text-sm px-2 py-0.5 rounded">
              {provider.name || "Unknown Provider"}
            </div>
            <div>
              <p className="text-sm font-semibold">Fabulous</p>
              <p className="text-xs text-gray-500">400+ reviews</p>
            </div>
          </div>
          <div className="flex w-full md:w-fit items-start md:items-center gap-4 text-sm text-gray-600 flex-col md:flex-row">
            <a href="#" className="flex items-center gap-1 hover:underline">
              <Info size={14} /> Important info
            </a>
            <a href="#" className="flex items-center gap-1 hover:underline">
              <Mail size={14} /> Email quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
// ------------------- Cars Page -------------------
export default function CarsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchCriteria = useSelector((state: RootState) => state.car.criteria);

  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const offersPerPage = 5;
  const totalPages = Math.ceil(offers.length / offersPerPage);
  const paginatedOffers = offers.slice(
    (currentPage - 1) * offersPerPage,
    currentPage * offersPerPage
  );

  // ✅ Smooth scroll once offers are available
  useEffect(() => {
    if (!loading && offers.length > 0) {
      const timer = setTimeout(() => {
        window.scrollTo({
          top: window.innerHeight * 1,
          behavior: "smooth",
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading, offers]);

  useEffect(() => {
    if (!searchCriteria) return;

    const fetchOffers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getTransferOffers(searchCriteria);

        // Process offers: adjust price +30 USD and min seats = 4
        const adjustedOffers = (data.data || []).map((offer: any) => {
          const quotation = offer.quotation || {};
          const price = Number(quotation.monetaryAmount || 0) + 30;

          // Ensure min seats = 4
          const seats = offer.vehicle?.seats?.[0]?.count || 4;
          if (offer.vehicle) {
            offer.vehicle.seats = [{ count: Math.max(seats, 4) }];
          }

          return {
            ...offer,
            quotation: { ...quotation, monetaryAmount: price.toFixed(2) },
          };
        });

        setOffers(adjustedOffers);
      } catch (err: any) {
        // consoleerror("Error fetching transfer offers:", err);
        setError("Failed to fetch transfer offers");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [searchCriteria]);

  if (!searchCriteria) {
    return (
      <NoResults />
    );
  }

  const formattedDateTime = format(
    new Date(searchCriteria.startDateTime || new Date()),
    "d MMMM, yyyy 'at' hh:mm a"
  );

  const formatPriceUSD = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const handleSelectCar = (offer: any) => {
    setSelectedOffer(offer);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedOffer) return;
    dispatch(setSelectedCar(selectedOffer));
    setModalOpen(false);
    router.push("/book-car");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 bg-gray-50">
      {/* Search Summary */}
      <div className="rounded-md overflow-hidden flex flex-wrap gap-2">
        {[
          {
            label: "Trip",
            value: `${searchCriteria.startLocationCode || "-"} - ${searchCriteria.endName || "-"
              }`,
          },
          { label: "Address", value: searchCriteria.endAddressLine || "-" },
          { label: "City", value: searchCriteria.endCityName || "-" },
          { label: "Date & Time", value: formattedDateTime },
        ].map((item) => (
          <div
            key={item.label}
            className="text-white p-4 rounded shadow-sm flex gap-2 bg-blue-800"
          >
            <p className="text-sm">{item.label}</p>
            <span>-</span>
            <p className="font-semibold text-sm">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Available Cars */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Available Cars</h2>
        {loading && <LoadingAbsolute />}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && offers.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p>Oops no cars found at this moment! Try calling our team</p>
            <div className="mt-4 flex w-fit items-center bg-blue-800 rounded-md  mx-auto px-4">
              <Phone className="text-white" />

              <Button
                variant="secondary"
                className="w-fit flex items-center justify-center gap-2 bg-blue-800 text-white"
                asChild
              >
                <a href="tel:+1234567890">Call Now</a>
              </Button>
            </div>
          </div>
        )}

        <div className="grid gap-6">
          {paginatedOffers.map((offer, index) => (
            <CarCard
              key={offer.id || index}
              offer={offer}
              searchCriteria={searchCriteria}
              isTopPick={index === 0 && currentPage === 1}
              onSelect={handleSelectCar}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <Button
              className="bg-blue-800 text-white"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              className="bg-blue-800 text-white"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md p-6 bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Your Car</DialogTitle>
          </DialogHeader>
          {selectedOffer && (
            <div className="flex flex-col gap-4 mt-4">
              <img
                src={selectedOffer.vehicle?.imageURL || "/placeholder-car.png"}
                alt={selectedOffer.vehicle?.description || "Vehicle"}
                className="w-full h-40 object-cover rounded-md"
              />
              <p className="font-semibold text-lg">
                {selectedOffer.vehicle?.description || "Vehicle"}
              </p>
              <p className="text-gray-500 text-sm">
                Seats: {selectedOffer.vehicle?.seats?.[0]?.count || "-"},
                Baggage: {selectedOffer.vehicle?.baggages?.[0]?.count || "-"} (
                {selectedOffer.vehicle?.baggages?.[0]?.size || "-"})
              </p>
              <p className="text-gray-500 text-sm">
                Pickup: {searchCriteria.startLocationCode || "-"} at{" "}
                {formattedDateTime}
              </p>
              <p className="text-gray-500 text-sm">
                Dropoff: {searchCriteria.endAddressLine || "-"},{" "}
                {searchCriteria.endCityName || "-"}
              </p>
              <p className="text-green-600 font-bold text-lg">
                {formatPriceUSD(
                  Number(selectedOffer.quotation?.monetaryAmount || 0)
                )}
              </p>
            </div>
          )}
          <DialogFooter className="mt-4">
            <Button
              className="w-full bg-blue-800 text-white"
              variant="default"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
