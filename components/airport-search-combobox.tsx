"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plane } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import apiService from "@/lib/api/api-service"
import type { Airport } from "@/lib/api/interfaces"

interface AirportSearchComboboxProps {
  value: string
  onSelect: (value: string) => void
  placeholder?: string
}

export function AirportSearchCombobox({
  value,
  onSelect,
  placeholder = "Select airport...",
}: AirportSearchComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [airports, setAirports] = React.useState<Airport[]>([])
  const [loading, setLoading] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const selectedAirport = airports.find((airport) => airport.iataCode === value)

  const handleSearch = React.useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setAirports([])
      return
    }

    setLoading(true)
    try {
      const data = await apiService.fetchAirports(query)
      setAirports(data.data || [])
    } catch (error) {
      console.error("Error searching airports:", error)
      setAirports([])
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, handleSearch])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent"
        >
          {selectedAirport ? (
            <span className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              {selectedAirport.iataCode} - {selectedAirport.name}
            </span>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search airports..." value={searchQuery} onValueChange={setSearchQuery} />
          <CommandList>
            {loading ? (
              <CommandEmpty>Searching...</CommandEmpty>
            ) : airports.length === 0 ? (
              <CommandEmpty>
                {searchQuery.length < 2 ? "Type to search airports..." : "No airports found."}
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {airports.map((airport) => (
                  <CommandItem
                    key={airport.iataCode}
                    value={airport.iataCode}
                    onSelect={(currentValue) => {
                      onSelect(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === airport.iataCode ? "opacity-100" : "opacity-0")} />
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {airport.iataCode} - {airport.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {airport.address.cityName}, {airport.address.countryName}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
