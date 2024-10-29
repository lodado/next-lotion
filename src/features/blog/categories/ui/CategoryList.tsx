"use client";

import React, { PropsWithChildren, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/shared/ui";
import { Category } from "../models/entities/type";

export const CategoryList: React.FC<PropsWithChildren & { category: Category }> = ({ category, children }) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  return (
    <li key={category.id} className="mb-2">
      <Button variant="text" className="w-full justify-start font-medium" onClick={() => toggleCategory(category.id)}>
        {expandedCategories.includes(category.id) ? (
          <ChevronDown className="mr-2 h-4 w-4" />
        ) : (
          <ChevronRight className="mr-2 h-4 w-4" />
        )}
        {category.name}
      </Button>
      <AnimatePresence>{children}</AnimatePresence>
    </li>
  );
};
