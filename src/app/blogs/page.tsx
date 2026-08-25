'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import { BLOGS, BlogPost } from '@/data/blogs';

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const categories = ['All', 'Market Trends', 'Legal & RERA', 'Investment', 'Home Buying'];

  const filteredBlogs = BLOGS.filter((b) => {
    if (selectedCategory !== 'All' && b.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenPostProperty={() => setIsPostOpen(true)} 
      />

      {/* Header */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Indian PropTech & Market Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Real Estate Insights & Buyer Guides
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Stay ahead of property appreciation trends, RERA legal compliance, and tax saving strategies across Central India.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              onClick={() => setSelectedPost(blog)}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 bg-gray-900 overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-emerald-500 text-white">
                    {blog.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1" />{blog.publishedDate}</span>
                    <span>•</span>
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" />{blog.readTime}</span>
                  </div>

                  <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                    {blog.title}
                  </h2>

                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-100 dark:border-gray-800/80 mt-4">
                <div className="flex items-center space-x-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <img src={blog.author.avatar} alt={blog.author.name} className="w-6 h-6 rounded-full object-cover bg-emerald-100" />
                  <span>{blog.author.name}</span>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center group-hover:translate-x-1 transition-transform">
                  Read Guide <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />

      {/* Blog Detail Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
          <div
            className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto my-8"
            data-lenis-prevent
          >
            <div className="flex justify-between items-start pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="space-y-1">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-emerald-500 text-white">
                  {selectedPost.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white pt-2">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center space-x-3 text-xs text-gray-400 pt-1">
                  <span>By {selectedPost.author.name} ({selectedPost.author.role})</span>
                  <span>•</span>
                  <span>{selectedPost.publishedDate}</span>
                </div>
              </div>
              <button onClick={() => setSelectedPost(null)} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800">
                ✕
              </button>
            </div>

            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gray-900">
              <img src={selectedPost.coverImage} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line space-y-4">
              {selectedPost.content}
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-500"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      <CommandPalette 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onOpenAddProperty={() => setIsPostOpen(true)} 
      />
      <AddPropertyModal
        isOpen={isPostOpen}
        onClose={() => setIsPostOpen(false)}
      />
    </div>
  );
}
