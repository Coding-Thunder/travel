"use client"
import type React from "react"
import { type FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import AirportSelector from "./Selectors/AirportSelector"
import DateSelectors from "./Selectors/DateSelectors"
import TravelerSelector from "./Selectors/TravelerSelector"
import { setSearchCriteria } from "@/lib/store/slices/flightslice"
import { setRoundTrip } from "@/lib/store/slices/tripSlice"
import type { RootState } from "@/lib/store/store"
import { Check, Loader } from "lucide-react"
import { FaArrowRightArrowLeft } from "react-icons/fa6"
import type { Airport, SearchCriteria } from "@/lib/types"
import "react-toastify/dist/ReactToastify.css"
import LoadingAbsolute from "@/components/Common/LoadingAbsolute"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

interface SearchFlightProps {
  withControllers?: boolean
}

const SearchFlights: React.FC<SearchFlightProps> = ({ withControllers = true }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { searchCriteria } = useSelector((state: RootState) => state.flights)
  const isRoundTrip = useSelector((state: RootState) => state.trip.isRoundTrip)

  const [loading, setLoading] = useState(false)
  const [departureDate, setDepartureDate] = useState<Date | null>(
    searchCriteria.departureDate ? new Date(searchCriteria.departureDate) : new Date(),
  )
  const [returnDate, setReturnDate] = useState<Date | null>(
    searchCriteria.returnDate ? new Date(searchCriteria.returnDate) : new Date(),
  )
  const [fromAirport, setFromAirport] = useState<Airport | null>(searchCriteria.fromAirport)
  const [toAirport, setToAirport] = useState<Airport | null>(searchCriteria.toAirport)
  const { toast } = useToast()

  const [adults, setAdults] = useState<number>(searchCriteria.adults)
  const [childrens, setChildrens] = useState<number>(searchCriteria.childrens)
  const [infants, setInfants] = useState<number>(searchCriteria.infants)
  const [selectedClass, setSelectedClass] = useState<string>(searchCriteria.selectedClass)
  const [fromAirportOpen, setFromAirportOpen] = useState(false)
  const [toAirportOpen, setToAirportOpen] = useState(false)

  const handleSelectFromAirport = (airport: Airport) => {
    setFromAirport(airport)
    setFromAirportOpen(false)
  }

  const handleSelectToAirport = (airport: Airport) => {
    setToAirport(airport)
    setToAirportOpen(false)
  }

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()

    if (!fromAirport || !toAirport || !departureDate || adults <= 0 || !selectedClass) {
      toast({
        title: "Error",
        description: "Please fill all the details.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const newSearchCriteria: SearchCriteria = {
        fromAirport,
        toAirport,
        departureDate: departureDate.toISOString(),
        returnDate: returnDate ? returnDate.toISOString() : "",
        adults,
        childrens,
        infants,
        selectedClass,
      }

      dispatch(setSearchCriteria(newSearchCriteria))
      router.push(`/available-flights`)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return !loading ? (
    <div className="w-full">
      {withControllers && (
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 mb-6 sm:mb-8">
          {["Round Trip", "One Way"].map((tripType, index) => (
            <button
              key={tripType}
              type="button"
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => dispatch(setRoundTrip(index === 0))}
            >
              <div
                className={`rounded-full border-2 p-0.5 transition-all duration-200 ${(index === 0 && isRoundTrip) || (index === 1 && !isRoundTrip)
                  ? "border-primary bg-primary shadow-sm"
                  : "border-gray-300 group-hover:border-gray-400"
                  }`}
              >
                <Check
                  size={14}
                  className={`${(index === 0 && isRoundTrip) || (index === 1 && !isRoundTrip)
                    ? "text-white"
                    : "text-transparent"
                    }`}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{tripType}</span>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSearch} className="space-y-4 sm:space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
          {/* From/To Airports */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1 bg-gray-50 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors">
            <div className="flex-1 min-w-[150px]">
              <AirportSelector
                label="From"
                value={fromAirport ? `${fromAirport.cityName}` : "COUNTRY, CITY, AIRPORT"}
                onSelectAirport={handleSelectFromAirport}
                setIsOpen={setFromAirportOpen}
              />
            </div>

            <div className="flex items-center justify-center sm:w-auto">
              <div className="bg-primary p-2.5 rounded-full shadow-sm">
                <FaArrowRightArrowLeft className="text-white text-sm rotate-90 sm:rotate-0" />
              </div>
            </div>

            <div className="flex-1 min-w-[150px]">
              <AirportSelector
                label="To"
                value={toAirport ? `${toAirport.cityName}` : "COUNTRY, CITY, AIRPORT"}
                onSelectAirport={handleSelectToAirport}
                setIsOpen={setToAirportOpen}
              />
            </div>
          </div>

          {/* Date Selectors */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1 bg-gray-50 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors">
            <div className="flex-1 min-w-[150px]">
              <DateSelectors label="Depart" date={departureDate} setDate={setDepartureDate} />
            </div>
            {isRoundTrip && (
              <div className="flex-1 min-w-[150px]">
                <DateSelectors label="Return" date={returnDate} setDate={setReturnDate} />
              </div>
            )}
          </div>

          {/* Travelers */}
          <div className="flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors lg:w-auto w-full sm:w-auto">
            <TravelerSelector
              label="Travelers"
              adults={adults}
              setAdults={setAdults}
              childrens={childrens}
              setChildrens={setChildrens}
              infants={infants}
              setInfants={setInfants}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
            />
          </div>
        </div>

        {withControllers && (
          <div className="flex justify-center lg:justify-start">
            <Button
              type="submit"
              className="w-full sm:w-auto lg:min-w-[220px] h-14 text-base font-semibold shadow-md hover:shadow-lg transition-all"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : "Search Flights"}
            </Button>
          </div>
        )}
      </form>
    </div>
  ) : (
    <LoadingAbsolute />
  )
}

export default SearchFlights
