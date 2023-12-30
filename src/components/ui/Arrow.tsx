import React from "react";

const Arrow = () => {
  return (
    <svg
      // enableBackground="new 0 0 24 24"
      id="Layer_1"
      version="1.0"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <polyline
        fill="none"
        points="5,6 18,6 18,19 "
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="2"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="2"
        x1="4.8"
        x2="18"
        y1="19.2"
        y2="6"
      />
    </svg>
  );
};

export default Arrow;
