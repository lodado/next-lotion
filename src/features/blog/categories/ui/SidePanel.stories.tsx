import { BlogPost, Category } from "../models/entities/type";
import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import SidePanel from "./SidePanel";

const categories: Category[] = [
  { id: 1, name: "Travel", subcategories: ["Adventure", "City Breaks", "Beach Holidays"] },
  { id: 2, name: "Food", subcategories: ["Recipes", "Restaurant Reviews", "Cooking Tips"] },
  { id: 3, name: "Lifestyle", subcategories: ["Home Decor", "Relationships", "Work-Life Balance"] },
];

const blogPosts: BlogPost[] = [
  { id: 1, categoryName: "Travel", title: "Top 10 Adventure Destinations" },
  { id: 2, categoryName: "Travel", title: "City Break: 48 Hours in Paris" },
  { id: 3, categoryName: "Food", title: "Easy 30-Minute Dinner Recipes" },
  { id: 4, categoryName: "Food", title: "Best Pizza Places in New York" },
  { id: 5, categoryName: "Lifestyle", title: "Minimalist Home Decor Ideas" },
];

export default {
  title: "features/SidePanel",
  component: SidePanel,
} as Meta;

type Story = StoryObj<typeof SidePanel>;

export const Default: Story = {
  args: {
    blogPosts,
    categories,
  },
};
