"use client";

import { Button, Motion } from "@/shared/ui";
import React, { ReactNode, useState } from "react";
import { useCategoryContext } from "../SidePannerlProvider";

const CategoryList = ({ children }: { children: ReactNode }) => {
  const { expandedCategories, toggleCategory } = useCategoryContext();

  return (
    <Motion
      type="li"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="mb-1"
    >
      <Button variant="text" size="small" className="w-full flex-nowrap justify-start text-sm font-normal">
        {children}
      </Button>
      <Button variant="text" size="small" className="w-full flex-nowrap justify-start text-sm font-normal">
        {children}
      </Button>
      <Button variant="text" size="small" className="w-full flex-nowrap justify-start text-sm font-normal">
        {children}
      </Button>
    </Motion>
  );
};

export default CategoryList;
