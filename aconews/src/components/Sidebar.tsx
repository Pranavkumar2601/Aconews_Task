import { motion } from "framer-motion";
import React from "react";

interface SidebarProps {
  setCategory: (category: string) => void;
  currentCategory: string;
  isOpen: boolean;
  closeSidebar: () => void;
}

export function Sidebar({
  setCategory,
  currentCategory,
  isOpen,
  closeSidebar,
}: SidebarProps) {
  const categories = [
    "general",
    "world",
    "nation",
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
  ];

  return (
    <motion.aside
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 overflow-y-auto"
    >
      <div className="p-4">
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 text-2xl text-indigo-600"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 mt-8 text-indigo-600">
          Categories
        </h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <motion.li
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => {
                  setCategory(category);
                  closeSidebar();
                }}
                className={`w-full text-left px-4 py-2 rounded-full ${
                  currentCategory === category
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "text-indigo-600 hover:bg-indigo-100"
                } transition-colors`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}
