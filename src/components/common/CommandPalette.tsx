'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Building, MapPin, Calculator, BookOpen, Star, HelpCircle, ArrowRight, X } from 'lucide-react';
import { PROPERTIES } from '@/data/properties';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddProperty?: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenAddProperty }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProperties = query
    ? PROPERTIES.filter(
        p =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.location.locality.toLowerCase().includes(query.toLowerCase()) ||
          p.location.city.toLowerCase().includes(query.toLowerCase()) ||
          p.type.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const quickNav = [
    { title: 'Explore All Properties', path: '/listing', icon: Building },
    { title: 'Invest in High-Yield Assets', path: '/invest-properties', icon: Star },
    { title: 'Home Loan EMI Calculator', path: '/calculators', icon: Calculator },
    { title: 'Verified Channel Partners & Agents', path: '/agents', icon: MapPin },
    { title: 'Customer Google Reviews (4.9★)', path: '/reviews', icon: Star },
    { title: 'PropTech Blogs & Market Guides', path: '/blogs', icon: BookOpen },
    { title: 'Pricing & Partner Plans', path: '/plans', icon: HelpCircle },
    { title: 'Contact Bhopal Headquarters', path: '/contact', icon: MapPin },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-md transition-opacity">
      <div
        className="w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        data-lenis-prevent
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-gray-100 dark:border-gray-800">
          <Search className="w-5 h-5 text-emerald-500 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search properties, localities (e.g. Arera Colony, MP Nagar), calculators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-3 px-2 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results / Navigation */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-3">
          {query && filteredProperties.length > 0 && (
            <div>
              <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Matching Properties ({filteredProperties.length})
              </div>
              <div className="mt-1 space-y-1">
                {filteredProperties.map((prop) => (
                  <button
                    key={prop.id}
                    onClick={() => {
                      onClose();
                      router.push(`/listing?search=${encodeURIComponent(prop.location.locality)}`);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
                        <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          {prop.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {prop.location.locality}, {prop.location.city} • {prop.bedrooms ? `${prop.bedrooms} BHK` : prop.type}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {prop.priceFormatted}
                      </div>
                      <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                        {prop.purpose}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && filteredProperties.length === 0 && (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              No matching properties found for &quot;{query}&quot;. Try searching &quot;Arera Colony&quot;, &quot;MP Nagar&quot;, or &quot;3 BHK&quot;.
            </div>
          )}

          {/* Quick Actions & Navigation */}
          <div>
            <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Quick Navigation
            </div>
            <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {quickNav.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.title}
                    onClick={() => {
                      onClose();
                      router.push(item.path);
                    }}
                    className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors text-left cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                        {item.title}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div>
            Search Homelyf Database • <span className="font-semibold text-emerald-600 dark:text-emerald-400">8,000+ Verified Listings</span>
          </div>
          <div className="hidden sm:block">
            Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border rounded text-[10px]">ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}
