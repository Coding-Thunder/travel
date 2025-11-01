import React from 'react'
import { CardInfo } from '@/lib/types';
import visaImage from "@/public/svg/visa.png";
import mastercardImage from "@/public/svg/mastercard.svg";
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import ExpirySelect from './ExpirySelect';

// Define the props type for the ExpirySelect component
interface Props {
    cardInfo: CardInfo;
    setCardInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
}

const PaymentForm: React.FC<Props> = ({ cardInfo, setCardInfo }) => {
    return (
        <div>
            <h2 className="text-xl text-orange mb-4">Payment Details</h2>
            <p className="text-sm text-green-600 mb-4">
                All card information is fully encrypted, secure and protected.
            </p>

            {/* Payment Method Images */}
            <div className="flex items-center mb-4">
                <Image src={visaImage} alt="Visa" width={50} height={30} className="mr-2" />
                <Image src={mastercardImage} alt="MasterCard" width={50} height={30} />
            </div>

            {/* Card Input Fields */}
            <div className="w-full md:w-1/2">
                <div className='w-full mb-4'>
                    <label className="block mb-1">Card Number</label>
                    <Input
                        type="number"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                        placeholder="Enter Card Number"
                        required
                        className="w-full h-12"
                    />
                </div>
                <div className='w-full  mb-4'>
                    <label className="block mb-1">Card holder&apos;s Name</label>
                    <Input
                        type="text"
                        value={cardInfo.name}
                        onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                        placeholder="Enter Card holder's Name"
                        required
                        className="w-full h-12"
                    />
                </div>
                <div className='w-full mb-4 flex'>
                    <ExpirySelect cardInfo={cardInfo} setCardInfo={setCardInfo} />
                </div>
            </div>
        </div>
    )
}

export default PaymentForm
