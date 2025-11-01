"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock password reset - in production, this would call an API
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          {!submitted ? (
            <>
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4">
                  <Mail className="h-8 w-8 text-orange-800" />
                </div>
                <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
                <p className="text-gray-600 mt-2">No worries, we'll send you reset instructions</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-orange-800 hover:bg-orange-700 text-white h-11">
                    Send Reset Link
                  </Button>

                  <Link href="/login">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Login
                    </Button>
                  </Link>
                </form>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
                <p className="text-gray-600 mt-2">
                  We've sent password reset instructions to <span className="font-medium text-gray-900">{email}</span>
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 text-center">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" className="w-full">
                    Try Another Email
                  </Button>
                  <Link href="/login">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </main>
      
    </div>
  )
}
