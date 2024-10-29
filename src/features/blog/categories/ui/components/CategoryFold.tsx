"use client";

import React, { PropsWithChildren } from "react";
import { Category } from "../../models/entities/type";
import { useCategoryContext } from "../SidePannerlProvider";
import { Motion } from "@/shared/ui";

const CategoryFold = ({ children, category }: PropsWithChildren & { category: Category }) => {
  const { expandedCategories } = useCategoryContext();

  return (
    <>
      {!expandedCategories.includes(category.id) && (
        <Motion type="ul" className="ml-4 mt-1 overflow-hidden">
          {children}
        </Motion>
      )}
    </>
  );
};

export default CategoryFold;
