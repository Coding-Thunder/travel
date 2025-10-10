"use client"
import { trustPilotScript } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect } from 'react';

const TrustPilot = () => {
  useEffect(() => {
    // Check if the Trustpilot script already exists
    if (!document.querySelector(`script[src="${trustPilotScript}"]`)) {
      const script = document.createElement('script');
      script.src = trustPilotScript;
      script.async = true;
      document.head.appendChild(script);

      return () => {
        // Clean up the script if the component unmounts
        document.head.removeChild(script);
      };
    }
  }, []);

  return (
    <div
      className="trustpilot-widget"
      data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="68e91008d254d19b908f61ed" data-style-height="52px" data-style-width="100%" data-token="dc7ccbcb-3930-4e13-8909-71ca6550fa65"
    >
      <Link
        href="https://www.trustpilot.com/review/budgettravels4u.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </Link>
    </div>
  );
};

export default TrustPilot;
