"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaPlane } from "react-icons/fa";
import { CardInfo, ContactInfo, SearchCriteria, Traveler } from "@/lib/types";
import "react-phone-number-input/style.css";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { flightCodes, routings } from "@/lib/utils";

import spiritAirline from "@/public/png/spirit.png";
import fronttierAirline from "@/public/png/frontier.png";
import jetblueAirline from "@/public/png/jetblue.svg";
import southwestAirline from "@/public/png/southwest.svg";
import valid from "card-validator";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { RootState } from "@/lib/store/store";
import apiService from "@/lib/api/api-service";
import LoadingAbsolute from "@/components/Common/LoadingAbsolute";
import PaymentForm from "@/components/PaymentForm";
import BillingInfo from "@/components/BillingInfo";
import Image from "next/image";
import ContactInformation from "@/components/ContactInformation";
import Divider from "@/components/Divider";
import SslSecured from "@/components/SslSecured";

const BookNowPage: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const selectedFlight = useSelector(
    (state: RootState) => state.booking.selectedFlight
  );
  const searchCriteria = useSelector(
    (state: RootState) => state.flights.searchCriteria
  ) as SearchCriteria;
  const [loading, setLoading] = useState<boolean>(false);

  const [showCardInput, setShowCardInput] = useState<boolean>(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "",
    email: "",
  });
  const [adults, setAdults] = useState<Traveler[]>([]);
  const [childrens, setChildrens] = useState<Traveler[]>([]);
  const [infants, setInfants] = useState<Traveler[]>([]);
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    number: "",
    month: "",
    year: "",
    cvc: "",
    name: "",
  });
  const [billingInfo, setBillingInfo] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const initializeTravelers = (
    count: number,
    type: Traveler["type"]
  ): Traveler[] => {
    return Array.from({ length: count }, () => ({
      type,
      gender: "male", // Set default to "male" or "female"
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
    }));
  };

  const isRoundTrip = useSelector((state: RootState) => state.trip.isRoundTrip);

  useEffect(() => {
    setAdults(initializeTravelers(searchCriteria.adults, "adults"));
    setChildrens(initializeTravelers(searchCriteria.childrens, "childrens"));
    setInfants(initializeTravelers(searchCriteria.infants, "infants"));
  }, [searchCriteria]);

  const handleAdultChange = (
    index: number,
    field: keyof Traveler,
    value: string
  ) => {
    const updatedAdults = [...adults];
    updatedAdults[index] = { ...updatedAdults[index], [field]: value };
    setAdults(updatedAdults);
  };

  const handleChildrenChange = (
    index: number,
    field: keyof Traveler,
    value: string
  ) => {
    const updatedChildren = [...childrens];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    setChildrens(updatedChildren);
  };

  const handleInfantChange = (
    index: number,
    field: keyof Traveler,
    value: string
  ) => {
    const updatedInfants = [...infants];
    updatedInfants[index] = { ...updatedInfants[index], [field]: value };
    setInfants(updatedInfants);
  };

  // Now use the appropriate function in your ContactInformation component:
  const handleTravelerChange = (
    type: "adults" | "childrens" | "infants",
    index: number,
    field: keyof Traveler,
    value: string
  ) => {
    if (type === "adults") {
      handleAdultChange(index, field, value);
    } else if (type === "childrens") {
      handleChildrenChange(index, field, value);
    } else if (type === "infants") {
      handleInfantChange(index, field, value);
    }
  };


  const handleFinalSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    var numberValidation = valid.number(cardInfo.number);

    // Validate fields
    const isCardInfoValid =
      cardInfo.number !== "" &&
      numberValidation.isValid &&
      cardInfo.cvc !== "" &&
      cardInfo.name !== "" &&
      cardInfo.month !== "" &&
      cardInfo.year !== "";
    const isBillingInfoValid =
      billingInfo.country !== "" &&
      billingInfo.address !== "" &&
      billingInfo.city !== "" &&
      billingInfo.state !== "" &&
      billingInfo.postalCode !== "";

    // Check if any validation fails
    if (!isCardInfoValid || !isBillingInfoValid) {
      toast({
        title: "Error",
        description: "Please fill all the details.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    // If all validations pass, create booking details
    const bookingDetails = {
      contactInfo,
      travelers: {
        adults,
        childrens,
        infants,
      },
      selectedFlight,
      cardInfo,
      billingInfo,
    };
    // Integrate createBooking API function
    try {
      setLoading(true); // Start loading
      const response = await apiService.createBooking(bookingDetails);
      // Show success toast notification
      setLoading(false);
      if (response) {
        toast({
          title: "Success",
          description: "Booking created successfully!",
          variant: "default",
          duration: 5000,
        });
      }
      router.push(routings.booking_successfull);
    } catch (error) {
      // Show failure toast notification
      // consolelog(error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleCardDetailsShow = () => {
    // Validate required fields before toggling card input visibility
    const isContactInfoValid =
      contactInfo.phone !== "" && contactInfo.email !== "";
    const isAdultsValid =
      adults.length > 0 &&
      adults.every(
        (traveler) =>
          traveler.firstName !== "" &&
          traveler.lastName !== "" &&
          traveler.dob !== ""
      );
    var isChildrensValid = true;
    var isInfantsValid = true;

    // Check if any validation fails

    if (childrens.length) {
      isChildrensValid =
        childrens.length > 0 &&
        childrens.every(
          (traveler) =>
            traveler.firstName !== "" &&
            traveler.lastName !== "" &&
            traveler.dob !== ""
        );
    }

    if (infants.length) {
      isInfantsValid =
        childrens.length > 0 &&
        infants.every(
          (traveler) =>
            traveler.firstName !== "" &&
            traveler.lastName !== "" &&
            traveler.dob !== ""
        );
    }

    if (
      !isContactInfoValid ||
      !isAdultsValid ||
      !isChildrensValid ||
      !isInfantsValid
    ) {
      toast({
        title: "Error",
        description: "Please fill all the details.",
        variant: "destructive",
      });
      return;
    }

    // Toggle the card input visibility if all validations pass
    setShowCardInput(!showCardInput);
  };

  return (
    <div className="container mx-auto mt-24 px-4">
      {loading && <LoadingAbsolute />}
      <div className="flex flex-col  lg:flex-row items-start justify-center gap-16">
        <div className="w-full lg:w-4/6 bg-white p-6 shadow-lg rounded-lg">
          <form onSubmit={handleFinalSubmission} className="space-y-6">
            {showCardInput && selectedFlight ? (
              <>
                <PaymentForm cardInfo={cardInfo} setCardInfo={setCardInfo} />
                <BillingInfo
                  billingInfo={billingInfo}
                  setBillingInfo={setBillingInfo}
                  handleFinalSubmission={handleFinalSubmission}
                  selectedFlight={selectedFlight}
                />
              </>
            ) : (
              <>
                {/* Selected Flight Details */}

                <ContactInformation
                  contactInfo={contactInfo}
                  setContactInfo={setContactInfo}
                  searchCriteria={searchCriteria}
                  handleTravelerChange={handleTravelerChange}
                  travelers={{
                    adults,
                    childrens: childrens.length ? childrens : null,
                    infants: infants.length ? infants : null,
                  }}
                  handleCardDetailsShow={handleCardDetailsShow}
                />
              </>
            )}
          </form>
        </div>
        {/* SSL Secured Info */}

        <div className="h-fit w-full lg:w-2/6 pl-4 mb-4 ">
          {showCardInput && (
            <>
              <div className="w-full flex flex-col items-start p-6 shadow-lg rounded-lg transition duration-300 ease-in-out bg-white">
                {selectedFlight && (
                  <>
                    {selectedFlight.itineraries[0].segments[0].carrierCode ===
                      flightCodes.NK && (
                        <Image
                          src={spiritAirline.src}
                          width={70}
                          alt="Airline logo"
                          height={10}
                        />
                      )}
                    {selectedFlight.itineraries[0].segments[0].carrierCode ===
                      flightCodes.F9 && (
                        <Image
                          className="invert"
                          src={fronttierAirline.src}
                          width={100}
                          alt="Airline logo"
                          height={10}
                        />
                      )}
                    {selectedFlight.itineraries[0].segments[0].carrierCode ===
                      flightCodes.B6 && (
                        <Image
                          src={jetblueAirline.src}
                          width={80}
                          alt="Airline logo"
                          height={10}
                        />
                      )}
                    {selectedFlight.itineraries[0].segments[0].carrierCode ===
                      flightCodes.WN && (
                        <Image
                          src={southwestAirline.src}
                          width={100}
                          alt="Airline logo"
                          height={10}
                        />
                      )}
                    <p className="text-base font-bold">Price Details</p>
                    <Divider />
                    <div className="w-full flex items-center gap-4 justify-between">
                      <p className="w-fit text-base">
                        {adults.length} Adult{adults.length > 1 && "s"}
                      </p>
                      <p className="w-fit text-base text-gray-500">
                        {" "}
                        {selectedFlight.price.grandTotal}
                      </p>
                    </div>
                    <Divider />
                    <div className="w-full flex items-center gap-4 justify-between text-green-500 text-base font-semibold">
                      <p className="w-fit">(-) Discount</p>
                      <p className="w-fit">
                        {" "}
                        {Number(
                          (Number(selectedFlight.price.grandTotal) / 100) *
                          Number(selectedFlight.price.discount || 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                    <Divider />
                    <div className="w-full flex items-center gap-4 justify-between text-blue-800 text-xl font-semibold">
                      <p className="w-fit">Total Price ( $ )</p>
                      <p className="w-fit">
                        {" "}
                        ${" "}
                        {Number(
                          Number(selectedFlight.price.grandTotal) -
                          (Number(selectedFlight.price.grandTotal) / 100) *
                          Number(selectedFlight.price.discount || 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                    <Divider dashed />
                    <p className="text-xs text-gray-500 px-2">
                      All fares displayed here are quoted in $ and inclusive of
                      the base fare, taxes, and fees. Additional Baggage Fees
                      may apply as per the airline policies. Your Credit/Debit
                      card may be billed in multiple charges totaling the final
                      price.
                    </p>
                  </>
                )}
              </div>
            </>
          )}
          {/* ssl secured */}
          <SslSecured />
        </div>
      </div>
    </div>
  );
};

export default BookNowPage;
