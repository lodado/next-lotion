import React, { Suspense, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { Button, ScrollArea } from "@/shared/ui";
import { BlogPost, Category, CategoryListProps } from "../models/entities/type";

export const CategoryList: React.FC<CategoryListProps> = ({ categories, blogPosts }) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id} className="mb-2">
          <Button
            variant="text"
            className="w-full justify-start font-medium"
            onClick={() => toggleCategory(category.id)}
          >
            {expandedCategories.includes(category.id) ? (
              <ChevronDown className="mr-2 h-4 w-4" />
            ) : (
              <ChevronRight className="mr-2 h-4 w-4" />
            )}
            {category.name}
          </Button>
          <AnimatePresence>
            {expandedCategories.includes(category.id) && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-4 mt-1 overflow-hidden"
              >
                {category.subcategories.map((subcategory) => (
                  <motion.li
                    key={subcategory}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mb-1"
                  >
                    <Button variant="text" size="small" className="w-full justify-start text-sm font-normal">
                      {subcategory}
                    </Button>
                  </motion.li>
                ))}
                {blogPosts
                  .filter((post) => post.categoryName === category.name)
                  .map((post) => (
                    <motion.li
                      key={post.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="mb-1"
                    >
                      <Button variant="text" size="small" className="w-full justify-start text-sm font-normal">
                        {post.title}
                      </Button>
                    </motion.li>
                  ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
};

const BlogPostList = ({ categories, blogPosts }: { categories: Category[]; blogPosts: BlogPost[] }) => {
  return (
    <div className="w-64 bg-background border-r h-screen">
      <ScrollArea className="h-full">
        <nav className="p-2">
          <h2 className="font-semibold text-lg mb-2">Blog Categories</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <CategoryList categories={categories} blogPosts={blogPosts} />
          </Suspense>
        </nav>
      </ScrollArea>
    </div>
  );
};

export default BlogPostList;
