import React from "react";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const maxPages = Math.min(totalPages, 10); // GNews API limits to 10 pages

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (maxPages <= maxVisiblePages) {
      for (let i = 1; i <= maxPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(currentPage - 2, 1);
      let endPage = Math.min(startPage + maxVisiblePages - 1, maxPages);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex justify-center items-center space-x-2 mt-8 overflow-x-auto py-4"
    >
      <PaginationButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        First
      </PaginationButton>
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PaginationButton>
      {pageNumbers.map((number) => (
        <PaginationButton
          key={number}
          onClick={() => onPageChange(number)}
          active={currentPage === number}
        >
          {number}
        </PaginationButton>
      ))}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPages}
      >
        Next
      </PaginationButton>
      <PaginationButton
        onClick={() => onPageChange(maxPages)}
        disabled={currentPage === maxPages}
      >
        Last
      </PaginationButton>
    </motion.div>
  );
}

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}

function PaginationButton({
  children,
  onClick,
  disabled,
  active,
}: PaginationButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 rounded-full ${
        active
          ? "bg-indigo-500 text-white"
          : disabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white text-indigo-500 hover:bg-indigo-100"
      } transition-colors`}
    >
      {children}
    </motion.button>
  );
}
