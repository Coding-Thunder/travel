// components/Logo.tsx
import { siteConfig } from "@/lib/config"
import Image from "next/image"
import Link from "next/link"

interface LogoProps {
    imageSrc?: string
    alt?: string
    width?: number
    height?: number
    className?: string
}

export function Logo({
    imageSrc,
    alt = siteConfig.brand.name,
    width = 40,
    height = 40,
    className = "",
}: LogoProps) {
    return (
        <Link href="/" className={`flex items-center gap-2 ${className}`}>
            {imageSrc ? (
                <div className="relative" style={{ width, height }}>
                    <Image
                        src={imageSrc}
                        alt={alt}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            ) : (
                <p className="text-2xl font-bold tracking-tight">
                    <span className="text-blue-600">
                        {siteConfig.brand.name.split(" ")[0]}
                    </span>
                    {" "}
                    <span className="text-orange-600">         
                         {siteConfig.brand.name.split(" ")[1]}
                    </span>
                </p>
            )}
        </Link>
    )
}