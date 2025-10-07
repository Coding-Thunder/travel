import React, { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import countryList from 'react-select-country-list';
import emojiFlags from 'emoji-flags';
import { BillingInfo as Interface } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

// Define the props type for the BillingForm component
interface BillingFormProps {
    billingInfo: {
        country: string;
        address: string;
        city: string;
        state: string;
        postalCode: string;
    };
    setBillingInfo: React.Dispatch<React.SetStateAction<Interface>>;
    handleFinalSubmission: (e: React.FormEvent) => void
    selectedFlight: Record<string, any>
}

const BillingInfo: React.FC<BillingFormProps> = ({ billingInfo, setBillingInfo, handleFinalSubmission, selectedFlight }) => {
    const countries = useMemo(() => countryList().getData(), []);

    return (
        <div>
            <h2 className="text-xl mb-4 text-blue">Billing Details</h2>
            <p className="text-sm mb-4">As per Bank records or credit card company</p>

            {/* Country */}
            <div className="w-full lg:w-1/2 mb-4">
                <label className="block mb-1">Country *</label>
                <Select
                    onValueChange={(value) => setBillingInfo({ ...billingInfo, country: value })}
                    value={billingInfo.country}
                >
                    <SelectTrigger className="w-full h-12">
                        <SelectValue placeholder="Select Billing Country" />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                        {countries.map((country) => {
                            const countryFlag = emojiFlags.countryCode(country.value)?.emoji || '';
                            return (
                                <SelectItem key={country.value} value={country.label}>
                                    {countryFlag} {country.label}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>

            {/* Address */}

            <div className='w-full mb-4 flex flex-col lg:flex-row items-center gap-4'>
                <div className='w-full lg:w-1/2'>
                    <label className="block mb-1">Address *</label>
                    <Input
                        type="text"
                        value={billingInfo.address}
                        onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                        placeholder="Enter Billing Address"
                        required
                        className="w-full h-12"
                    />
                </div>

                {/* City/Town */}
                <div className='w-full lg:w-1/2'>
                    <label className="block mb-1">City town *</label>
                    <Input
                        type="text"
                        value={billingInfo.city}
                        onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                        placeholder="Enter City/Town"
                        required
                        className="w-full h-12"
                    />
                </div>
            </div>

            <div className="w-full mb-4 flex items-center gap-4">

                {/* State/Province */}
                <div className='w-full lg:w-1/2'>
                    <label className="block mb-1">State/Province *</label>
                    <Input
                        type="text"
                        value={billingInfo.state}
                        onChange={(e) => setBillingInfo({ ...billingInfo, state: e.target.value })}
                        placeholder="Enter State/Province"
                        required
                        className="w-full h-12"
                    />
                </div>

                {/* Postal Code */}
                <div className='w-full lg:w-1/2'>
                    <label className="block mb-1">Postal Code *</label>
                    <Input
                        type="text"
                        value={billingInfo.postalCode}
                        onChange={(e) => setBillingInfo({ ...billingInfo, postalCode: e.target.value })}
                        placeholder="Enter Postal Code"
                        required
                        className="w-full h-12"
                    />
                </div>
            </div>
            <div className='flex justify-end'>
                <Button
                    onClick={handleFinalSubmission}
                    disabled={!selectedFlight}
                    className="py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out h-fit w-fit flex flex-col disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                >
                    Confirm & Book
                    <span className='capitalize text-xs flex items-center justify-center gap-2'><Lock size={12} /> secure payment</span>
                </Button>
            </div>
        </div>
    );
};

export default BillingInfo;
