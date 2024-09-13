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

interface NewsDetailProps {
  article: Article;
  onClose: () => void;
}

export function NewsDetail({ article, onClose }: NewsDetailProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4 text-indigo-800">
          {article.title}
        </h2>
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 rounded-full">
            {article.source.name}
          </span>
          <span className="text-indigo-500">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <p className="text-gray-700 mb-6">{article.content}</p>
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-colors"
          >
            Back to List
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-4 py-2 rounded-full hover:from-yellow-500 hover:to-pink-600 transition-colors"
          >
            Read Full Article
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
