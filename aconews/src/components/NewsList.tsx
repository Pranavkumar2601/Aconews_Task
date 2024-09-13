import { motion } from "framer-motion";
import { NewsItem } from "./NewsItem";
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

interface NewsListProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export function NewsList({ articles, onSelectArticle }: NewsListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {articles.map((article, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <NewsItem
            article={article}
            onSelect={() => onSelectArticle(article)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
