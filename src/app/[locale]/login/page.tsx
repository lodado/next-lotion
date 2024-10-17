import { ThemeSelector } from "@/entities";
import { AuthButton } from "@/features";
import React from "react";

const page = () => {
  return (
    <div>
      <AuthButton />
      <ThemeSelector />
    </div>
  );
};

export default page;
