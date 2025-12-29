"use client"

import Link from "next/link"
import { Plane, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { logout } from "@/lib/store/slices/authSlice"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import { siteConfig } from "@/lib/config"
import Image from "next/image"
import Logo from "./Logo"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, isAdmin } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">

            {/* Text Logo   <div className="relative w-32 h-32"> */}
            <Logo />
            {/* <Image
                src="/logo3.png"
                alt="Logo"
                fill
              /> */}
            {/* </div> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/about">
              <Button variant="ghost" className="font-medium text-gray-700 hover:text-primary hover:bg-primary/5">
                About us
              </Button>
            </Link>
            <Link href="/support">
              <Button variant="ghost" className="font-medium text-gray-700 hover:text-primary hover:bg-primary/5">
                Contact
              </Button>
            </Link>
            <Link href="/destinations">
              <Button variant="ghost" className="font-medium text-gray-700 hover:text-primary hover:bg-primary/5">
                Destinations
              </Button>
            </Link>
            <Link href="/deals">
              <Button variant="ghost" className="font-medium text-gray-700 hover:text-primary hover:bg-primary/5">
                Deals
              </Button>
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-50">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium text-gray-900">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/my-bookings" className="cursor-pointer">
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard" className="cursor-pointer">
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="font-medium hover:bg-gray-50">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="font-medium shadow-sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-gray-50">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] px-4">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">

                    <div className="mt-12"><Logo small /></div>

                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <Link
                    href="/about"
                    className="text-lg font-medium text-gray-900 hover:text-primary py-2 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About us
                  </Link>
                  <Link
                    href="/support"
                    className="text-lg font-medium text-gray-900 hover:text-primary py-2 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact us
                  </Link>
                  <Link
                    href="/destinations"
                    className="text-lg font-medium text-gray-900 hover:text-primary py-2 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Destinations
                  </Link>
                  <Link
                    href="/deals"
                    className="text-lg font-medium text-gray-900 hover:text-primary py-2 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Deals
                  </Link>

                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    {isAuthenticated ? (
                      <>
                        <div className="flex items-center gap-2.5 py-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium text-gray-900">{user?.name}</span>
                        </div>
                        <Link
                          href="/my-bookings"
                          className="block text-gray-900 hover:text-primary py-2 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          My Bookings
                        </Link>
                        <Link
                          href="/profile"
                          className="block text-gray-900 hover:text-primary py-2 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Profile Settings
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin/dashboard"
                            className="block text-gray-900 hover:text-primary py-2 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <Button
                          variant="destructive"
                          className="w-full justify-start gap-2 mt-2"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="ghost" className="w-full font-medium">
                            Login
                          </Button>
                        </Link>
                        <Link href="/signup" onClick={() => setIsOpen(false)}>
                          <Button className="w-full font-medium">Sign Up</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
