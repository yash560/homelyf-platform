'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Building2, 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  ShieldCheck, 
  Filter, 
  SlidersHorizontal, 
  Grid, 
  List, 
  Calendar, 
  Phone, 
  X, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import PropertyDetailModal from '@/components/modals/PropertyDetailModal';
import BookVisitModal from '@/components/modals/BookVisitModal';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import { PROPERTIES, Property, PROPERTY_TYPES, CITIES } from '@/data/properties';

function ListingContent() {
  const searchParams = useSearchParams();
  const initialPurpose = searchParams.get('purpose') || 'all';
  const initialCity = searchParams.get('city') || 'All Cities';
  const initialType = searchParams.get('type') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [purpose, setPurpose] = useState<string>(initialPurpose);
  const [city, setCity] = useState<string>(initialCity);
  const [type, setType] = useState<string>(initialType);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedBhk, setSelectedBhk] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(35000000); // 3.5 Cr
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'area'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Modals
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [visitProperty, setVisitProperty] = useState<Property | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p) => {
      if (purpose !== 'all' && p.purpose !== purpose) return false;
      if (city !== 'All Cities' && p.location.city.toLowerCase() !== city.toLowerCase()) return false;
      if (type !== 'all' && p.type !== type) return false;
      if (selectedBhk !== null && p.bedrooms !== selectedBhk) return false;
      if (p.price > maxPrice) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesLocality = p.location.locality.toLowerCase().includes(q);
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesCity = p.location.city.toLowerCase().includes(q);
        const matchesAddress = p.location.address.toLowerCase().includes(q);
        if (!matchesLocality && !matchesTitle && !matchesCity && !matchesAddress) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'area') return b.superAreaSqft - a.superAreaSqft;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [purpose, city, type, selectedBhk, maxPrice, searchQuery, sortBy]);

  const resetFilters = () => {
    setPurpose('all');
    setCity('All Cities');
    setType('all');
    setSearchQuery('');
    setSelectedBhk(null);
    setMaxPrice(35000000);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenPostProperty={() => setIsPostOpen(true)} 
      />

      {/* Header Banner */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                Verified Property Marketplace
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Showing {filteredProperties.length} verified listings across {city === 'All Cities' ? 'all prime hubs' : city} with 0% brokerage.
              </p>
            </div>

            {/* View Mode & Sort Controls */}
            <div className="flex items-center space-x-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-xs font-semibold rounded-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"
              >
                <option value="featured">Sort: Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="area">Area: Largest First</option>
              </select>

              <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white dark:bg-gray-900 shadow-sm text-emerald-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white dark:bg-gray-900 shadow-sm text-emerald-600' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-5 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center space-x-2 text-sm font-bold text-gray-900 dark:text-white">
                  <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
                  <span>Filter Properties</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Purpose Tabs */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400">Transaction Type</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'buy', label: 'Buy' },
                    { id: 'rent', label: 'Rent' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setPurpose(t.id)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        purpose === t.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City Filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400">Market Hub</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium focus:outline-none"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400">Property Category</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium focus:outline-none"
                >
                  {PROPERTY_TYPES.map((pt) => (
                    <option key={pt.value} value={pt.value}>{pt.label}</option>
                  ))}
                </select>
              </div>

              {/* BHK Configuration */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-gray-400">Bedrooms (BHK)</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((bhk) => (
                    <button
                      key={bhk}
                      onClick={() => setSelectedBhk(selectedBhk === bhk ? null : bhk)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        selectedBhk === bhk
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {bhk} BHK
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Budget Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-400">Max Budget</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    ₹{(maxPrice / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={50000000}
                  step={1000000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsPostOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
                >
                  + Post Free Property
                </button>
              </div>
            </div>
          </aside>

          {/* Properties Catalog List / Grid */}
          <main className="lg:col-span-9 space-y-6">
            {filteredProperties.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 text-center space-y-4">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  No properties matched your exact criteria
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                  Try adjusting your budget slider or clearing the locality search filter to view all available verified listings.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-500"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
                {filteredProperties.map((prop) => (
                  <div
                    key={prop.id}
                    className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex ${
                      viewMode === 'list' ? 'flex-col sm:flex-row' : 'flex-col'
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative bg-gray-900 ${viewMode === 'list' ? 'sm:w-72 h-52 sm:h-auto shrink-0' : 'h-52'}`}>
                      <img
                        src={prop.images[0]}
                        alt={prop.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex items-center space-x-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500 text-white">
                          {prop.purpose === 'buy' ? 'For Sale' : prop.purpose === 'rent' ? 'For Rent' : 'Investment'}
                        </span>
                        {prop.reraApproved && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-black/60 text-white backdrop-blur-xs flex items-center">
                            <ShieldCheck className="w-3 h-3 mr-0.5 text-emerald-400" />
                            RERA
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 text-white text-xs font-black backdrop-blur-xs">
                        {prop.priceFormatted}
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1">
                          {prop.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500 mr-1 shrink-0" />
                          <span className="truncate">{prop.location.locality}, {prop.location.city}</span>
                        </div>

                        {/* Specs */}
                        <div className="grid grid-cols-3 gap-2 mt-3 py-2 border-t border-b border-gray-100 dark:border-gray-800 text-[11px] text-gray-600 dark:text-gray-300">
                          <div className="flex items-center space-x-1">
                            <Bed className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{prop.bedrooms ? `${prop.bedrooms} BHK` : prop.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Bath className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{prop.bathrooms} Bath</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Maximize className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{prop.superAreaSqft} sqft</span>
                          </div>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          onClick={() => setSelectedProperty(prop)}
                          className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => setVisitProperty(prop)}
                          className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1 shadow-xs cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Visit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />

      {/* Modals */}
      <CommandPalette 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onOpenAddProperty={() => setIsPostOpen(true)} 
      />
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onBookVisit={(prop) => {
          setSelectedProperty(null);
          setVisitProperty(prop);
        }}
      />
      <BookVisitModal
        property={visitProperty}
        onClose={() => setVisitProperty(null)}
      />
      <AddPropertyModal
        isOpen={isPostOpen}
        onClose={() => setIsPostOpen(false)}
      />
    </div>
  );
}

export default function ListingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Properties...</div>}>
      <ListingContent />
    </Suspense>
  );
}
