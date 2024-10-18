import { ThemeSelector } from "@/entities/Theme/ui";
import { AuthButton } from "@/features";
import { Button } from "@/shared/ui";

import React from "react";

const page = () => {
  return (
    <div className="h-10 flex items-center">
      <Button variant="primary" size={"large"}>
        tetset!!
      </Button>
      <AuthButton />
      <ThemeSelector />
    </div>
  );
};

export default page;
