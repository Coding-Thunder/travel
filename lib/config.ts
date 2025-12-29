export const siteConfig = {
  brand: {
    name: "Rental Confirmation.com",
    domain: "rentalconfirmation.com",
    email: "support@rentalconfirmation.com",
    phone: "+1-(732)-576-6602",
    phoneLink: "+17325766602",
    location: "Wyoming, United States",
    poweredBy: "Amadeus",
  },
  theme: {
    primary: "blue-800",
    background: "white",
  },
  admin: {
    email: "admin@rc.com",
    password: "221457",
  },
  navigation: {
    main: [
      { name: "Home", href: "/" },
      { name: "Flights", href: "/available-flights" },
      { name: "Cars", href: "/cars" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/support" },
    ],
    footer: {
      help: [
        { name: "Cancellation & Refund", href: "/cancelation-policy" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms-and-conditions" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/support" },
      ],
    },
  },
  social: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    linkedin: "#",
  },
  api: {
    baseUrl: process.env.NODE_ENV === "production" ? "https://api.rentalconfirmation.com" : "https://api.rentalconfirmation.com",
  },
  productionServerUrl: "https://api.rentalconfirmation.com",
  localServerUrl: "http://localhost:3002",
}

export const config = siteConfig
