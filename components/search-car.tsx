"use client"

import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Search, Clock, MapPin, CalendarIcon } from "lucide-react"
import api from "@/lib/api/api-service"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { setLocations, setSearchCriteria } from "@/lib/store/slices/carSlice"

interface LocationResult {
  iataCode: string
  name: string
  address: {
    cityName: string
    countryCode: string
    countryName?: string
    postalCode?: string
  }
  geoCode: { latitude: number; longitude: number }
}

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

// Format it to ISO string without seconds/milliseconds if needed
const isoTomorrow = tomorrow.toISOString().split(".")[0]
const prefill = {
  startLocationCode: "JFK",
  endAddressLine: "Liberty Island",
  endCityName: "New York",
  endZipCode: "10004",
  endCountryCode: "US",
  endName: "Statue of Liberty",
  endGeoCode: "40.6892,-74.0445",
  transferType: "PRIVATE",
  startDateTime: isoTomorrow, // dynamically tomorrow
  passengers: 2,
}
export default function SearchCar() {
  const [pickupQuery, setPickupQuery] = useState(prefill.startLocationCode)
  const [dropQuery, setDropQuery] = useState(prefill.endName)
  const [passengers, setPassengers] = useState<number>(prefill.passengers)

  const [pickupResults, setPickupResults] = useState<LocationResult[]>([])
  const [dropResults, setDropResults] = useState<LocationResult[]>([])
  const [selectedPickup, setSelectedPickup] = useState<LocationResult | null>({
    iataCode: prefill.startLocationCode,
    name: prefill.startLocationCode,
    address: {
      cityName: "",
      countryCode: "",
      postalCode: "",
    },
    geoCode: { latitude: 0, longitude: 0 },
  })

  const [selectedDrop, setSelectedDrop] = useState<LocationResult | null>({
    iataCode: prefill.endName,
    name: prefill.endName,
    address: {
      cityName: prefill.endCityName,
      countryCode: prefill.endCountryCode,
      postalCode: prefill.endZipCode,
    },
    geoCode: {
      latitude: Number.parseFloat(prefill.endGeoCode.split(",")[0]),
      longitude: Number.parseFloat(prefill.endGeoCode.split(",")[1]),
    },
  })

  const [loadingPickup, setLoadingPickup] = useState(false)
  const [loadingDrop, setLoadingDrop] = useState(false)

  // Extra fields for Dropoff
  const [endAddressLine, setEndAddressLine] = useState(prefill.endAddressLine)
  const [endCityName, setEndCityName] = useState(prefill.endCityName)
  const [endZipCode, setEndZipCode] = useState(prefill.endZipCode)

  // Date + Time
  const [travelDate, setTravelDate] = useState<Date>(new Date(prefill.startDateTime))
  const [travelTime, setTravelTime] = useState<Date>(new Date(prefill.startDateTime))

  // Popover controls
  const [pickupOpen, setPickupOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)

  // Redux & Router
  const dispatch = useDispatch()
  const router = useRouter()
  const { toast } = useToast()

  // --- Fetch Pickup Results ---
  useEffect(() => {
    if (pickupQuery.length < 3) {
      setPickupResults([])
      return
    }
    const fetch = async () => {
      setLoadingPickup(true)
      try {
        const { data }: any = await api.searchLocations({ keyword: pickupQuery })
        const mapped = (data.data || []).map((item: any) => ({
          iataCode: item.iataCode || item.name,
          name: item.name,
          address: {
            cityName: item.address?.cityName || item.name,
            countryCode: item.address?.countryCode || "",
            postalCode: item.address?.postalCode || "",
          },
          geoCode: {
            latitude: item.geoCode?.latitude || 0,
            longitude: item.geoCode?.longitude || 0,
          },
        }))
        setPickupResults(mapped)
      } catch (err) {
        setPickupResults([])
      } finally {
        setLoadingPickup(false)
      }
    }
    fetch()
  }, [pickupQuery])

  // --- Fetch Dropoff Results ---
  useEffect(() => {
    if (dropQuery.length < 3) {
      setDropResults([])
      return
    }
    const fetch = async () => {
      setLoadingDrop(true)
      try {
        const { data }: any = await api.searchLocations({ keyword: dropQuery })
        const mapped = (data.data || []).map((item: any) => ({
          iataCode: item.iataCode || item.name,
          name: item.name,
          address: {
            cityName: item.address?.cityName || item.name,
            countryCode: item.address?.countryCode || "",
            postalCode: item.address?.postalCode || "",
          },
          geoCode: {
            latitude: item.geoCode?.latitude || 0,
            longitude: item.geoCode?.longitude || 0,
          },
        }))
        setDropResults(mapped)
      } catch (err) {
        setDropResults([])
      } finally {
        setLoadingDrop(false)
      }
    }
    fetch()
  }, [dropQuery])

  // --- Handle Final Payload ---
  const handleSearch = async () => {
    if (!selectedPickup) {
      toast({
        title: "Pickup required",
        description: "Please select a pickup location.",
        variant: "destructive",
      })
      return
    }
    if (!selectedDrop) {
      toast({
        title: "Dropoff required",
        description: "Please select a dropoff location.",
        variant: "destructive",
      })
      return
    }
    if (!endAddressLine.trim()) {
      toast({
        title: "Address required",
        description: "Please enter a street / address line.",
        variant: "destructive",
      })
      return
    }
    if (!endCityName.trim()) {
      toast({
        title: "City required",
        description: "Please enter a city name.",
        variant: "destructive",
      })
      return
    }
    if (!endZipCode.trim()) {
      toast({
        title: "Zip code required",
        description: "Please enter a zip code.",
        variant: "destructive",
      })
      return
    }
    if (!travelDate || travelDate < new Date()) {
      toast({
        title: "Invalid Date",
        description: "Please select a valid future date.",
        variant: "destructive",
      })
      return
    }

    const payload = {
      startLocationCode: selectedPickup.iataCode,
      endAddressLine,
      endCityName: endCityName || selectedDrop.address.cityName,
      endZipCode: endZipCode || selectedDrop.address.postalCode || "",
      endCountryCode: selectedDrop.address.countryCode,
      endName: selectedDrop.name,
      endGeoCode: `${selectedDrop.geoCode.latitude},${selectedDrop.geoCode.longitude}`,
      transferType: "PRIVATE",
      startDateTime: travelDate.toISOString(),
      passengers: 2,
      time: travelTime.toISOString(),
    }

    dispatch(setSearchCriteria(payload))
    dispatch(setLocations({
      startLocationCode: selectedPickup,
      dropLocationCode: selectedDrop,
    }))
    router.push("/cars")
  }

  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch()
        }}
        className="space-y-5"
      >
        {/* ROW 1 */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Pickup/Dropoff Group */}
          <div className="flex flex-col sm:flex-row gap-4 lg:flex-1 bg-gray-50 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors">
            <div className="flex-1">
              <Popover open={pickupOpen} onOpenChange={setPickupOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    className="w-full h-full bg-white hover:bg-gray-50 rounded-lg flex items-center gap-2.5 px-4 py-3 transition-colors text-left border border-gray-200 hover:border-gray-300"
                  >
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 mb-0.5">Pickup</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {selectedPickup ? selectedPickup.address.cityName : "Select"}
                      </p>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="bottom" align="start" className="w-80 p-3">
                  <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 mb-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={pickupQuery}
                      onChange={(e) => setPickupQuery(e.target.value)}
                      placeholder="Search pickup location..."
                      className="flex-1 text-sm"
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {loadingPickup ? (
                      <p className="text-sm text-gray-500 text-center py-4">Loading...</p>
                    ) : pickupResults.length > 0 ? (
                      pickupResults.map((loc) => (
                        <Button
                          key={loc.iataCode}
                          type="button"
                          onClick={() => {
                            setSelectedPickup(loc)
                            setPickupQuery("")
                            setPickupOpen(false)
                          }}
                          className="w-full bg-white text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <p className="font-semibold text-sm text-gray-900">{loc.name}</p>
                          <p className="text-xs text-gray-500">
                            {loc.address.cityName}, {loc.address.countryCode}
                          </p>
                        </Button>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">No results</p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-orange-500 p-2 rounded-full shadow-sm">
                <MapPin className="text-white text-xs" />
              </div>
            </div>

            <div className="flex-1">
              <Popover open={dropOpen} onOpenChange={setDropOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    className="w-full h-full bg-white hover:bg-gray-50 rounded-lg flex items-center gap-2.5 px-4 py-3 transition-colors text-left border border-gray-200 hover:border-gray-300"
                  >
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 mb-0.5">Dropoff</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {selectedDrop ? selectedDrop.address.cityName : "Select"}
                      </p>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="bottom" align="start" className="w-80 p-3">
                  <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 mb-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={dropQuery}
                      onChange={(e) => setDropQuery(e.target.value)}
                      placeholder="Search dropoff location..."
                      className="flex-1 text-sm"
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {loadingDrop ? (
                      <p className="text-sm text-gray-500 text-center py-4">Loading...</p>
                    ) : dropResults.length > 0 ? (
                      dropResults.map((loc) => (
                        <Button
                          key={loc.iataCode}
                          type="button"
                          onClick={() => {
                            setSelectedDrop(loc)
                            setDropQuery("")
                            setDropOpen(false)
                          }}
                          className="w-full bg-white text-left p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <p className="font-semibold text-sm text-gray-900">{loc.name}</p>
                          <p className="text-xs text-gray-500">
                            {loc.address.cityName}, {loc.address.countryCode}
                          </p>
                        </Button>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">No results</p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Date/Time Group */}
          <div className="flex gap-4 lg:w-auto">
            <div className="flex-1 lg:w-44">
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    className="w-full h-full bg-white hover:bg-gray-50 rounded-xl flex items-center gap-2.5 px-4 py-3 border border-gray-200 hover:border-gray-300 transition-colors text-left"
                  >
                    <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 mb-0.5">Date</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {travelDate ? format(travelDate, "MMM dd") : "Select"}
                      </p>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="bottom" align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={travelDate ?? undefined}
                    onSelect={(date) => {
                      if (!date) return
                      const newDate = new Date(date)
                      newDate.setHours(travelTime.getHours(), travelTime.getMinutes())
                      setTravelDate(newDate)
                      setDateOpen(false)
                    }}
                    disabled={{ before: new Date() }}
                    className="rounded-md border-0"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex-1 lg:w-36">
              <Popover open={timeOpen} onOpenChange={setTimeOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    className="w-full h-full bg-white hover:bg-gray-50 rounded-xl flex items-center gap-2.5 px-4 py-3 border border-gray-200 hover:border-gray-300 transition-colors text-left"
                  >
                    <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 mb-0.5">Time</p>
                      <p className="text-sm font-semibold text-gray-900">{format(travelTime, "hh:mm a")}</p>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="bottom" align="start" className="w-auto p-3">
                  <input
                    type="time"
                    value={format(travelTime, "HH:mm")}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":").map(Number)
                      const newTime = new Date(travelDate)
                      newTime.setHours(hours, minutes)
                      setTravelDate(newTime)
                      setTravelTime(newTime)
                      setTimeOpen(false)
                    }}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Address Details Group */}
          <div className="flex flex-col sm:flex-row gap-4 lg:flex-1">
            <Input
              placeholder="Street address"
              value={endAddressLine}
              onChange={(e) => setEndAddressLine(e.target.value)}
              className="flex-1 h-full border-gray-200 hover:border-gray-300 transition-colors"
            />
            <Input
              placeholder="City"
              value={endCityName}
              onChange={(e) => setEndCityName(e.target.value)}
              className="flex-1 h-full border-gray-200 hover:border-gray-300 transition-colors"
            />
            <Input
              placeholder="Zip"
              value={endZipCode}
              onChange={(e) => setEndZipCode(e.target.value)}
              className="sm:w-28 h-full border-gray-200 hover:border-gray-300 transition-colors"
            />
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="lg:w-auto lg:min-w-[160px] h-auto py-4 text-base font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Search Cars
          </Button>
        </div>
      </form>
    </div>
  )
}