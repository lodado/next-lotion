import { ScreenReaderOnly } from "@/shared/ui";
import React from "react";

import Image from "next/image";

import LogoSvg from "./Logo.svg";

const Logo = () => {
  return (
    <>
      <figure
        lang="en"
        className="flex w-full h-full flex-row items-center justify-center heading-02 font-extrabold text-color-text-default gap-3"
      >
        <Image src={LogoSvg} width={28} height={28} alt="logo" />

        <figcaption className="select-none text-color-text-default">
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
