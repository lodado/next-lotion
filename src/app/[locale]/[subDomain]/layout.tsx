import { SERVER_DI_REPOSITORY } from "@/DI/index.server";
import { BlogPost, Category } from "@/features/blog/categories/models/entities/type";
import SidePanel from "@/features/blog/categories/ui/SidePanel";

import Navigation from "@/widgets/Navigation/ui/Navigation";

import React, { PropsWithChildren } from "react";

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

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    (<div className="w-full page-content">
      <Navigation.Root>
        <Navigation.Header />
        <Navigation.Footer authRepository={new SERVER_DI_REPOSITORY.Auth()} />
      </Navigation.Root>
      <div className="w-full flex flex-row grow-0 shrink-0 h-full">
        <SidePanel categories={categories} blogPosts={blogPosts} />
        {children}
      </div>
    </div>)
  );
};

export default Layout;
