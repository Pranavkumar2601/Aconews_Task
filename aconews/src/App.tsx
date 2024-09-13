import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { NewsList } from "./components/NewsList";
import { Sidebar } from "./components/Sidebar";
import { NewsDetail } from "./components/NewsDetail";
import { Pagination } from "./components/Pagination";
import { SearchBar } from "./components/SearchBar";
import { motion, AnimatePresence } from "framer-motion";

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

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("general");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const ARTICLES_PER_PAGE = 10; // GNews API returns 10 articles per page

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const API_KEY = "8c9e7b8dbc70525c44060abf925d50f7";
        const url = searchQuery
          ? `https://gnews.io/api/v4/search?q=${searchQuery}&token=${API_KEY}&lang=en&page=${currentPage}&max=10`
          : `https://gnews.io/api/v4/top-headlines?category=${category}&token=${API_KEY}&lang=en&page=${currentPage}&max=10`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          setTotalArticles(data.totalArticles);
        } else {
          setError("No articles found");
          setArticles([]);
          setTotalArticles(0);
        }
      } catch (err) {
        setError("Failed to fetch news");
        setArticles([]);
        setTotalArticles(0);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="container mx-auto px-4 py-8 flex">
        <Sidebar
          setCategory={(newCategory) => {
            setCategory(newCategory);
            setCurrentPage(1);
          }}
          currentCategory={category}
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />
        <main className="w-full">
          <SearchBar onSearch={handleSearch} />
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-64"
              >
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
              </motion.div>
            ) : error ? (
              <motion.p
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-xl text-red-500"
              >
                {error}
              </motion.p>
            ) : selectedArticle ? (
              <NewsDetail
                article={selectedArticle}
                onClose={() => setSelectedArticle(null)}
              />
            ) : (
              <>
                <NewsList
                  articles={articles}
                  onSelectArticle={setSelectedArticle}
                />
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
