"use client";

import { contextBuildHelper } from "@/shared";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface CategoryContextType {
  expandedCategories: number[];
  toggleCategory: (categoryId: number) => void;

  isOpen: boolean;
  toggleSidePanel: () => void;
}

export const [CategoryContext, useCategoryContext] = contextBuildHelper<CategoryContextType>({ id: "CategoryContext" });

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidePanel = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  return (
    <CategoryContext
      isOpen={isOpen}
      toggleSidePanel={toggleSidePanel}
      expandedCategories={expandedCategories}
      toggleCategory={toggleCategory}
    >
      {children}
    </CategoryContext>
  );
};
