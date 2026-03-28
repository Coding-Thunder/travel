"use client"

import Link from "next/link"
import { User, LogOut, Menu } from "lucide-react"
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import Image from "next/image"
import { Logo } from "./Common/Logo"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, isAdmin } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
    setIsOpen(false)
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/support", label: "Contact" },
    // { href: "/destinations", label: "Destinations" },
    { href: "/deals", label: "Deals" },
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Sign Up" },
  ]


  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className="font-medium text-gray-700 hover:text-primary hover:bg-primary/5"
                >
                  {link.label}
                </Button>
              </Link>
            ))}

          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/my-bookings">My Bookings</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile Settings</Link>
                  </DropdownMenuItem>

                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[400px] px-4">
                <SheetHeader>
                  <SheetTitle>
                    <div className="relative w-28 h-28">
                      <Image src="/logo3.png" alt="Logo" fill />
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 mt-6">
                  
                  {/* Nav Links */}
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleNavClick}
                      className="text-lg font-medium text-gray-900 hover:text-primary py-2"
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Auth Section */}
                  <div className="pt-4 border-t space-y-3">
                    {isAuthenticated && (
                      <>
                        <div className="flex items-center gap-2 py-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{user?.name}</span>
                        </div>

                        <Link
                          href="/my-bookings"
                          onClick={handleNavClick}
                          className="block py-2"
                        >
                          My Bookings
                        </Link>

                        <Link
                          href="/profile"
                          onClick={handleNavClick}
                          className="block py-2"
                        >
                          Profile Settings
                        </Link>

                        {isAdmin && (
                          <Link
                            href="/admin/dashboard"
                            onClick={handleNavClick}
                            className="block py-2"
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