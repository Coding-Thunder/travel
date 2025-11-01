"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Users, Plus, Minus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TravelerSelectorProps {
  label: string
  adults: number
  setAdults: (value: number) => void
  childrens: number
  setChildrens: (value: number) => void
  infants: number
  setInfants: (value: number) => void
  selectedClass: string
  setSelectedClass: (value: string) => void
}

export default function TravelerSelector({
  label,
  adults,
  setAdults,
  childrens,
  setChildrens,
  infants,
  setInfants,
  selectedClass,
  setSelectedClass,
}: TravelerSelectorProps) {
  const totalTravelers = adults + childrens + infants

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full bg-white hover:bg-orange-50 rounded-lg flex items-center px-4 py-3 cursor-pointer border transition-colors">
          <Users size={22} className="text-gray-500" />
          <div className="ml-3 flex flex-col items-start overflow-hidden">
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-900">
              {totalTravelers} {totalTravelers === 1 ? "Traveler" : "Travelers"}, {selectedClass}
            </p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" avoidCollisions={false} className="w-80 p-4 bg-white">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Adults</p>
              <p className="text-xs text-gray-500">12+ years</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                disabled={adults <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{adults}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setAdults(Math.min(9, adults + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Children</p>
              <p className="text-xs text-gray-500">2-11 years</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setChildrens(Math.max(0, childrens - 1))}
                disabled={childrens <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{childrens}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setChildrens(Math.min(9, childrens + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Infants</p>
              <p className="text-xs text-gray-500">Under 2 years</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setInfants(Math.max(0, infants - 1))}
                disabled={infants <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{infants}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => setInfants(Math.min(9, infants + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="font-medium text-sm mb-2">Class</p>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ECONOMY">Economy</SelectItem>
                <SelectItem value="PREMIUM_ECONOMY">Premium Economy</SelectItem>
                <SelectItem value="BUSINESS">Business</SelectItem>
                <SelectItem value="FIRST">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
