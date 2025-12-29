"use client";

import { useEffect } from "react";
import Link from "next/link";
import { trustPilotScript } from "@/lib/utils";

const SCRIPT_ID = "trustpilot-bootstrap";

const TrustPilot = () => {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = trustPilotScript;
    script.async = true;

    document.head.appendChild(script);
  }, []);

  return (
    <div
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="68d16f280cc45584c3911d45"
      data-style-height="52px"
      data-style-width="100%"
      data-token="c7277dee-c73c-49c6-9ea6-9ec14b4d0e3f"
    >
      <Link
        href="https://www.trustpilot.com/review/rentalconfirmation.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </Link>
    </div>
  );
};

export default TrustPilot;
