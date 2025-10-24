// "use client"
// import { useState, useEffect } from "react"
// import { Plane, Car, Building2 } from "lucide-react"
// import { Card } from "@/components/ui/card"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import SearchFlights from "@/components/search-flights"
// import SearchCar from "@/components/search-car"
// import SearchHotels from "./search-hotels"
// import { cn } from "@/lib/utils"

// const heroImages = [
//   "/tropical-sunset-palms.png",
//   "/snow-capped-mountains.png",
//   "/city-night-skyline.png",
//   "/desert-sand-dunes.png",
// ]

// export function HeroSection() {
//   const [currentImage, setCurrentImage] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % heroImages.length)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div className="relative min-h-[680px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Background Image Carousel */}
//       <div className="absolute inset-0">
//         {heroImages.map((img, i) => (
//           <div
//             key={img}
//             className={`absolute inset-0 transition-opacity duration-1000 ${i === currentImage ? "opacity-100" : "opacity-0"
//               }`}
//           >
//             <img
//               src={img || "/placeholder.svg"}
//               alt="Travel destination"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
//           </div>
//         ))}
//       </div>

//       {/* Foreground Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 drop-shadow-2xl">
//             Find Your Next Adventure
//           </h1>
//           <p className="text-xl md:text-2xl text-white/95 drop-shadow-lg font-medium">
//             Compare and book flights, hotels, and car rentals
//           </p>
//         </div>

//         <Tabs defaultValue="flights" className="w-full">
//           <TabsList className="flex justify-center bg-white rounded-xl shadow-md p-2 gap-3 mb-[-1px]">
//             {[
//               { value: "flights", label: "Flights", icon: Plane },
//               { value: "hotels", label: "Hotels", icon: Building2 },
//               { value: "cars", label: "Cars", icon: Car },
//             ].map(({ value, label, icon: Icon }) => (
//               <TabsTrigger
//                 key={value}
//                 value={value}
//                 className={cn(
//                   "flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-gray-700 transition-all duration-300",
//                   "hover:bg-blue-50 hover:text-blue-700",
//                   "data-[state=active]:bg-blue-800 data-[state=active]:text-white data-[state=active]:shadow-md"
//                 )}
//               >
//                 <Icon className="h-5 w-5" />
//                 {label}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           <Card className="p-8 shadow-2xl bg-white rounded-xl mt-0 border border-gray-100">
//             <TabsContent value="flights">
//               <SearchFlights />
//             </TabsContent>
//             <TabsContent value="hotels">
//               <SearchHotels />
//             </TabsContent>
//             <TabsContent value="cars">
//               <SearchCar />
//             </TabsContent>
//           </Card>
//         </Tabs>


//         {/* Image Indicators */}
//         <div className="flex justify-center gap-2.5 mt-10">
//           {heroImages.map((_, i) => (
//             <Button
//               key={i}
//               onClick={() => setCurrentImage(i)}
//               className={`h-2 rounded-full transition-all ${i === currentImage
//                 ? "w-10 bg-white shadow-lg"
//                 : "w-2 bg-white/60 hover:bg-white/80"
//                 }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"
import { useState, useEffect } from "react"
import { Plane, Car, Building2, ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import SearchFlights from "@/components/search-flights"
import SearchCar from "@/components/search-car"
import SearchHotels from "./search-hotels"

const heroImages = [
  "/tropical-sunset-palms.png",
  "/snow-capped-mountains.png",
  "/city-night-skyline.png",
  "/desert-sand-dunes.png",
]

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [activeTab, setActiveTab] = useState<"flights" | "hotels" | "cars">("flights")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // const dropdownOptions = [
  //   { value: "flights", label: "Flights", icon: Plane },
  //   { value: "hotels", label: "Hotels", icon: Building2 },
  //   { value: "cars", label: "Cars", icon: Car },
  // ]

  return (
    <div className="relative min-h-[680px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((img, i) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === currentImage ? "opacity-100" : "opacity-0"
              }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
        ))}
      </div>

      {/* Foreground */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 drop-shadow-2xl">
            Find Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl text-white/95 drop-shadow-lg font-medium">
            Call your agent now
          </p>
        </div>

        {/* Dropdown Selector */}
        {/* <div className="flex w-fit mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white/95 text-blue-900 border border-blue-200 hover:border-blue-400 hover:bg-white shadow-lg rounded-full px-6 py-3 text-lg font-semibold transition-all backdrop-blur-sm focus:outline-none focus:ring-0"
              >
                {(() => {
                  const active = dropdownOptions.find((o) => o.value === activeTab)
                  const Icon = active?.icon
                  return (
                    <>
                      {Icon && <Icon className="h-5 w-5 text-blue-700" />}
                      <span>{active?.label}</span>
                      <ChevronDown className="h-4 w-4 text-blue-700/80" />
                    </>
                  )
                })()}
              </Button>
            </DropdownMenuTrigger>


            <DropdownMenuContent
              align="start"
              className="min-w-[200px] mt-2 rounded-2xl bg-white/95 shadow-xl border border-blue-100 backdrop-blur-md p-1.5"
            >
              {dropdownOptions.map(({ value, label, icon: Icon }) => (
                <DropdownMenuItem
                  key={value}
                  onClick={() => setActiveTab(value as any)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium cursor-pointer transition-all ${activeTab === value
                    ? "bg-blue-50 text-blue-800"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-800"
                    }`}
                >
                  <Icon
                    className={`h-5 w-5 ${activeTab === value ? "text-blue-700" : "text-gray-500"
                      }`}
                  />
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

        </div> */}

        {/* Search Boxes */}
        <Card className="p-8 shadow-2xl bg-white rounded-xl border-0">
          {activeTab === "flights" && <SearchFlights />}
          {activeTab === "hotels" && <SearchHotels />}
          {activeTab === "cars" && <SearchCar />}
        </Card>

        {/* Image Indicators */}
        <div className="flex justify-center gap-2.5 mt-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`h-2 rounded-full transition-all ${i === currentImage ? "w-10 bg-white shadow-lg" : "w-2 bg-white/60 hover:bg-white/80"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

