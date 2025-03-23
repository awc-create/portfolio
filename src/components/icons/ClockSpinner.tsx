import React from "react";

const ClockSpinner = ({ color = "#000", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill={color} d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" />
      <rect width="2" height="7" x="11" y="6" fill={color} rx="1">
        <animateTransform
          attributeName="transform"
          dur="90s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </rect>
      <rect width="2" height="9" x="11" y="11" fill={color} rx="1">
        <animateTransform
          attributeName="transform"
          dur="6s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </rect>
    </svg>
  );
};

export default ClockSpinner;
