import React from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className="text-2xl focus:outline-none"
        >
          ☰
        </motion.button>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
            ACONEWS
          </h1>
          <p className="text-sm text-indigo-200">
            Your source for the latest news
          </p>
        </motion.div>
        <div className="w-8"></div> {/* Placeholder for balance */}
      </div>
    </header>
  );
}
