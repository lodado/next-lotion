import { AuthServerRepository } from "@/entities/Auth/index.server";
import { ThemeSelector } from "@/entities/Theme/ui";
import { AuthButton } from "@/features";
import { Button } from "@/shared/ui";
import { Navigation } from "@/widgets/index.server";

import React from "react";

const page = () => {
  return (
    <>
      <Navigation.Root>
        <Navigation.Header />
        <Navigation.Footer authRepository={new AuthServerRepository()} />
      </Navigation.Root>

      <div className="h-10 flex items-center">
        <Button variant="primary" size={"large"}>
          tetset!!
        </Button>
        <AuthButton />
        <ThemeSelector />
      </div>
    </>
  );
};

export default page;
