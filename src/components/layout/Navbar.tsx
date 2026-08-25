'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Search, 
  PlusCircle, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  Calculator, 
  Star, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenPostProperty?: () => void;
}

export default function Navbar({ onOpenSearch, onOpenPostProperty }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Bhopal');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Listings', href: '/listing' },
    { name: 'Invest', href: '/invest-properties', badge: 'High Yield' },
    { name: 'Agents', href: '/agents' },
    { name: 'Calculators', href: '/calculators' },
    { name: 'Reviews', href: '/reviews', badge: '4.9★' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Pricing', href: '/plans' },
    { name: 'Contact', href: '/contact' }
  ];

  const cities = ['Bhopal', 'Indore', 'Mumbai', 'Bangalore', 'Delhi NCR', 'Pune'];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md border-b border-gray-200/50 dark:border-gray-800/50 py-3'
            : 'bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm border-b border-gray-200/30 dark:border-gray-800/30 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & City Selector */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center">
                    HOMELYF
                    <span className="text-emerald-500 ml-0.5">.</span>
                    <span className="text-[10px] ml-1.5 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                      PRO
                    </span>
                  </span>
                  <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">
                    Verified Real Estate Marketplace
                  </span>
                </div>
              </Link>

              {/* City Selector Pill */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{selectedCity}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {cityDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-44 rounded-xl glass-dropdown shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setCityDropdownOpen(false)}
                  >
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-800">
                      Select Market Hub
                    </div>
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer ${
                          selectedCity === city
                            ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/20'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span>{city}</span>
                        {selectedCity === city && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50/70 dark:bg-emerald-950/40'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/60 dark:hover:bg-gray-800/60'
                    }`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="ml-1 px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-emerald-500 text-white shadow-xs">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Tools: Spotlight Search, Theme, Post Property */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Pill */}
              <button
                onClick={onOpenSearch}
                aria-label="Search properties"
                className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-emerald-500" />
                <span>Search...</span>
                <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded shadow-xs">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Switcher */}
              <ThemeToggle />

              {/* Post Free Property CTA */}
              <button
                onClick={onOpenPostProperty}
                className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Free Property</span>
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-4 pt-3 pb-6 mt-3 space-y-2 animate-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Market City: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedCity}</span>
              </div>
              <button
                onClick={onOpenSearch}
                className="flex items-center space-x-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search (⌘K)</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                    pathname === link.href
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded-full bg-emerald-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenPostProperty) onOpenPostProperty();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Free Property Listing</span>
              </button>
            </div>
          </div>
        )}
      </header>
      {/* Spacer to prevent header occlusion */}
      <div className="h-20" />
    </>
  );
}
