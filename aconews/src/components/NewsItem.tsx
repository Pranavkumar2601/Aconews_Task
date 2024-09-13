import { motion } from "framer-motion";
import React from "react";

interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface NewsItemProps {
  article: Article;
  onSelect: () => void;
}

export function NewsItem({ article, onSelect }: NewsItemProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl"
      onClick={onSelect}
    >
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-indigo-800">
          {article.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 rounded-full">
            {article.source.name}
          </span>
          <span className="text-indigo-500">
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
