import React, { FC } from "react"

interface Props {
  small?: boolean
}

const Logo: FC<Props> = ({ small = false }) => {
  return (
    <p
      className={`
        font-semibold tracking-tight whitespace-nowrap
        ${small
          ? "text-sm sm:text-base"
          : "text-base sm:text-lg md:text-xl lg:text-2xl"}
      `}
    >
      Rental{" "}
      <span
        className="
          text-white bg-blue-600
          px-2 py-0.5 sm:px-2.5 sm:py-1
          rounded-md
        "
      >
        Confirmation
      </span>
      .com
    </p>
  )
}

export default Logo
