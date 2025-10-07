"use client";
import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { CardInfo, ContactInfo } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import countryList from "react-select-country-list";
import emojiFlags from "emoji-flags";
import { useRouter } from "next/navigation";
import visaImage from "@/public/svg/visa.png";
import mastercardImage from "@/public/svg/mastercard.svg";
import Image from "next/image";
import "react-phone-number-input/style.css";
import { RootState } from "@/lib/store/store";
import apiService from "@/lib/api/api-service";
import LoadingAbsolute from "@/components/Common/LoadingAbsolute";
import ExpirySelect from "@/components/ExpirySelect";
import SslSecured from "@/components/SslSecured";

const BookCarPage: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();

  const selectedCar = useSelector((state: RootState) => state.car.selectedCar);

  const [loading, setLoading] = useState<boolean>(false);
  const [showPayment, setShowPayment] = useState<boolean>(false);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "",
    email: "",
  });

  const searchCriteria = useSelector((state: RootState) => state.car.criteria);
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

  const countries = useMemo(() => countryList().getData(), []);

  const handleProceedToPayment = () => {
    if (!contactInfo.phone || !contactInfo.email) {
      toast({
        title: "Error",
        description: "Please fill all contact details.",
        variant: "destructive",
      });
      return;
    }
    setShowPayment(true);
  };

  const handleFinalSubmission = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !contactInfo.phone ||
      !contactInfo.email ||
      !cardInfo.number ||
      !cardInfo.cvc ||
      !cardInfo.name ||
      !cardInfo.month ||
      !cardInfo.year ||
      !billingInfo.address ||
      !billingInfo.city ||
      !billingInfo.state ||
      !billingInfo.country ||
      !billingInfo.postalCode
    ) {
      toast({
        title: "Error",
        description: "Please fill all required details.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedCar) {
      toast({
        title: "Error",
        description: "No car selected for booking.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const bookingDetails = {
      contactInfo,
      selectedCar,
      searchCriteria,
      cardInfo,
      billingInfo,
    };

    try {
      await apiService.createCarBooking(bookingDetails); // Call /bookings/car
      setLoading(false);
      toast({
        title: "Success",
        description: "Car booking created successfully!",
        variant: "default",
      });
      router.push("/booking-successfull"); // Redirect after success
    } catch (error) {
      // consoleerror(error);
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto mt-24 px-4">
      {loading && <LoadingAbsolute />}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-16">
        <div className="w-full lg:w-4/6 bg-white p-6 shadow-lg rounded-lg">
          <form onSubmit={handleFinalSubmission} className="space-y-6">
            {!showPayment && (
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl text-blue mb-4">
                  Contact Information
                </h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3">
                    <label className="block text-base mb-1">
                      Contact Number *
                    </label>
                    <PhoneInputWithCountrySelect
                      defaultCountry="US"
                      value={contactInfo.phone || ""}
                      onChange={(phone) =>
                        setContactInfo({ ...contactInfo, phone: phone || "" })
                      }
                      required
                      className="w-full border border-gray-300 rounded-lg p-2 h-12 focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none"
                    />
                  </div>
                  <div className="w-full md:w-2/3">
                    <label className="block mb-1">Email Address *</label>
                    <Input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          email: e.target.value,
                        })
                      }
                      placeholder="Enter Email Address"
                      required
                      className="w-full border border-gray-300 rounded-lg p-2 h-12 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                  </div>
                </div>
                <p className="mb-4 text-sm text-gray-600 mt-2">
                  Your contact information will be used to send booking
                  confirmations and updates.
                </p>
                <div className="flex justify-center mt-4">
                  <Button type="button" onClick={handleProceedToPayment}>
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            )}

            {showPayment && selectedCar && (
              <>
                {/* Payment Section */}
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-xl text-blue mb-4">
                    Payment Details
                  </h2>
                  <p className="text-sm text-green-600 mb-4">
                    All card information is fully encrypted, secure and
                    protected.
                  </p>

                  <div className="flex items-center mb-4 gap-2">
                    <Image src={visaImage} alt="Visa" width={50} height={30} />
                    <Image
                      src={mastercardImage}
                      alt="MasterCard"
                      width={50}
                      height={30}
                    />
                  </div>

                  <div className="mb-4 w-full md:w-1/2">
                    <label className="block mb-1">Card Number *</label>
                    <Input
                      type="text"
                      maxLength={19}
                      value={cardInfo.number}
                      onChange={(e) =>
                        setCardInfo({ ...cardInfo, number: e.target.value })
                      }
                      placeholder="XXXX XXXX XXXX XXXX"
                      required
                    />
                  </div>

                  <div className="mb-4 w-full md:w-1/2">
                    <label className="block mb-1">Card Holder's Name *</label>
                    <Input
                      type="text"
                      value={cardInfo.name}
                      onChange={(e) =>
                        setCardInfo({ ...cardInfo, name: e.target.value })
                      }
                      placeholder="Enter Card Holder's Name"
                      required
                    />
                  </div>

                  <div className="mb-4 w-full md:w-full flex gap-4">
                    <ExpirySelect
                      cardInfo={cardInfo}
                      setCardInfo={setCardInfo}
                    />
                  </div>

                  {/* <div className="mb-4 w-full md:w-1/2">
                    <label className="block mb-1">CVC *</label>
                    <Input
                      type="text"
                      maxLength={4}
                      value={cardInfo.cvc}
                      onChange={(e) =>
                        setCardInfo({ ...cardInfo, cvc: e.target.value })
                      }
                      placeholder="CVC"
                      required
                    />
                  </div> */}
                </div>

                {/* Billing Section */}
                <div>
                  <h2 className="text-xl mb-4 text-blue">
                    Billing Details
                  </h2>
                  <p className="text-sm mb-4">
                    As per Bank records or credit card company
                  </p>

                  <div className="w-full lg:w-1/2 mb-4">
                    <label className="block mb-1">Country *</label>
                    <select
                      value={billingInfo.country}
                      onChange={(e) =>
                        setBillingInfo({
                          ...billingInfo,
                          country: e.target.value,
                        })
                      }
                      className="w-full h-12 border rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => {
                        const flag =
                          emojiFlags.countryCode(country.value)?.emoji || "";
                        return (
                          <option key={country.value} value={country.label}>
                            {flag} {country.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="w-full mb-4 flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/2">
                      <label className="block mb-1">Address *</label>
                      <Input
                        type="text"
                        value={billingInfo.address}
                        onChange={(e) =>
                          setBillingInfo({
                            ...billingInfo,
                            address: e.target.value,
                          })
                        }
                        placeholder="Enter Billing Address"
                        required
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <label className="block mb-1">City/Town *</label>
                      <Input
                        type="text"
                        value={billingInfo.city}
                        onChange={(e) =>
                          setBillingInfo({
                            ...billingInfo,
                            city: e.target.value,
                          })
                        }
                        placeholder="Enter City/Town"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full mb-4 flex gap-4">
                    <div className="w-full lg:w-1/2">
                      <label className="block mb-1">State/Province *</label>
                      <Input
                        type="text"
                        value={billingInfo.state}
                        onChange={(e) =>
                          setBillingInfo({
                            ...billingInfo,
                            state: e.target.value,
                          })
                        }
                        placeholder="Enter State/Province"
                        required
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <label className="block mb-1">Postal Code *</label>
                      <Input
                        type="text"
                        value={billingInfo.postalCode}
                        onChange={(e) =>
                          setBillingInfo({
                            ...billingInfo,
                            postalCode: e.target.value,
                          })
                        }
                        placeholder="Enter Postal Code"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end h-fit">
                    <Button
                      type="submit"
                      disabled={loading} // Disable while submitting
                      className="py-8 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out flex flex-col focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Processing..." : "Confirm & Book"}
                      <span className="capitalize text-xs flex items-center justify-center gap-2">
                        <Lock size={12} /> secure payment
                      </span>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>

        <div className="h-fit w-full lg:w-2/6 pl-4 mb-4">
          <SslSecured />
        </div>
      </div>
    </div>
  );
};

export default BookCarPage;
