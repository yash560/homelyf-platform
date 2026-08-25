'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Building2, 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ChevronRight, 
  Calculator, 
  Phone, 
  Calendar, 
  Award,
  Users,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import PropertyDetailModal from '@/components/modals/PropertyDetailModal';
import BookVisitModal from '@/components/modals/BookVisitModal';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import EmiCalculator from '@/components/calculators/EmiCalculator';
import { PROPERTIES, Property, PROPERTY_TYPES, CITIES } from '@/data/properties';
import { INVESTMENTS } from '@/data/investments';
import { AGENTS } from '@/data/agents';
import { REVIEWS, GOOGLE_REVIEWS_STATS } from '@/data/reviews';
import { CITY_HUBS } from '@/data/cities';

export default function HomePage() {
  const router = useRouter();
  const [searchPurpose, setSearchPurpose] = useState<'buy' | 'rent' | 'invest'>('buy');
  const [searchCity, setSearchCity] = useState('Bhopal');
  const [searchType, setSearchType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [visitProperty, setVisitProperty] = useState<Property | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchPurpose) params.set('purpose', searchPurpose);
    if (searchCity && searchCity !== 'All Cities') params.set('city', searchCity);
    if (searchType && searchType !== 'all') params.set('type', searchType);
    if (searchQuery) params.set('search', searchQuery);
    router.push(`/listing?${params.toString()}`);
  };

  const featuredProperties = PROPERTIES.filter(p => p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenPostProperty={() => setIsPostOpen(true)} 
      />

      {/* Hero Section */}
      <section className="relative pt-6 pb-20 sm:pt-12 sm:pb-32 overflow-hidden">
        {/* Background Image with Ambient Glow Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bg.jpg"
            alt="Luxury Indian Real Estate"
            className="w-full h-full object-cover opacity-25 dark:opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/80 dark:via-gray-950/80 to-gray-50 dark:to-gray-950" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Hero Header */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300/50 dark:border-emerald-800/50 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>India&apos;s #1 Verified & 0% Brokerage Property Network</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.15]">
              Find Your Perfect Place <br className="hidden sm:block" />
              with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400">Zero Brokerage.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explore 8,000+ title-verified residential homes, luxury lakeview villas, and high-yield commercial assets across Bhopal, Indore & Central India.
            </p>
          </div>

          {/* Interactive Multi-Tab Search Box */}
          <div className="mt-8 max-w-4xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-gray-200/80 dark:border-gray-800/80">
            {/* Purpose Tabs */}
            <div className="flex items-center space-x-2 border-b border-gray-100 dark:border-gray-800 pb-4 mb-4 overflow-x-auto no-scrollbar">
              {[
                { id: 'buy', label: 'Buy Property' },
                { id: 'rent', label: 'Rent Home' },
                { id: 'invest', label: 'High-Yield Commercial (9%+)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSearchPurpose(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                    searchPurpose === tab.id
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* City Selector */}
              <div className="sm:col-span-3 space-y-1">
                <label className="text-[11px] font-bold uppercase text-gray-400 dark:text-gray-500">City</label>
                <div className="relative">
                  <select
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    className="w-full pl-3 pr-8 py-2.5 bg-gray-50 dark:bg-gray-800 text-xs sm:text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Bhopal</option>
                    <option>Indore</option>
                    <option>Mumbai</option>
                    <option>Bangalore</option>
                    <option>Delhi NCR</option>
                    <option>All Cities</option>
                  </select>
                </div>
              </div>

              {/* Locality Search Query */}
              <div className="sm:col-span-4 space-y-1">
                <label className="text-[11px] font-bold uppercase text-gray-400 dark:text-gray-500">Locality / Landmark</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Arera Colony, MP Nagar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 text-xs sm:text-sm font-medium rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="sm:col-span-3 space-y-1">
                <label className="text-[11px] font-bold uppercase text-gray-400 dark:text-gray-500">Property Type</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 text-xs sm:text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartments & Flats</option>
                  <option value="villa">Villas & Bungalows</option>
                  <option value="commercial">Commercial Office / Shop</option>
                  <option value="penthouse">Penthouses</option>
                  <option value="plot">Plots & Land</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div className="sm:col-span-2 pt-4 sm:pt-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-1.5 active:scale-95 transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Quick Locality Tags */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center space-x-2 overflow-x-auto text-xs text-gray-500 dark:text-gray-400">
              <span className="font-bold text-gray-700 dark:text-gray-300 shrink-0">Popular:</span>
              {['Arera Colony (3 BHK)', 'MP Nagar Zone-2 (Commercial)', 'Kolar Road Villas', 'Super Corridor Indore', 'Gulmohar Penthouse'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag.split(' (')[0]);
                    router.push(`/listing?search=${encodeURIComponent(tag.split(' (')[0])}`);
                  }}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Pillars Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 flex items-center space-x-3 shadow-sm">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">100% RERA Verified</div>
                <div className="text-[11px] text-gray-500">Zero legal disputes</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 flex items-center space-x-3 shadow-sm">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">0% Hidden Brokerage</div>
                <div className="text-[11px] text-gray-500">Direct owner & builder pricing</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 flex items-center space-x-3 shadow-sm">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">Free Chauffeur Visits</div>
                <div className="text-[11px] text-gray-500">Pick & drop facility</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 flex items-center space-x-3 shadow-sm">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">Instant Home Loans</div>
                <div className="text-[11px] text-gray-500">Lowest SBI & HDFC rates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-white dark:bg-gray-900/50 border-t border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Curated Collection
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                Featured Verified Properties
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Handpicked luxury apartments, lakeview villas, and high-ROI commercial hubs in Central India.
              </p>
            </div>
            <Link
              href="/listing"
              className="mt-4 sm:mt-0 inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 group"
            >
              <span>View All Properties ({PROPERTIES.length})</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative h-60 overflow-hidden bg-gray-900">
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-emerald-500 text-white shadow-md">
                      {prop.purpose === 'buy' ? 'For Sale' : prop.purpose === 'rent' ? 'For Rent' : 'Investment'}
                    </span>
                    {prop.reraApproved && (
                      <span className="px-2 py-1 rounded-md text-xs font-semibold bg-black/60 text-white backdrop-blur-md flex items-center">
                        <ShieldCheck className="w-3 h-3 mr-1 text-emerald-400" />
                        RERA Verified
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-black/80 text-white backdrop-blur-md text-sm font-extrabold">
                    {prop.priceFormatted}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {prop.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 mr-1 shrink-0" />
                      <span className="truncate">{prop.location.locality}, {prop.location.city}</span>
                    </div>

                    {/* Meta Specs */}
                    <div className="grid grid-cols-3 gap-2 mt-4 py-3 border-t border-b border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1.5">
                        <Bed className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{prop.bedrooms ? `${prop.bedrooms} BHK` : prop.type}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Bath className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{prop.bathrooms} Bath</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Maximize className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{prop.superAreaSqft} sq.ft</span>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center space-x-2 pt-2">
                    <button
                      onClick={() => setSelectedProperty(prop)}
                      className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setVisitProperty(prop)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer flex items-center space-x-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Visit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High Yield "Invest Properties" Marketplace Spotlight */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Pre-Leased Commercial & Institutional Assets</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                High-Yield Real Estate Investment Hub
              </h2>
              <p className="text-sm text-gray-400 mt-1 max-w-xl">
                Earn 8.5% to 11.2% net monthly rental yields with grade-A corporate tenants and long-term locked leases.
              </p>
            </div>
            <Link
              href="/invest-properties"
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <span>Explore All Investment Assets</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INVESTMENTS.map((inv) => (
              <div
                key={inv.id}
                className="bg-gray-800/60 border border-gray-700/80 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/50 transition-all group"
              >
                <div className="space-y-4">
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-gray-900">
                    <img src={inv.image} alt={inv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 text-emerald-400 text-xs font-extrabold backdrop-blur-md">
                      {inv.netYield}% Net Yield
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-gray-400 tracking-wider">
                      {inv.assetType} • {inv.locality}, {inv.city}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-emerald-400 transition-colors">
                      {inv.title}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-700/50 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly Rental Payout:</span>
                      <span className="font-bold text-emerald-400">{inv.monthlyRentalPayout}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tenant Covenant:</span>
                      <span className="font-semibold text-white">{inv.tenantName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">5-Year IRR:</span>
                      <span className="font-bold text-teal-300">{inv.expectedIrr5Years}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-gray-700/50 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400">Total Asset Value</div>
                    <div className="text-base font-extrabold text-white">{inv.totalValueFormatted}</div>
                  </div>
                  <Link
                    href={`/invest-properties?asset=${inv.id}`}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1"
                  >
                    <span>Inspect Memo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Hubs Explorer */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Micro-Market Intelligence
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              Explore Top Indian Real Estate Hubs
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Find verified properties in prime localities with average capital rates and infrastructure metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CITY_HUBS.map((city) => (
              <Link
                key={city.name}
                href={`/listing?city=${encodeURIComponent(city.name)}`}
                className="group relative rounded-3xl overflow-hidden shadow-lg h-72 flex flex-col justify-end p-6 bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all hover:scale-[1.02]"
              >
                <img
                  src={city.heroImage}
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-75 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="relative z-10 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white">{city.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                      {city.totalListings}+ Listings
                    </span>
                  </div>
                  <div className="text-xs text-emerald-400 font-bold">
                    Avg Rate: {city.avgPricePerSqft}
                  </div>
                  <p className="text-[11px] text-gray-300 line-clamp-2 pt-1">
                    {city.growthHighlights}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Mortgage EMI Preview */}
      <section className="py-16 bg-white dark:bg-gray-900 border-t border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmiCalculator />
        </div>
      </section>

      {/* 4.9★ Google Business Reviews Marquee & Showcase (Rule #10) */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-300/50 mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 / 5.0 Rating based on 840+ Verified Google Reviews</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Loved by Homebuyers, Investors & Landlords
          </h2>
        </div>

        {/* Marquee Row */}
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee space-x-6">
            {REVIEWS.concat(REVIEWS).map((rev, i) => (
              <div
                key={i}
                className="w-80 sm:w-96 p-5 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md shrink-0 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-gray-400">{rev.date}</span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4">
                    &ldquo;{rev.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <img src={rev.avatar} alt={rev.author} className="w-9 h-9 rounded-full object-cover bg-emerald-100" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-gray-900 dark:text-white truncate">{rev.author}</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{rev.locality} • {rev.category}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/reviews"
            className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500"
          >
            <span>Read All 840+ Google Reviews & Ratings</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </section>

      {/* Verified Real Estate Agent Showcase */}
      <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                RERA Certified Network
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                Meet Homelyf&apos;s Senior Property Advisors
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Zero spam, 100% legal due diligence assistance, and localized neighbourhood expertise.
              </p>
            </div>
            <Link
              href="/agents"
              className="mt-4 sm:mt-0 inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500"
            >
              <span>Explore All Verified Agents</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-center space-y-4 hover:shadow-xl transition-all"
              >
                <div className="relative w-20 h-20 mx-auto rounded-2xl overflow-hidden bg-emerald-100 dark:bg-emerald-950 p-1 border-2 border-emerald-500">
                  <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover rounded-xl" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{agent.name}</h3>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{agent.role}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                    {agent.city} • RERA: {agent.reraNumber}
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={`https://wa.me/${agent.whatsapp}?text=Hi%20${encodeURIComponent(agent.name)}%2C%20I%20am%20looking%20for%20property%20advice.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    WhatsApp Chat
                  </a>
                  <a
                    href={`tel:${agent.phone}`}
                    className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Banner CTA */}
      <section className="py-14 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-200">
              For Homeowners & Channel Partners
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              Want to Sell, Rent or List Your Property Across Central India?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
              Post your property for 100% free or join Homelyf as a certified channel partner to receive high-intent client inquiries.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setIsPostOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-white text-emerald-900 font-extrabold text-sm shadow-xl hover:bg-emerald-50 transition-all active:scale-95 cursor-pointer"
            >
              Post Free Listing
            </button>
            <Link
              href="/plans"
              className="px-6 py-3.5 rounded-2xl bg-emerald-950/60 hover:bg-emerald-950 text-white border border-emerald-400/40 font-bold text-sm transition-all"
            >
              View Partner Plans
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Interactive Modals */}
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
