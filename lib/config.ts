export const siteConfig = {
  brand: {
    name: "Autrova +1-888-383-7558",
    domain: "autrova.com",
    email: "confirmation@autrova.com",
    phone: "+1-888-383-7558",
    phoneLink: "+8883837558",
    location: "1309 Coffeen Avenue STE 1200 Shreridan, Wyoming 82801 United States",
    poweredBy: "Amadeus",
  },
  theme: {
    primary: "blue-800",
    background: "white",
  },
  admin: {
    email: "test@test.com",
    password: "1234",
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
    baseUrl: process.env.NODE_ENV === "production" ? "https://api.autrova.com" : "https://api.autrova.com",
  },
  productionServerUrl: "https://api.autrova.com",
  localServerUrl: "http://localhost:3002",
  prodLocalServerUrl: "http://127.0.0.1:3002",

}

export const config = siteConfig
