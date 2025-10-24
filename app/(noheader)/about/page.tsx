"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Globe, Award } from "lucide-react";
import { siteConfig } from "@/lib/config";


export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              About {siteConfig.brand.name}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto text-pretty">
              Your trusted travel consultant partner for seamless travel experiences worldwide.
            </p>
          </div>
        </section>

        {[
          {
            title: "About Us",
            bg: "bg-white",
            content: (
              <>
                <p className="text-gray-700 text-lg leading-relaxed">
                  <strong>{siteConfig.brand.name}</strong> — a trading name of{" "}
                  {siteConfig.brand.name} — is a premier travel service provider
                  catering to every aspect of your journey. Through
                  customer-first service and transparent pricing, we’ve earned a
                  reputation as a trusted name in global travel.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Our passionate team ensures your travel experience is smooth,
                  secure, and tailored to perfection. Backed by years of
                  industry expertise, we’re committed to delivering world-class
                  travel solutions at the most competitive prices.
                </p>
              </>
            ),
          },
          {
            title: "Our Mission",
            bg: "bg-gray-50",
            content: (
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide personalized, budget-friendly, and high-quality travel
                services that inspire trust, build relationships, and deliver
                unforgettable experiences for every traveler.
              </p>
            ),
          },
          {
            title: "Our Vision",
            bg: "bg-white",
            content: (
              <p className="text-gray-700 text-lg leading-relaxed">
                We envision becoming a global leader in travel excellence —
                setting industry benchmarks for customer satisfaction,
                innovation, and service quality, one journey at a time.
              </p>
            ),
          },
          {
            title: "Core Values",
            bg: "bg-gray-50",
            content: (
              <p className="text-gray-700 text-lg leading-relaxed">
                Our foundation rests on trust, transparency, and commitment.
                Achieving the highest level of{" "}
                <strong>customer satisfaction</strong> is at the heart of
                everything we do — because every journey should be as memorable
                as the destination.
              </p>
            ),
          },
        ].map(({ title, content, bg }, i) => (
          <section
            key={i}
            className={`${bg} py-12 md:py-16 relative`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <h2 className="text-3xl font-semibold text-gray-900">{title}</h2>
              {content}
            </div>
          </section>
        ))}

        {/* Why Choose Us */}
        <section className="py-12 md:py-16 bg-white border-b border-gray-100 relative">
          <div className="absolute left-0 top-0 h-1 w-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-r-lg"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <h2 className="text-3xl font-semibold text-gray-900">
              Why Choose {siteConfig.brand.name}?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
              We understand that every traveler’s needs are unique. That’s why
              we deliver personalized travel services tailored to your comfort,
              schedule, and budget — so you can focus on creating memories while
              we handle the rest.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Shield className="h-8 w-8 text-blue-700" />,
                  title: "Secure Booking",
                  text: "Your data is protected with top-tier encryption and privacy standards.",
                },
                {
                  icon: <Users className="h-8 w-8 text-green-600" />,
                  title: "Dedicated Team",
                  text: "A passionate crew ensuring your journey is smooth and hassle-free.",
                },
                {
                  icon: <Globe className="h-8 w-8 text-purple-600" />,
                  title: "Global Reach",
                  text: "We connect you to thousands of destinations across continents.",
                },
                {
                  icon: <Award className="h-8 w-8 text-orange-600" />,
                  title: "Best Deals",
                  text: "Unbeatable pricing without compromising service quality.",
                },
              ].map(({ icon, title, text }, i) => (
                <Card
                  key={i}
                  className="shadow-sm border-gray-100 hover:shadow-md transition rounded-2xl"
                >
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-3 rounded-xl">{icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <h2 className="text-3xl font-semibold text-gray-900">Get in Touch</h2>
            <p className="text-gray-700 text-lg max-w-3xl">
              Have questions or need help planning your next trip? Our customer
              service team is available to assist you anytime.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div>
                <h4 className="font-semibold text-gray-900">Phone</h4>
                <p className="text-blue-700">{siteConfig.brand.phone}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p className="text-blue-700">{siteConfig.brand.email}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Location</h4>
                <p className="text-gray-700">{siteConfig.brand.location}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
