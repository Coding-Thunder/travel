import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Plane, Mail, Phone, MapPin } from "lucide-react"
import { siteConfig } from "@/lib/config"
import Image from "next/image"
import Payment from "@/public/png/payment.png";


export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="w-fit h-fit">

              {/* Text Logo */}   <div className="relative w-32 h-32">
                <Image
                  src="/logowhite.png"
                  alt="Logo"
                  fill
                />
              </div>
            </div>
            <p className="text-sm mb-6 leading-relaxed text-slate-400">
              Your trusted partner for travel bookings worldwide. Experience seamless booking with the best prices.
            </p>
            <p className="text-xs text-slate-500">Powered by {siteConfig.brand.poweredBy}</p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 text-orange-500" />
                <span>{siteConfig.brand.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>{siteConfig.brand.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>{siteConfig.brand.location}</span>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Help & Support</h3>
            <ul className="space-y-3 text-sm">
              {siteConfig.navigation.footer.help.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-orange-500 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-orange-500 transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Follow Us</h3>
            <div className="flex gap-3 mb-8">
              <a
                href={siteConfig.social.facebook}
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-orange-500 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-orange-500 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-orange-500 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-orange-500 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Payment Methods</h4>
              <Image src={Payment} width={200} height={200} alt="Payment Methods" className="mt-2" />
            </div>
          </div>
        </div>

        {/* Licensing & Certifications */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="text-white font-semibold mb-4">Licensing & Certifications</h3>
          <p className="text-sm">
            Licensed travel agency operating under state and federal regulations. All bookings are protected and secured
            through our trusted partners.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <p className="text-xs leading-relaxed">
            <strong className="text-white">Disclaimer:</strong> {siteConfig.brand.name} acts as an intermediary between
            travelers and service providers. Prices and availability are subject to change. All bookings are subject to
            the terms and conditions of the respective service providers. We are not responsible for any changes,
            cancellations, or disruptions caused by airlines, car rental companies, or other third-party providers.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
