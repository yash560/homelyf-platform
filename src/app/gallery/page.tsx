'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Maximize2, Filter } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import LightboxModal from '@/components/gallery/LightboxModal';

const GALLERY_ITEMS = [
  { url: '/images/6.jpg', title: 'Emerald Heights Lakefront Facade', category: 'Luxury High-Rise', location: 'Arera Colony, Bhopal' },
  { url: '/images/2.jpg', title: 'Grand Orchard Duplex Villa & Garden', category: 'Villas & Bungalows', location: 'Kolar Road, Bhopal' },
  { url: '/images/7.jpg', title: 'The Imperial Corporate Office Atrium', category: 'Commercial Hubs', location: 'MP Nagar, Bhopal' },
  { url: '/images/3.jpg', title: 'Sky Crest Signature Penthouse Terrace', category: 'Luxury High-Rise', location: 'Gulmohar, Bhopal' },
  { url: '/images/1.jpg', title: 'Urban Nest Designer Living Room', category: 'Interiors & Fitouts', location: 'Arera Hills, Bhopal' },
  { url: '/images/4.jpg', title: 'The Pinnacle Grand Architectural Lobby', category: 'Luxury High-Rise', location: 'Vijay Nagar, Indore' },
  { url: '/images/5.jpg', title: 'Skyline Park Modern Clubhouse & Pool', category: 'Townships & Amenities', location: 'Hoshangabad Road, Bhopal' },
  { url: '/images/wIKStIGZ1695617711.jpg', title: 'Italian Marble Master Bedroom Suite', category: 'Interiors & Fitouts', location: 'Arera Colony, Bhopal' },
  { url: '/images/15288480151707303118.jpg', title: 'C21 Mega Retail Anchor Suite', category: 'Commercial Hubs', location: 'Vijay Nagar, Indore' },
  { url: '/images/15991171461707303317.jpg', title: 'Super Corridor Logistics Complex', category: 'Commercial Hubs', location: 'Super Corridor, Indore' },
  { url: '/images/2753215891707303224.jpg', title: 'Freehold IT Corridor Commercial Land', category: 'Commercial Hubs', location: 'Indore' }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const categories = ['All', 'Luxury High-Rise', 'Villas & Bungalows', 'Commercial Hubs', 'Interiors & Fitouts', 'Townships & Amenities'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

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
            <ImageIcon className="w-3.5 h-3.5" />
            <span>High-Definition Visual Walkthroughs</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Photo & Architectural Media Gallery
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Explore verified photos, exterior facades, bespoke interior finishes, and construction milestones across our marquee properties.
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

      {/* Masonry / Grid Gallery */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-3xl overflow-hidden shadow-md h-72 bg-gray-900 cursor-pointer border border-gray-200 dark:border-gray-800"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500 text-white">
                  {item.category}
                </span>
                <h3 className="text-base font-bold truncate">{item.title}</h3>
                <div className="text-xs text-gray-300">{item.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          images={filteredItems}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
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
