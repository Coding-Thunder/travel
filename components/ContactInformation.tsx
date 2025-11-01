import React from "react";
import { Input } from "@/components/ui/input";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { ContactInfo, SearchCriteria, Traveler } from "@/lib/types";
import { Button } from "@/components/ui/button";

// Define the props type for the ContactInformation component
interface Props {
    contactInfo: ContactInfo;
    setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
    searchCriteria: SearchCriteria;
    travelers: {
        adults: Traveler[] | null;
        childrens: Traveler[] | null;
        infants: Traveler[] | null;
    };
    handleTravelerChange: (
        type: "adults" | "childrens" | "infants",
        index: number,
        field: keyof Traveler,
        value: string
    ) => void;
    handleCardDetailsShow: () => void;
}

const ContactInformation: React.FC<Props> = ({
    contactInfo,
    setContactInfo,
    searchCriteria,
    travelers,
    handleTravelerChange,
    handleCardDetailsShow,
}) => {
    return (
        <>
            <div className="border-b pb-4 mb-4">
                <h2 className="text-xl text-orange  mb-4">Contact Information</h2>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="w-full md:w-1/3">
                        <label className="block text-base  mb-1">Contact Number *</label>
                        <PhoneInputWithCountrySelect
                            defaultCountry="US"
                            value={contactInfo.phone || ""}
                            onChange={(phone) =>
                                setContactInfo({ ...contactInfo, phone: phone || "" })
                            }
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 h-12 focus:border-orange-500 focus:ring focus:ring-orange-200 outline-none"
                        />
                    </div>
                    <div className="w-full md:w-2/3">
                        <label className="block  mb-1">Email Address *</label>
                        <Input
                            type="email"
                            value={contactInfo.email}
                            onChange={(e) =>
                                setContactInfo({ ...contactInfo, email: e.target.value })
                            }
                            placeholder="Enter Email Address"
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 h-12 focus:border-orange-500 focus:ring focus:ring-orange-200"
                        />
                    </div>
                </div>
            </div>
            {/* Travelers Information */}
            <h2 className="text-sm lg:text-xl  mb-2">
                Travelers ({searchCriteria.adults} Adult
                {searchCriteria.adults > 1 ? "s" : ""})
            </h2>
            <p className="mb-4 text-sm text-gray-600">
                All travelers&#39; information must match exactly with the Passport or
                Government-issued photo ID.
            </p>

            <div>
                {travelers.adults && (
                    <div>
                        <h2 className="text-sm lg:text-xl mb-2">
                            Adult ({travelers.adults.length})
                        </h2>
                        {travelers?.adults.map((traveler: Traveler, index: number) => (
                            <div key={index} className="border-b pb-4 mb-4">
                                {/* Gender Selection */}
                                <div className="mb-4">
                                    <label className="block mb-1">Gender *</label>
                                    <div className="flex gap-4">
                                        <div>
                                            <input
                                                type="radio"
                                                id={`male-adult-${index}`}
                                                name={`gender-adult-${index}`}
                                                value="male"
                                                checked={traveler.gender === "male"}
                                                onChange={(e) =>
                                                    handleTravelerChange(
                                                        "adults",
                                                        index,
                                                        "gender",
                                                        e.target.value
                                                    )
                                                }
                                                className="mr-2 focus:ring-orange-500"
                                            />
                                            <label
                                                htmlFor={`male-adult-${index}`}
                                                className="text-sm"
                                            >
                                                Male
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                id={`female-adult-${index}`}
                                                name={`gender-adult-${index}`}
                                                value="female"
                                                checked={traveler.gender === "female"}
                                                onChange={(e) =>
                                                    handleTravelerChange(
                                                        "adults",
                                                        index,
                                                        "gender",
                                                        e.target.value
                                                    )
                                                }
                                                className="mr-2 focus:ring-orange-500"
                                            />
                                            <label
                                                htmlFor={`female-adult-${index}`}
                                                className="text-sm"
                                            >
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* First Name, Middle Name, Last Name */}
                                <div className="flex gap-4">
                                    <div className="w-full">
                                        <label className="block mb-1">First Name *</label>
                                        <Input
                                            type="text"
                                            value={traveler.firstName}
                                            onChange={(e) =>
                                                handleTravelerChange(
                                                    "adults",
                                                    index,
                                                    "firstName",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter First Name"
                                            required
                                            className="w-full h-12"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block mb-1">Middle Name</label>
                                        <Input
                                            type="text"
                                            value={traveler.middleName}
                                            onChange={(e) =>
                                                handleTravelerChange(
                                                    "adults",
                                                    index,
                                                    "middleName",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter Middle Name"
                                            className="w-full h-12"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-full mt-4">
                                        <label className="block mb-1">Last Name *</label>
                                        <Input
                                            type="text"
                                            value={traveler.lastName}
                                            onChange={(e) =>
                                                handleTravelerChange(
                                                    "adults",
                                                    index,
                                                    "lastName",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter Last Name"
                                            required
                                            className="w-full h-12"
                                        />
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="w-full mt-4">
                                        <label className="block mb-1">Date of Birth *</label>
                                        <Input
                                            type="date"
                                            value={traveler.dob}
                                            onChange={(e) =>
                                                handleTravelerChange(
                                                    "adults",
                                                    index,
                                                    "dob",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            className="w-full h-12"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {travelers.childrens && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Childrens ({travelers.childrens.length})
                        </h2>
                        {travelers?.childrens.map((traveler: Traveler, index: number) => (
                            <div key={index} className="border-b pb-4 mb-4">
                                {/* Gender Selection */}
                                <div className="mb-4">
                                    <label className="block font-medium mb-1">Gender *</label>
                                    <div className="flex gap-4">
                                        <div>
                                            <input
                                                type="radio"
                                                id={`male-children-${index}`}
                                                name={`gender-children-${index}`}
                                                value="male"
                                                checked={traveler.gender === "male"}
                                                onChange={(e) =>
                                                    handleTravelerChange(
                                                        "childrens",
                                                        index,
                                                        "gender",
                                                        e.target.value
                                                    )
                                                }
                                                className="mr-2 focus:ring-orange-500"
                                            />
                                            <label
                                                htmlFor={`male-children-${index}`}
                                                className="text-sm"
                                            >
                                                Male
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                id={`female-children-${index}`}
                                                name={`gender-children-${index}`}
                                                value="female"
                                                checked={traveler.gender === "female"}
                                                onChange={(e) =>
                                                    handleTravelerChange(
                                                        "childrens",
                                                        index,
                                                        "gender",
                                                        e.target.value
                                                    )
                                                }
                                                className="mr-2 focus:ring-orange-500"
                                            />
                                            <label
                                                htmlFor={`female-children-${index}`}
                                                className="text-sm"
                                            >
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* First Name, Middle Name, Last Name */}
                                <div className="flex gap-4">
                                    <div className="w-full">
                                        <label className="block font-medium mb-1">
                                            First Name *
                                        </label>
                                        <Input
                                            type="text"
                                            value={traveler.firstName}
                                            onChange={(e) =>
                                                handleTravelerChange(
                                                    "childrens",
                                                    index,
                                                    "firstName",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter First Name"
                                            required
                                            className="w-full h-12"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block font-medium mb-1">
                                            Middle Name
                                        </label>
                                        <Input
                                            type="text"
                                            value={traveler.middleName}
                                            onChange={(e) =>
                                                handleTravelerChange(
                                                    "childrens",
                                                    index,
                                                    "middleName",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter Middle Name"
                                            className="w-full h-12"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-full mt-4">
                                        <label className="block font-medium mb-1">
                                            Last Name *
                                        </label>
                                        <Input
                                            type="text"
                                            value={traveler.lastName}
                                            onChange={(e) =>
                                                handleTravelerChange(
                                                    "childrens",
                                                    index,
                                                    "lastName",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter Last Name"
                                            required
                                            className="w-full h-12"
                                        />
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="w-full mt-4">
                                        <label className="block font-medium mb-1">
                                            Date of Birth *
                                        </label>
                                        <Input
                                            type="date"
                                            value={traveler.dob}
                                            onChange={(e) =>
                                                handleTravelerChange(
                                                    "childrens",
                                                    index,
                                                    "dob",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            className="w-full h-12"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {travelers.infants && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Infants ({travelers.infants.length})
                        </h2>
                        {travelers?.infants.map((traveler: Traveler, index: number) => (
                            <div key={index} className="border-b pb-4 mb-4">
                                {/* Gender Selection */}
                                <div className="mb-4">
                                    <label className="block font-medium mb-1">Gender *</label>
                                    <div className="flex gap-4">
                                        <div>
                                            <input
                                                type="radio"
                                                id={`male-infant-${index}`}
                                                name={`gender-infant-${index}`}
                                                value="male"
                                                checked={traveler.gender === "male"}
                                                onChange={(e) =>
                                                    handleTravelerChange(
                                                        "infants",
                                                        index,
                                                        "gender",
                                                        e.target.value
                                                    )
                                                }
                                                className="mr-2 focus:ring-orange-500"
                                            />
                                            <label
                                                htmlFor={`male-infant-${index}`}
                                                className="text-sm"
                                            >
                                                Male
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="radio"
                                                id={`female-infant-${index}`}
                                                name={`gender-infant-${index}`}
                                                value="female"
                                                checked={traveler.gender === "female"}
                                                onChange={(e) =>
                                                    handleTravelerChange(
                                                        "infants",
                                                        index,
                                                        "gender",
                                                        e.target.value
                                                    )
                                                }
                                                className="mr-2 focus:ring-orange-500"
                                            />
                                            <label
                                                htmlFor={`female-infant-${index}`}
                                                className="text-sm"
                                            >
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* First Name, Middle Name, Last Name */}
                                <div className="flex gap-4">
                                    <div className="w-full">
                                        <label className="block font-medium mb-1">
                                            First Name *
                                        </label>
                                        <Input
                                            type="text"
                                            value={traveler.firstName}
                                            onChange={(e) =>
                                                handleTravelerChange(
                                                    "infants",
                                                    index,
                                                    "firstName",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter First Name"
                                            required
                                            className="w-full h-12"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block font-medium mb-1">
                                            Middle Name
                                        </label>
                                        <Input
                                            type="text"
                                            value={traveler.middleName}
                                            onChange={(e) =>
                                                handleTravelerChange(
                                                    "infants",
                                                    index,
                                                    "middleName",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter Middle Name"
                                            className="w-full h-12"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-full mt-4">
                                        <label className="block font-medium mb-1">
                                            Last Name *
                                        </label>
                                        <Input
                                            type="text"
                                            value={traveler.lastName}
                                            onChange={(e) =>
                                                handleTravelerChange(
                                                    "infants",
                                                    index,
                                                    "lastName",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter Last Name"
                                            required
                                            className="w-full h-12"
                                        />
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="w-full mt-4">
                                        <label className="block font-medium mb-1">
                                            Date of Birth *
                                        </label>
                                        <Input
                                            type="date"
                                            value={traveler.dob}
                                            onChange={(e) =>
                                                handleTravelerChange(
                                                    "infants",
                                                    index,
                                                    "dob",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            className="w-full h-12"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* End Travelers Information */}
            <div className="flex justify-center mt-4 bg-orange-500 text-white w-fit ml-auto rounded-md">
                <Button onClick={handleCardDetailsShow}>Next</Button>
            </div>
        </>
    );
};

export default ContactInformation;
