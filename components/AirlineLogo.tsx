import { flightCodes } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import sw from "@/public/png/southwest.svg";
import spirit from "@/public/png/spirit.png";
import delta from "@/public/partners/delta.png";
import hawain from "@/public/partners/hw.png";
import frontier from "@/public/partners/frontier.png";
import jetblue from "@/public/png/jetblue.svg";
import allegiant from "@/public/partners/alg.png";
import alaska from "@/public/partners/alaska.png";
import american from "@/public/partners/aa.png";
import united from "@/public/partners/un.png";

interface Props {
  code: keyof typeof flightCodes;
}

const logoMapping = {
  [flightCodes.NK]: { src: spirit.src, alt: "Spirit Airlines Logo", width: 64, height: 20 },
  [flightCodes.F9]: { src: frontier.src, alt: "Frontier Airlines Logo", width: 100, height: 20 },
  [flightCodes.B6]: { src: jetblue.src, alt: "JetBlue Airways Logo", width: 70, height: 20 },
  [flightCodes.WN]: { src: sw.src, alt: "Southwest Airlines Logo", width: 100, height: 20 },
  [flightCodes.DL]: { src: delta.src, alt: "Delta Air Lines Logo", width: 100, height: 20 },
  [flightCodes.HA]: { src: hawain.src, alt: "Hawaiian Airlines Logo", width: 100, height: 20 },
  [flightCodes.AS]: { src: alaska.src, alt: "Alaska Airlines Logo", width: 100, height: 20 },
  [flightCodes.UA]: { src: united.src, alt: "United Airlines Logo", width: 100, height: 20 },
  [flightCodes.G4]: { src: allegiant.src, alt: "Allegiant Air Logo", width: 100, height: 20 },
  [flightCodes.AA]: { src: american.src, alt: "American Airlines Logo", width: 100, height: 20 },
};

const AirlineLogo: React.FC<Props> = ({ code }) => {
  const logo = logoMapping[code];

  if (!logo) return null; // Return null if no matching logo

  return (
    <Image
      src={logo.src}
      width={logo.width}
      alt={logo.alt}
      height={logo.height}
    />
  );
};

export default AirlineLogo;
