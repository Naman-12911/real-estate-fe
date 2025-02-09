import React from "react";
import Button from "./Button";

export default function HorizontalScrollButton({ onScroll }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div title="Scroll Left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="md:w-7 md:h-7 w-5 h-5 cursor-pointer"
          viewBox="0 0 512 512"
          onClick={() => onScroll(-500)}
        >
          <path
            className=" fill-current"
            d="M256 16C123.42 16 16 123.418 16 256C16 388.578 123.42 496 256 496S496 388.578 496 256C496 123.418 388.58 16 256 16ZM310.625 345.375C323.125 357.875 323.125 378.125 310.625 390.625S277.875 403.125 265.375 390.625L153.375 278.625C147.125 272.375 144 264.188 144 256S147.125 239.625 153.375 233.375L265.375 121.375C277.875 108.875 298.125 108.875 310.625 121.375S323.125 154.125 310.625 166.625L221.25 256L310.625 345.375Z"
          />
        </svg>
      </div>
      <div title="Scroll Right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="md:w-7 md:h-7 w-5 h-5 cursor-pointer"
          viewBox="0 0 512 512"
          onClick={() => onScroll(500)}
        >
          <path
            className=" fill-current"
            d="M256 16C123.42 16 16 123.418 16 256C16 388.578 123.42 496 256 496S496 388.578 496 256C496 123.418 388.58 16 256 16ZM358.625 278.625L246.625 390.625C234.125 403.125 213.875 403.125 201.375 390.625S188.875 357.875 201.375 345.375L290.75 256L201.375 166.625C188.875 154.125 188.875 133.875 201.375 121.375S234.125 108.875 246.625 121.375L358.625 233.375C364.875 239.625 368 247.812 368 256S364.875 272.375 358.625 278.625Z"
          />
        </svg>
      </div>
    </div>
  );
}
