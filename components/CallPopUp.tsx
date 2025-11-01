"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import callsPerson from "@/public/call-person.jpeg";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

const CallPopUp: React.FC = () => {
    const [opened, setOpen] = useState<boolean>(false);

    // Generate dynamic promo code
    const currentYear = new Date().getFullYear();
    const promoCode = `DEAL${currentYear}`;

    return (
        <div
            className={`z-50 shadow-2xl border overflow-hidden flex items-center justify-start gap-4 rounded-l-lg fixed bottom-[40px] right-0 w-[95vw] ${opened ? "translate-x-none" : "translate-x-[90%] md:translate-x-[98%]"
                } transition-all duration-1000 h-[100px] bg-white`}
        >
            <div
                onClick={() => setOpen(!opened)}
                className="bg-orange-500 text-white w-fit h-full items-center justify-center flex cursor-pointer px-2"
            >
                {opened ? <ChevronRight /> : <ChevronLeft />}
            </div>
            <div className="flex justify-start items-center gap-2 text-orange-800">
                <Image
                    src={callsPerson.src}
                    alt="Calls Person"
                    className="rounded-full"
                    width={35}
                    height={35}
                />
                <div className="flex flex-col items-start justify-center flex-wrap">
                    <p className="font-bold">Phone-Only Deal!</p>
                    <p className="text-sm font-semibold">
                        Use promo code{" "}
                        <span className="bg-orange-500 text-white px-2 p-1 rounded-lg">{promoCode}</span> and
                        save. Call us 24/7
                        <span className="text-orange-500 cursor-pointer">
                            <a href={`tel:${siteConfig.brand.phone}`} className="w-fit h-fit">
                                {" "}
                                {siteConfig.brand.phoneLink}
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CallPopUp;
