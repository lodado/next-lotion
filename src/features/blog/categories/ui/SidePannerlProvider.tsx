"use client";

import { contextBuildHelper } from "@/shared";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CategoryContextType {
  expandedCategories: number[];
  toggleCategory: (categoryId: number) => void;
}

export const [CategoryContext, useCategoryContext] = contextBuildHelper<CategoryContextType>({ id: "CategoryContext" });

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  return (
    <CategoryContext expandedCategories={expandedCategories} toggleCategory={toggleCategory}>
      {children}
    </CategoryContext>
  );
};
