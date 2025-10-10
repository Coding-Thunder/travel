"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { format, parseISO, isValid, differenceInDays } from "date-fns";
import { SetStateAction, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader, MapPin, Star, Filter, BedDouble } from "lucide-react";
import { useDispatch } from "react-redux";
import Image, { StaticImageData } from "next/image";
import { Dialog } from "@headlessui/react";
import { toast } from "@/components/ui/use-toast";

// ShadCN UI
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Static hotel images
import hotelImg1 from "@/public/hotel/h1.jpg";
import hotelImg2 from "@/public/hotel/h2.avif";
import hotelImg3 from "@/public/hotel/h3.jpeg";
import hotelImg4 from "@/public/hotel/h4.jpeg";
import hotelImg5 from "@/public/hotel/h5.jpeg";
import hotelImg6 from "@/public/hotel/h6.jpeg";
import hotelImg7 from "@/public/hotel/h7.jpeg";
import hotelImg9 from "@/public/hotel/h9.jpeg";
import hotelImg10 from "@/public/hotel/h10.jpeg";
import hotelImg11 from "@/public/hotel/h11.jpeg";
import hotelImg12 from "@/public/hotel/h12.jpeg";
import { Slider } from "@/components/ui/slider";
import { AppDispatch } from "@/lib/store/store";
import apiService from "@/lib/api/api-service";
import { setSelectedOffer } from "@/lib/store/slices/hotelSlice";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
const HotelMap = dynamic(() => import("@/components/HotelMap"), { ssr: false });


const hotelImages: StaticImageData[] = [
  hotelImg1,
  hotelImg2,
  hotelImg3,
  hotelImg4,
  hotelImg5,
  hotelImg6,
  hotelImg7,
  hotelImg9,
  hotelImg10,
  hotelImg11,
  hotelImg12,
];


interface Hotel {
  hotelId: string;
  name: string;
  address: string;
  city: string;
  postalCode?: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
  chainCode?: string;
  isSponsored?: boolean;
  stars?: number;
}

interface HotelImage {
  src: StaticImageData;
  alt: string;
}

interface Policy {
  policyType: string;
  description?: { text: string };
  amount?: string;
  deadline?: string;
}

interface Offer {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  price: {
    currency: string;
    total: string;
  };
  room: {
    description?: { text: string };
    typeEstimated?: { beds?: number; bedType?: string };
  };
  policies?: { cancellations?: Policy[];[key: string]: any };
  hotelName?: string;
  hotelId?: string;
  image?: HotelImage;
}
// ------------------- END TYPES -------------------

const AvailableHotelsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const HotelMap = dynamic(() => import("@/components/HotelMap"), { ssr: false });


  const cityCode = searchParams.get("city") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const adults = Number(searchParams.get("adults") || 1);

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedHotel, setExpandedHotel] = useState<string | null>(null);
  const [offers, setOffers] = useState<Record<string, Offer[]>>({});
  const [offersLoading, setOffersLoading] = useState<string | null>(null);
  const [hotelLoading, setHotelLoading] = useState<string | null>(null);

  const [selectedOffer, setSelectedOfferLocal] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [priceRange, setPriceRange] = useState<number>(1000);
  const [starRating, setStarRating] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 5;

  const numberOfNights =
    isValid(parseISO(checkIn)) && isValid(parseISO(checkOut))
      ? differenceInDays(parseISO(checkOut), parseISO(checkIn))
      : 0;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const parsed = parseISO(dateStr);
    return isValid(parsed) ? format(parsed, "PPP") : "N/A";
  };

  // ------------------- Fetch Hotels -------------------
  useEffect(() => {
    if (!cityCode) return;
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await apiService.getHotelsByCity(cityCode);
        const data = response.data || [];
        const mappedHotels: Hotel[] = data.map((h: any, idx: number) => ({
          hotelId: h.hotelId,
          name: h.name,
          address: h.address.lines?.join(", ") || "",
          city: h.address.cityName,
          postalCode: h.address.postalCode,
          countryCode: h.address.countryCode,
          latitude: h.geoCode?.latitude,
          longitude: h.geoCode?.longitude,
          chainCode: h.chainCode,
          isSponsored: h.retailing?.sponsorship?.isSponsored || false,
          stars: Math.floor(Math.random() * 3) + 3,
        }));
        setHotels(mappedHotels);
      } catch (err) {
        // consoleerror(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, [cityCode]);

  const handleViewDeals = async (hotelId: string) => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Missing Dates",
        description: "Select check-in/out",
        variant: "destructive",
      });
      return;
    }

    try {
      setHotelLoading(hotelId)
      setOffersLoading(hotelId);

      // Fetch offers for this hotel
      const res = await apiService.getHotelOffers({
        hotelIds: hotelId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        adults,
      });

      // Example: use your mock response structure
      const hotelData = res.data[0]; // assuming single hotel returned
      const firstOffer = hotelData.offers[0];

      // Set the offer locally for modal
      setSelectedOfferLocal({
        ...firstOffer,
        hotelName: hotelData.hotel.name,
        hotelId: hotelData.hotel.hotelId,
        image: {
          src: hotelImages[0], // you can choose any image mapping logic
          alt: hotelData.hotel.name,
        },
      });

      // Optionally store all offers for that hotel (if you want expanded list)
      setOffers((prev) => ({
        ...prev,
        [hotelId]: hotelData.offers,
      }));

      setExpandedHotel(hotelId); // expand section if needed
      setIsModalOpen(true); // open modal

    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to fetch offers",
        variant: "destructive",
      });
    } finally {
      setOffersLoading(null);
    }
  };

  const handleBookNow = (offer: Offer, hotel: Hotel, image: HotelImage) => {
    setSelectedOfferLocal({
      ...offer,
      hotelName: hotel.name,
      hotelId: hotel.hotelId,
      image,
    });
    setIsModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedOffer) return;
    dispatch(
      setSelectedOffer({
        hotelId: selectedOffer.hotelId!,
        offerId: selectedOffer.id,
        hotelName: selectedOffer.hotelName!,
        checkInDate: selectedOffer.checkInDate,
        checkOutDate: selectedOffer.checkOutDate,
        price: selectedOffer.price,
        room: selectedOffer.room,
        policies: selectedOffer.policies,
      })
    );
    router.push("/book-hotel");
  };

  const validHotels = hotels.filter((h) => h.latitude && h.longitude);
  const center: LatLngExpression =
    validHotels.length > 0
      ? [validHotels[0].latitude!, validHotels[0].longitude!]
      : [20.5937, 78.9629];

  const filteredHotels = hotels.filter((hotel) => {
    const hotelOffers = offers[hotel.hotelId] || [];
    const primaryOffer = hotelOffers[0];
    const meetsPrice =
      !primaryOffer || Number(primaryOffer.price.total) <= priceRange;
    const meetsStar = !starRating || (hotel.stars && hotel.stars >= starRating);
    return meetsPrice && meetsStar;
  });

  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);
  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * hotelsPerPage,
    currentPage * hotelsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto mt-10 flex flex-col lg:flex-row gap-6">
      {/* Map & Filters */}
      <div className="flex-shrink-0 lg:w-80 space-y-6">
        {!isModalOpen && (
          <div className="h-96 w-full relative rounded-lg overflow-hidden border">
            <HotelMap hotels={validHotels} center={center} />
          </div>

        )}

        <div className="bg-white border rounded-lg p-5 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter size={18} /> Filters
          </h2>

          <label className="block text-sm text-gray-600">Price Range</label>
          <Slider
            value={[priceRange]}
            max={1000}
            step={10}
            onValueChange={(val: SetStateAction<number>[]) => {
              setPriceRange(val[0]);
              setCurrentPage(1);
            }}
          />
          <p className="text-sm text-gray-500">Up to ${priceRange}</p>

          <label className="block text-sm text-gray-600">Star Rating</label>
          <select
            className="w-full border rounded px-2 py-1 text-sm"
            value={starRating || ""}
            onChange={(e) => {
              setStarRating(e.target.value ? Number(e.target.value) : null);
              setCurrentPage(1);
            }}
          >
            <option value="">Any</option>
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
          </select>
        </div>
      </div>

      {/* Hotel List */}
      <div className="flex-1 space-y-6">
        <div className="bg-white border rounded-lg p-6">
          <h1 className="text-xl font-bold mb-2">Hotels in {cityCode}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
            <p>
              <span className="font-semibold">Check-in:</span>{" "}
              {formatDate(checkIn)}
            </p>
            <p>
              <span className="font-semibold">Check-out:</span>{" "}
              {formatDate(checkOut)}
            </p>
            <p>
              <span className="font-semibold">Guests:</span> {adults}
            </p>
            <p>
              <span className="font-semibold">Nights:</span> {numberOfNights}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader className="animate-spin w-8 h-8 text-blue-600" />
          </div>
        ) : paginatedHotels.length === 0 ? (
          <p className="text-gray-500 text-center">No hotels match filters.</p>
        ) : (
          <div className="space-y-4">
            {paginatedHotels.map((hotel, index) => {
              const isExpanded = expandedHotel === hotel.hotelId;
              const hotelOffers = offers[hotel.hotelId] || [];
              const primaryOffer = hotelOffers[0];
              const otherOffers = hotelOffers.slice(1);
              const imageUrl: HotelImage = {
                src: hotelImages[index % hotelImages.length],
                alt: hotel.name,
              };

              return (
                <div
                  key={hotel.hotelId}
                  className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row gap-4 p-4">
                    <div className="w-full lg:w-64 flex-shrink-0 relative">
                      <Image
                        src={imageUrl.src}
                        alt={imageUrl.alt}
                        placeholder="blur"
                        className="aspect-video w-full h-full object-cover rounded-md bg-gray-200"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        1 of 24
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 lg:gap-4">
                        <Badge variant="secondary">Hotel</Badge>
                        <div className="flex gap-1 text-yellow-400">
                          {Array(hotel.stars || 3)
                            .fill(0)
                            .map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                            ))}
                        </div>
                        <Badge variant="default">8.5</Badge>
                      </div>
                      <h3 className="text-xl font-bold mt-2">{hotel.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                        <MapPin size={14} /> {hotel.address}, {hotel.city}
                      </p>
                    </div>

                    <div className="flex items-center justify-center">

                      <Button
                        className="w-full"
                        onClick={() => handleViewDeals(hotel.hotelId)}
                      >
                        {hotelLoading == hotel.hotelId ? "loading" : "View Prices"}
                      </Button>

                    </div>
                  </div>

                  {/* Expanded Offers */}
                  <AnimatePresence>
                    {isExpanded && otherOffers.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t bg-gray-50 p-4 space-y-3"
                      >
                        <h4 className="font-semibold text-sm">
                          Other available rooms:
                        </h4>
                        {otherOffers.map((offer) => (
                          <div
                            key={offer.id}
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-white border rounded-md"
                          >
                            <div>
                              <p className="font-medium text-gray-800">
                                {offer.room.description?.text || "Room details"}
                              </p>
                              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                <BedDouble size={14} />{" "}
                                {offer.room.typeEstimated?.beds || 1}{" "}
                                {offer.room.typeEstimated?.bedType || "Bed"}
                              </p>
                            </div>
                            <div className="text-right sm:text-right mt-2 sm:mt-0">
                              <p className="font-bold text-gray-800">
                                ${offer.price.total}
                              </p>
                              <Button
                                size="sm"
                                className="mt-1 w-full sm:w-auto"
                                onClick={() =>
                                  handleBookNow(offer, hotel, imageUrl)
                                }
                              >
                                Select
                              </Button>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 my-4 py-4">
                <Button
                  className="bg-blue-600 text-white"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  className="bg-blue-600 text-white"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Modal */}

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col lg:flex-row overflow-hidden">
            {selectedOffer?.image && (
              <div className="relative lg:w-1/2 w-full h-80 lg:h-auto">
                <Image
                  src={selectedOffer.image.src}
                  alt={selectedOffer.image.alt}
                  fill
                  className="object-cover rounded-t-3xl lg:rounded-l-3xl"
                  placeholder="blur"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg text-lg font-semibold">
                  {selectedOffer.hotelName}
                </div>
              </div>
            )}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Room Details
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {selectedOffer?.room.description?.text ||
                      "No description available."}
                  </p>
                  {selectedOffer?.room.typeEstimated && (
                    <p className="text-gray-600 mt-1">
                      Beds: {selectedOffer.room.typeEstimated.beds || 1} -{" "}
                      {selectedOffer.room.typeEstimated.bedType || "Bed Type"}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <span className="block font-medium">Check-in</span>
                    <p className="mt-1">
                      {selectedOffer && formatDate(selectedOffer.checkInDate)}
                    </p>
                  </div>
                  <div>
                    <span className="block font-medium">Check-out</span>
                    <p className="mt-1">
                      {selectedOffer && formatDate(selectedOffer.checkOutDate)}
                    </p>
                  </div>
                </div>

                {selectedOffer?.policies?.cancellations && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Policies
                    </h3>
                    {selectedOffer.policies.cancellations.map((c, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-50 rounded-xl border border-gray-200 shadow-sm"
                      >
                        <p className="font-medium text-gray-800">
                          Type: {c.policyType}
                        </p>
                        {c.description?.text && (
                          <p className="text-gray-600 mt-1">
                            {c.description.text}
                          </p>
                        )}
                        {c.amount && (
                          <p className="text-gray-600 mt-1">
                            Amount: ${c.amount}
                          </p>
                        )}
                        {c.deadline && (
                          <p className="text-gray-600 mt-1">
                            Deadline: {new Date(c.deadline).toLocaleString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-2xl font-bold text-blue-800">
                  ${selectedOffer?.price.total}
                </div>
                <div className="flex gap-4">
                  <Button
                    className="bg-red-600 text-white"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={handleConfirmBooking}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

    </div>
  );
};

export default AvailableHotelsPage;
