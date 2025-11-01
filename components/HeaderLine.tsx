"use client";

import { PhoneCall, Tag } from "lucide-react";
import { motion } from "framer-motion";
import CallNow from "./CallNow";
import { siteConfig } from "@/lib/config";
import { Button } from "./ui/button";

const HeaderLine = () => {
    return (
        <section className="bg-gradient-to-r from-orange-800 via-orange-600 to-orange-500 py-5">
            <div className="max-w-fit mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-white">
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3"
                >
                    <Tag className="text-2xl flex-shrink-0 text-yellow-300 drop-shadow" />
                    <p className="text-lg font-medium">
                        <span className="font-semibold">Save up to</span>{" "}
                        <span className="text-yellow-300 font-bold animate-pulse">30% off</span>{" "}
                        your next trip
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    <a href={`tel:${siteConfig.brand.phoneLink}`}>
                        <Button className="bg-white hover:bg-white text-orange-800 cursor-pointer"><PhoneCall /> Call Now"</Button>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default HeaderLine;
