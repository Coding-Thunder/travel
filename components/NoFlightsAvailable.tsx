// app/no-flights/page.tsx
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';

const NoFlightsAvailable = () => {

    const router = useRouter()
    return (
        <div className="flex items-center justify-center mt-32 w-fit mx-auto bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h1 className="text-2xl font-bold text-gray-700">Sorry, no flights available</h1>
                <p className="mt-4 text-gray-500">
                    We couldn&apos;t find any flights matching your search criteria. Please try adjusting your filters.
                </p>
                <Button
                    className="mt-6 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-800"
                    onClick={() => router.back()} // Go back to the previous page
                >
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default NoFlightsAvailable;
