import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaCalendar, FaUser, FaEye, FaHeart, FaShare, FaComment } from 'react-icons/fa';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  // Mock blog data
  useEffect(() => {
    const mockArticles = [
      {
        id: 1,
        title: "Understanding Diabetes: Types, Symptoms, and Management",
        excerpt: "Learn about the different types of diabetes, their symptoms, and effective management strategies for better health outcomes.",
        content: "Diabetes is a chronic condition that affects millions worldwide...",
        category: "Diabetes",
        author: "Dr. Sarah Johnson",
        date: "2024-01-15",
        readTime: "5 min read",
        image: "https://via.placeholder.com/600x300?text=Diabetes+Management",
        tags: ["diabetes", "health", "management"],
        likes: 245,
        views: 1250,
        comments: 23
      },
      {
        id: 2,
        title: "The Importance of Regular Health Check-ups",
        excerpt: "Discover why preventive healthcare is crucial and how regular check-ups can help detect health issues early.",
        content: "Regular health check-ups are essential for maintaining good health...",
        category: "Preventive Care",
        author: "Dr. Michael Chen",
        date: "2024-01-12",
        readTime: "4 min read",
        image: "https://via.placeholder.com/600x300?text=Health+Check-ups",
        tags: ["preventive care", "health screening", "wellness"],
        likes: 189,
        views: 980,
        comments: 15
      },
      {
        id: 3,
        title: "Nutrition Guide: Eating Right for Better Health",
        excerpt: "A comprehensive guide to balanced nutrition, healthy eating habits, and meal planning for optimal health.",
        content: "Proper nutrition is the foundation of good health...",
        category: "Nutrition",
        author: "Nutritionist Emma Davis",
        date: "2024-01-10",
        readTime: "6 min read",
        image: "https://via.placeholder.com/600x300?text=Healthy+Nutrition",
        tags: ["nutrition", "healthy eating", "meal planning"],
        likes: 312,
        views: 1580,
        comments: 34
      },
      {
        id: 4,
        title: "Mental Health Awareness: Breaking the Stigma",
        excerpt: "Understanding mental health conditions and the importance of seeking help when needed.",
        content: "Mental health is just as important as physical health...",
        category: "Mental Health",
        author: "Dr. Priya Sharma",
        date: "2024-01-08",
        readTime: "7 min read",
        image: "https://via.placeholder.com/600x300?text=Mental+Health",
        tags: ["mental health", "wellness", "support"],
        likes: 278,
        views: 1420,
        comments: 28
      },
      {
        id: 5,
        title: "Common Cold vs. COVID-19: How to Tell the Difference",
        excerpt: "Learn to distinguish between common cold symptoms and COVID-19 to make informed health decisions.",
        content: "With respiratory illnesses being common, it's important to know...",
        category: "COVID-19",
        author: "Dr. Robert Wilson",
        date: "2024-01-05",
        readTime: "3 min read",
        image: "https://via.placeholder.com/600x300?text=Cold+vs+COVID",
        tags: ["covid-19", "respiratory health", "symptoms"],
        likes: 156,
        views: 890,
        comments: 19
      },
      {
        id: 6,
        title: "Ayurveda for Modern Living: Ancient Wisdom for Today's Health",
        excerpt: "Explore how traditional Ayurvedic principles can complement modern healthcare practices.",
        content: "Ayurveda, the ancient Indian system of medicine...",
        category: "Ayurveda",
        author: "Dr. Rajesh Kumar",
        date: "2024-01-03",
        readTime: "8 min read",
        image: "https://via.placeholder.com/600x300?text=Ayurveda",
        tags: ["ayurveda", "traditional medicine", "holistic health"],
        likes: 198,
        views: 1100,
        comments: 31
      }
    ];

    setArticles(mockArticles);
    setFilteredArticles(mockArticles);
  }, []);

  const categories = ['All', 'Diabetes', 'Preventive Care', 'Nutrition', 'Mental Health', 'COVID-19', 'Ayurveda'];

  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredArticles(filtered);
  }, [selectedCategory, searchTerm, articles]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="pt-20 pb-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
            Health Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with expert health advice, wellness tips, and the latest medical insights from our healthcare professionals.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-primary-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-600 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-primary-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-large transition-all duration-300 group cursor-pointer"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {article.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaUser className="mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendar className="mr-1" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{article.readTime}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaEye className="mr-1" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center">
                      <FaHeart className="mr-1" />
                      <span>{article.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <FaComment className="mr-1" />
                      <span>{article.comments}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    Read More →
                  </button>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                      <FaHeart />
                    </button>
                    <button className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                      <FaShare />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Health Tips</h3>
          <p className="text-lg mb-6 opacity-90">
            Subscribe to our newsletter for the latest health articles and wellness advice.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blog;
