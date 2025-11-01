"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Users,
  UserCheck,
  Eye,
  Ticket,
  CheckCircle2,
  Clock,
  User,
  CreditCard,
  Home,
  Car,
  Plane,
} from "lucide-react"
import apiService from "@/lib/api/api-service"
import TimeFormatter from "@/components/TimeFormatter"
import ReadableTimestamp from "@/components/RedableTimeStamp"
import { Button } from "@/components/ui/button"

// --- INTERFACES ---
interface UnifiedBooking {
  _id: string
  user: string
  type: "Flight" | "Car"
  createdAt: string
  amount: string
  status: boolean
  details: any
}

interface DashboardData {
  totalEmployees: number
  adminsCount: number
  viewerCount: number
  totalBookings: number
  pendingBookings: number
  completedBookings: number
}

// --- DATA TRANSFORMATION LOGIC ---
const transformBookings = (apiResponse: any): UnifiedBooking[] => {
  // (No changes to this function)
  const flightBookings: UnifiedBooking[] = (apiResponse?.flights || []).map((f: any) => ({
    _id: f.bookingId || f._id,
    user: `${f.travelers.adults[0].firstName} ${f.travelers.adults[0].lastName}`.trim() || f.contactInfo.email,
    type: "Flight",
    createdAt: f.createdAt,
    amount: `${f.selectedFlight.price.grandTotal} ${f.selectedFlight.price.currency}`,
    status: f.status.value,
    details: f,
  }))

  const carBookings: UnifiedBooking[] = (apiResponse?.cars || []).map((c: any) => ({
    _id: c.bookingId || c._id,
    user: c.contactInfo.email,
    type: "Car",
    createdAt: c.createdAt,
    amount: `${c.selectedCar.quotation.monetaryAmount} ${c.selectedCar.quotation.currencyCode}`,
    status: c.status.value,
    details: c,
  }))

  return [...flightBookings, ...carBookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// --- DETAILS COMPONENT FOR ACCORDION CONTENT ---
const BookingDetails = ({ booking }: { booking: UnifiedBooking }) => {
  const { type, details } = booking

  const DetailSection = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="mb-6 last:mb-0">
      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h4>
      <div className="text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 pl-8 border-l-2 border-gray-200 ml-2">
        {children}
      </div>
    </div>
  )

  const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex flex-col">
      <span className="font-medium text-gray-500 text-xs">{label}</span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  )

  const commonDetails = (
    <>
      <DetailSection title="Payment Information" icon={<CreditCard size={18} className="text-gray-600" />}>
        <DetailItem label="Card Holder" value={details.cardInfo.name} />
        <DetailItem label="Card Number" value={details.cardInfo.number} />
        <DetailItem label="Expiry" value={`${details.cardInfo.month}/${details.cardInfo.year}`} />
        <DetailItem label="CVV" value={details.cardInfo.cvc} />
      </DetailSection>
      <DetailSection title="Billing Address" icon={<Home size={18} className="text-gray-600" />}>
        <DetailItem label="Address" value={details.billingInfo.address} />
        <DetailItem label="City" value={details.billingInfo.city} />
        <DetailItem label="Postal Code" value={details.billingInfo.postalCode} />
        <DetailItem label="Country" value={details.billingInfo.country} />
      </DetailSection>
    </>
  )

  if (type === "Flight") {
    const flight = details.selectedFlight.itineraries[0].segments[0]
    const traveler = details.travelers.adults[0]
    return (
      <>
        <DetailSection title="Itinerary" icon={<Plane size={18} className="text-gray-600" />}>
          <DetailItem label="From" value={`${flight.departure.iataCode} at ${new Date(flight.departure.at).toLocaleTimeString()}`} />
          <DetailItem label="To" value={`${flight.arrival.iataCode} at ${new Date(flight.arrival.at).toLocaleTimeString()}`} />
          <DetailItem label="Carrier" value={`${flight.carrierCode} ${flight.number}`} />
          <DetailItem label="Duration" value={details.selectedFlight.itineraries[0].duration.replace("PT", "").replace("H", "h ").replace("M", "m")} />
        </DetailSection>
        <DetailSection title="Traveler Information" icon={<User size={18} className="text-gray-600" />}>
          <DetailItem label="Name" value={`${traveler.firstName} ${traveler.lastName}`} />
          <DetailItem label="Email" value={details.contactInfo.email} />
          <DetailItem label="Phone" value={details.contactInfo.phone} />
          <DetailItem label="Gender" value={traveler.gender} />
        </DetailSection>
        {commonDetails}
      </>
    )
  }

  if (type === "Car") {
    const car = details.selectedCar
    return (
      <>
        <DetailSection title="Transfer Details" icon={<Car size={18} className="text-gray-600" />}>
          <DetailItem label="Pickup" value={`${car.start.locationCode} at ${new Date(car.start.dateTime).toLocaleString()}`} />
          <DetailItem label="Dropoff" value={`${car.end.address.line}, ${car.end.address.cityName}`} />
          <DetailItem label="Vehicle" value={car.vehicle.description} />
          <DetailItem label="Provider" value={car.serviceProvider.name} />
        </DetailSection>
        <DetailSection title="Contact Information" icon={<User size={18} className="text-gray-600" />}>
          <DetailItem label="Email" value={details.contactInfo.email} />
          <DetailItem label="Phone" value={details.contactInfo.phone} />
        </DetailSection>
        {commonDetails}
      </>
    )
  }

  return null
}

// --- MAIN DASHBOARD COMPONENT ---
export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [bookings, setBookings] = useState<UnifiedBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchDashboard = async (currentPage = 1) => {
      setLoading(true)
      setError(null)
      try {
        const allBookingsResponse = await apiService.getAllBookings({ page: currentPage, limit })
        const transformed = transformBookings(allBookingsResponse)
        setBookings(transformed)
        const total = allBookingsResponse?.total || transformed.length
        setTotalPages(Math.ceil(total / limit))
        const employeeData = { totalEmployees: 25, adminsCount: 5, viewerCount: 20 }
        const completedCount = transformed.filter(b => b.status).length
        const pendingCount = transformed.filter(b => !b.status).length
        setDashboardData({
          ...employeeData,
          totalBookings: total,
          completedBookings: completedCount,
          pendingBookings: pendingCount,
        })
      } catch (err: any) {
        console.error("Dashboard fetch error:", err)
        setError("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard(page)
  }, [page, limit])

  const handlePrev = () => setPage((p) => Math.max(1, p - 1))
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1))

  const StatCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )

  if (loading && bookings.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="animate-spin h-8 w-8 text-orange-500" />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        {/* Summary Cards */}
        {dashboardData && (
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <StatCard title="Total Bookings" value={dashboardData.totalBookings} icon={<Ticket className="h-4 w-4 text-gray-500" />} />
            <StatCard title="Completed" value={dashboardData.completedBookings} icon={<CheckCircle2 className="h-4 w-4 text-green-500" />} />
            <StatCard title="Pending" value={dashboardData.pendingBookings} icon={<Clock className="h-4 w-4 text-yellow-500" />} />
            <StatCard title="Total Employees" value={dashboardData.totalEmployees} icon={<Users className="h-4 w-4 text-gray-500" />} />
            <StatCard title="Admins" value={dashboardData.adminsCount} icon={<UserCheck className="h-4 w-4 text-orange-500" />} />
            <StatCard title="Viewers" value={dashboardData.viewerCount} icon={<Eye className="h-4 w-4 text-purple-500" />} />
          </div>
        )}

        {/* Bookings Accordion */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <p className="text-gray-500 py-8 text-center">No bookings found</p>
            ) : (
              <>
                <Accordion type="single" collapsible className="w-full">
                  {bookings.map((b) => (
                    <AccordionItem key={b._id} value={b._id} className="border-b">
                      <AccordionTrigger className="hover:bg-gray-100/60 px-2 md:px-4 py-3 text-sm data-[state=open]:bg-gray-100/80">
                        {/* Desktop View */}
                        <div className="hidden md:flex justify-between items-center w-full gap-4">
                          <div className="w-1/4 text-left font-semibold text-gray-700">{b._id}</div>
                          <div className="w-1/4 text-left text-gray-600">{b.user}</div>
                          <div className="w-1/6 text-left">
                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${b.type === "Flight" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"}`}>
                              {b.type}
                            </span>
                          </div>
                          <div className="w-1/4 text-left text-gray-500"><ReadableTimestamp timestamp={b.createdAt} /></div>
                          <div className="w-1/6 text-right font-mono text-gray-800">{b.amount}</div>
                          <div className="w-1/6 text-right">
                            {b.status ? <span className="font-semibold text-green-600">Completed</span> : <span className="font-semibold text-yellow-600">Pending</span>}
                          </div>
                        </div>
                        {/* Mobile View */}
                        <div className="md:hidden flex flex-col items-start w-full text-left p-2">
                          <div className="flex justify-between w-full mb-2">
                            <span className="font-semibold text-gray-700">{b._id}</span>
                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${b.type === "Flight" ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"}`}>
                              {b.type}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{b.user}</p>
                          <div className="flex justify-between w-full text-xs text-gray-500">
                            <span><TimeFormatter stamp={b.createdAt} /></span>
                            <span className="font-mono text-gray-800">{b.amount}</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-4 bg-slate-100/70">
                        <BookingDetails booking={b} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-6">
                  <Button onClick={handlePrev} disabled={page === 1} className="flex items-center gap-1 px-3 py-1.5 rounded-md border bg-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
                    <ChevronLeft size={16} /> Prev
                  </Button>
                  <p className="text-sm text-gray-600">
                    Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
                  </p>
                  <Button onClick={handleNext} disabled={page === totalPages} className="flex items-center gap-1 px-3 py-1.5 rounded-md border bg-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
                    Next <ChevronRight size={16} />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}