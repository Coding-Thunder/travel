import { routings } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import ssl from "@/public/svg/ssl.svg";

const SslSecured = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg mt-4 transition duration-300 ease-in-out">
            <Image
                src={ssl}
                alt="SSL Secured"
                width={64}
                height={64}
                className="mb-4"
            />
            <p className="text-center text-gray-700 text-lg font-semibold mb-2">
                Your booking is SSL secured.
            </p>
            <p className="text-center text-gray-500 mb-4">
                This ensures that your personal information is encrypted and safe.
            </p>
            <button
                onClick={() => router.push(routings.terms_and_conditions)}
                className="text-blue-800 hover:underline focus:outline-none transition duration-300 ease-in-out text-sm font-medium"
            >
                Learn more about our privacy policy
            </button>
        </div>)
}

export default SslSecured