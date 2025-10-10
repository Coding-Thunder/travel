"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Hotel } from "@/lib/api/interfaces";

interface HotelMapProps {
  hotels: Hotel[];
  center: LatLngExpression;
}

export default function HotelMap({ hotels, center }: HotelMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
    });
  }, []);

  if (!isClient) return null;

  const validHotels = hotels.filter(
    (h) => h.latitude !== undefined && h.longitude !== undefined
  );

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {validHotels.map((hotel) => (
        <Marker
          key={hotel.hotelId}
          position={[hotel.latitude!, hotel.longitude!]}
        >
          <Popup>{hotel.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
