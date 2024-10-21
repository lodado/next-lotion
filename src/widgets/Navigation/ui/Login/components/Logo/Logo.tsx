import { ScreenReaderOnly } from "@/shared/ui";
import React from "react";

const Logo = () => {
  return (
    <>
      <figure lang="en" className="flex flex-row items-center heading-02 font-extrabold text-color-text-default gap-3">
        <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.22386 9.64193V12.5473H4.20389C3.72251 12.5473 3.33227 12.9376 3.33227 13.4189L3.33227 23.2973C3.33227 23.7786 3.7225 24.1689 4.20388 24.1689L14.0822 24.1689C14.5636 24.1689 14.9538 23.7786 14.9538 23.2973V21.2789H17.8592V23.2973C17.8592 25.3832 16.1682 27.0743 14.0822 27.0743H4.20388C2.1179 27.0743 0.42688 25.3832 0.42688 23.2973V13.4189C0.426882 11.333 2.1179 9.64193 4.20389 9.64193H6.22386ZM9.14302 13.0556H9.14528V8.80318H9.14302V4.70276C9.14302 2.61678 10.834 0.925755 12.92 0.925755L22.7983 0.925756C24.8843 0.925756 26.5753 2.61678 26.5753 4.70276L26.5753 14.5811C26.5753 16.6671 24.8843 18.3581 22.7983 18.3581H18.4173V18.3574H14.1649V18.3581H12.92C10.834 18.3581 9.14302 16.6671 9.14302 14.5811V13.0556Z"
            fill="url(#paint0_linear_113_11)"
            aria-hidden="true"
          />
          <defs>
            <linearGradient
              id="paint0_linear_113_11"
              x1="13.5011"
              y1="0.925738"
              x2="13.5011"
              y2="27.0742"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0A8FFF" />
              <stop offset="1" stopColor="#9747FF" />
            </linearGradient>
          </defs>
        </svg>

        <figcaption className="select-none text-color-text-discovery">
          Unio
          <ScreenReaderOnly>
            is a blogging platform that automatically translates your posts into multiple languages, enabling you to
            effortlessly reach and engage a global audience.
          </ScreenReaderOnly>
        </figcaption>
      </figure>
    </>
  );
};

export default Logo;
