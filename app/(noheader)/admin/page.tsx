"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/store/hooks"
import { login as loginAction } from "@/lib/store/slices/authSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Lock, Mail, Loader2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { toast } = useToast()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Please fill in all fields")
            return
        }

        setLoading(true)
        setTimeout(() => {
            if (email === "vinaymaheshwari35@gmail.com" && password === "2122") {
                localStorage.setItem("token", "admin-static-token")

                dispatch(
                    loginAction({
                        email,
                        name: "Admin",
                        isAdmin: true,
                    })
                )

                toast({
                    title: "Admin Login successful",
                    description: "Welcome back, Admin!",
                })

                router.push("/admin/dashboard")
            } else {
                setError("Invalid admin credentials")
            }
            setLoading(false)
        }, 800)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 bg-gray-50 flex items-center justify-center px-4 py-12">
                <Card className="w-full max-w-md border-orange-200 shadow-md">
                    <CardHeader className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4">
                            <Shield className="h-8 w-8 text-orange-800" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
                        <p className="text-gray-600 mt-2">Restricted area — authorized users only</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Admin Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-orange-800 hover:bg-orange-700 text-white h-11"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Admin Sign In"
                                )}
                            </Button>

                            <div className="text-center text-sm text-gray-600">
                                <Link href="/" className="text-orange-800 hover:underline font-medium">
                                    Back to Home
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    )
}
