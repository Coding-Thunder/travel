"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface DateSelectorsProps {
  label: string
  date: Date | null
  setDate: (date: Date | null) => void
}

export default function DateSelectors({ label, date, setDate }: DateSelectorsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full bg-white hover:bg-orange-50 rounded-lg flex items-center px-4 py-3 cursor-pointer border transition-colors">
          <CalendarIcon size={22} className="text-gray-500" />
          <div className="ml-3 flex flex-col items-start overflow-hidden">
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-900">{date ? format(date, "PPP") : "Select date"}</p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" avoidCollisions={false} className="w-auto p-0 bg-white">
        <Calendar
          mode="single"
          selected={date ?? undefined}
          onSelect={(selectedDate) => setDate(selectedDate || null)}
          disabled={{ before: new Date() }}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  )
}
