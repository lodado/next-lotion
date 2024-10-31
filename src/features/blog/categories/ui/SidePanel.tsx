import React from "react";

import { AnimationRoot, Button, Motion, ScrollArea } from "@/shared/ui";
import { BlogPost, Category } from "../models/entities/type";
import { CategoryProvider } from "./SidePannerlProvider";
import CategoryFoldButton from "./components/CategoryFoldButton";
import CategoryFold from "./components/CategoryFold";
import CategoryList from "./components/CategoryList";

const SidePanel = ({ categories, blogPosts }: { categories: Category[]; blogPosts: BlogPost[] }) => {
  return (
    <div className="w-32 bg-background border-r ">
      <ScrollArea className="h-full">
        <nav className="p-2">
          <h2 className="font-semibold text-lg mb-2">Blog Categories</h2>
          <>
            <CategoryProvider>
              <ul>
                {categories.map((category) => (
                  <li key={category.id} className="mb-2">
                    <AnimationRoot initial={false}>
                      <CategoryFoldButton category={category}>{category.name}</CategoryFoldButton>

                      <CategoryFold category={category}>
                        {category.subcategories.map((subcategory) => (
                          <CategoryList key={subcategory}>{subcategory}</CategoryList>
                        ))}
                        {blogPosts
                          .filter((post) => post.categoryName === category.name)
                          .map((post) => (
                            <CategoryList key={post.id}>{post.title}</CategoryList>
                          ))}
                      </CategoryFold>
                    </AnimationRoot>
                  </li>
                ))}
              </ul>
            </CategoryProvider>
          </>
        </nav>
      </ScrollArea>
    </div>
  );
};

export default SidePanel;
