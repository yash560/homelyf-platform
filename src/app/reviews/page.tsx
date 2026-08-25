'use client';

import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Search, 
  Filter, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle2, 
  PlusCircle,
  ThumbsUp
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import { REVIEWS, Review, GOOGLE_REVIEWS_STATS } from '@/data/reviews';
import confetti from 'canvas-confetti';

export default function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [submittedReview, setSubmittedReview] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const categories = ['All', 'Home Buyer', 'Commercial Investor', 'Tenant', 'Channel Partner'];

  const filteredReviews = REVIEWS.filter((r) => {
    if (selectedCategory !== 'All' && r.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.author.toLowerCase().includes(q) ||
        r.content.toLowerCase().includes(q) ||
        r.locality.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedReview(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenPostProperty={() => setIsPostOpen(true)} 
      />

      {/* Header */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Verified Google Business Reviews</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                Customer Testimonials & Ratings
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Discover why over 8,000 homebuyers, investors, and landlords trust Homelyf for transparent, zero-brokerage property transactions across Central India.
              </p>
            </div>

            {/* Scorecard Widget */}
            <div className="bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-3xl p-6 flex items-center space-x-6 shrink-0 shadow-sm">
              <div className="text-center">
                <div className="text-4xl font-black text-gray-900 dark:text-white">4.9</div>
                <div className="flex items-center space-x-0.5 mt-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-[10px] text-gray-400 mt-1 font-semibold">840+ Reviews</div>
              </div>

              <div className="space-y-1 text-xs w-36 sm:w-44">
                {GOOGLE_REVIEWS_STATS.breakdown.map((b) => (
                  <div key={b.stars} className="flex items-center space-x-2">
                    <span className="text-[10px] text-gray-400 w-3">{b.stars}★</span>
                    <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="bg-amber-400 h-full" style={{ width: `${b.percentage}%` }} />
                    </div>
                    <span className="text-[10px] text-gray-500 w-7 text-right">{b.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-gray-900 p-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reviews by keyword, locality (e.g. Arera Colony), or client name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === c
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setIsWriteOpen(true);
              setSubmittedReview(false);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs shrink-0 flex items-center space-x-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  &ldquo;{rev.content}&rdquo;
                </p>

                {rev.propertyTitle && (
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl">
                    Property: <strong>{rev.propertyTitle}</strong>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover bg-emerald-100 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-gray-900 dark:text-white truncate">{rev.author}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400">
                    {rev.locality} • <span className="font-semibold text-gray-700 dark:text-gray-300">{rev.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* Write a Review Modal */}
      {isWriteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                Share Your Homelyf Experience
              </h3>
              <button onClick={() => setIsWriteOpen(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            {submittedReview ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-gray-900 dark:text-white">Review Submitted!</h4>
                <p className="text-xs text-gray-500">
                  Thank you for rating Homelyf Solutions. Your verified review will appear in our live feed.
                </p>
                <button
                  onClick={() => setIsWriteOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Kumar"
                    className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">City / Locality</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arera Colony, Bhopal"
                      className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Category</label>
                    <select className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none">
                      <option>Home Buyer</option>
                      <option>Commercial Investor</option>
                      <option>Tenant</option>
                      <option>Channel Partner</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your Feedback</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about the property verification, advisor support, or zero brokerage experience..."
                    className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md mt-2"
                >
                  Publish Verified Review
                </button>
              </form>
            )}
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
