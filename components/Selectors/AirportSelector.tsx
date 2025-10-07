"use client"

import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search } from "lucide-react"
import { IoLocation } from "react-icons/io5"
import api from "@/lib/api/api-service"
import type { Airport } from "@/lib/types"

interface AirportSelectorProps {
  label: string
  value: string
  onSelectAirport: (airport: Airport) => void
  setIsOpen: (open: boolean) => void
}

export default function AirportSelector({ label, value, onSelectAirport, setIsOpen }: AirportSelectorProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Airport[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setIsOpen(open)
  }, [open, setIsOpen])

  useEffect(() => {
    if (query.length < 3) {
      setResults([])
      return
    }

    const fetchAirports = async () => {
      setLoading(true)
      try {
        const { data } = await api.fetchAirports(query)
        const mapped = (data || []).map((item: any) => ({
          iataCode: item.iataCode,
          name: item.name,
          cityName: item.address?.cityName || item.name,
          countryCode: item.address?.countryCode || "",
          countryName: item.address?.countryName || "",
        }))
        console.log(mapped, "mappped")
        setResults(mapped)
      } catch (err) {
        console.error("[v0] Error fetching airports:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAirports()
  }, [query])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="w-full bg-white hover:bg-blue-50 rounded-lg flex items-center px-4 py-3 cursor-pointer border transition-colors"
          onClick={() => setOpen(true)}
        >
          <IoLocation size={22} className="text-gray-500" />
          <div className="ml-3 flex flex-col items-start overflow-hidden">
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-900 truncate w-full">{value}</p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        avoidCollisions={false}
        className="bg-white p-3 rounded-lg shadow-xl w-80"
      >
        <div className="flex items-center border border-gray-300 rounded-md px-3 mb-3 gap-2">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${label.toLowerCase()}...`}
            className="w-full py-2 outline-none border-none text-sm"
          />
        </div>
        <div className="max-h-64 overflow-y-auto">
          {loading ? (
            <p className="text-gray-500 text-center text-sm py-4">Loading...</p>
          ) : results.length > 0 ? (
            results.map((airport) => (
              <div
                key={airport.iataCode}
                onClick={() => {
                  onSelectAirport(airport)
                  setQuery("")
                  setOpen(false)
                }}
                className="cursor-pointer p-3 hover:bg-blue-50 rounded-md transition-colors"
              >
                <p className="font-semibold text-sm">{airport.name}</p>
                <p className="text-xs text-gray-600">
                  {airport.cityName}, {airport.countryCode} ({airport.iataCode})
                </p>
              </div>
            ))
          ) : query.length >= 2 ? (
            <p className="text-gray-500 text-sm text-center py-4">No airports found</p>
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">Type at least 2 characters to search</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
