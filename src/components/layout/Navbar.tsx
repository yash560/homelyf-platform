'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, 
  Search, 
  Plus, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  Calculator, 
  Star, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  User,
  Briefcase,
  Lock,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  BookOpen,
  Scale,
  Zap
} from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';
import AuthModal, { AuthRole } from '@/components/auth/AuthModal';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenPostProperty?: () => void;
}

export default function Navbar({ onOpenSearch, onOpenPostProperty }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Bhopal');
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  
  // Mega menu dropdown state
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<AuthRole>('user');

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cities = ['Bhopal', 'Indore', 'Mumbai', 'Bangalore', 'Delhi NCR', 'Pune'];

  const openAuthWithRole = (role: AuthRole) => {
    setAuthRole(role);
    setAuthModalOpen(true);
    setPortalDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-200/80 dark:border-gray-800/80 h-16'
            : 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 h-16'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left: Brand Logo & Single-Word City Selector */}
            <div className="flex items-center space-x-3 shrink-0">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-lg font-black tracking-tight text-gray-900 dark:text-white flex items-center whitespace-nowrap">
                  HOMELYF<span className="text-emerald-500">.IN</span>
                </span>
              </Link>

              {/* City Pill */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>{selectedCity}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
                </button>

                {cityDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-40 rounded-2xl glass-dropdown shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setCityDropdownOpen(false)}
                  >
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer ${
                          selectedCity === city
                            ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span>{city}</span>
                        {selectedCity === city && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Middle: Clean Single-Word Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  pathname === '/'
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Home
              </Link>

              {/* Properties Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('properties')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    pathname.startsWith('/listing')
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>Properties</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {activeMenu === 'properties' && (
                  <div className="absolute left-0 mt-1 w-64 rounded-2xl glass-dropdown shadow-xl p-2 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-100">
                    <Link
                      href="/listing"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold text-gray-800 dark:text-gray-200"
                    >
                      <Building2 className="w-4 h-4 text-emerald-500" />
                      <span>All Listings</span>
                    </Link>
                    <Link
                      href="/listing?purpose=buy"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      <span>Buy Residential</span>
                    </Link>
                    <Link
                      href="/listing?purpose=rent"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <Building2 className="w-4 h-4 text-emerald-500" />
                      <span>Rent Homes</span>
                    </Link>
                    <Link
                      href="/listing?type=villa"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <Building2 className="w-4 h-4 text-emerald-500" />
                      <span>Villas & Penthouses</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Invest Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('invest')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    pathname.startsWith('/invest-properties') || pathname.startsWith('/calculators')
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>Invest</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {activeMenu === 'invest' && (
                  <div className="absolute left-0 mt-1 w-64 rounded-2xl glass-dropdown shadow-xl p-2 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-100">
                    <Link
                      href="/invest-properties"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold text-gray-800 dark:text-gray-200"
                    >
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span>Commercial (9%+ Yield)</span>
                    </Link>
                    <Link
                      href="/calculators?tab=emi"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <Calculator className="w-4 h-4 text-teal-500" />
                      <span>EMI Calculator</span>
                    </Link>
                    <Link
                      href="/calculators?tab=stamp"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <FileText className="w-4 h-4 text-amber-500" />
                      <span>Stamp Duty Calculator</span>
                    </Link>
                    <Link
                      href="/calculators?tab=roi"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span>Rental Yield Estimator</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Company Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('company')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    pathname === '/agents' || pathname === '/reviews' || pathname === '/gallery' || pathname === '/blogs' || pathname === '/plans' || pathname === '/contact'
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>Company</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {activeMenu === 'company' && (
                  <div className="absolute left-0 mt-1 w-60 rounded-2xl glass-dropdown shadow-xl p-2 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-100">
                    <Link
                      href="/agents"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Verified Agents</span>
                    </Link>
                    <Link
                      href="/reviews"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>4.9★ Reviews</span>
                    </Link>
                    <Link
                      href="/gallery"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <ImageIcon className="w-4 h-4 text-emerald-500" />
                      <span>Photo Gallery</span>
                    </Link>
                    <Link
                      href="/blogs"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-500" />
                      <span>Insights & Guides</span>
                    </Link>
                    <Link
                      href="/plans"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <Zap className="w-4 h-4 text-emerald-500" />
                      <span>Pricing Plans</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-500" />
                      <span>Contact HQ</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Policies Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('policies')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    pathname.startsWith('/policy')
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>Policies</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {activeMenu === 'policies' && (
                  <div className="absolute left-0 mt-1 w-60 rounded-2xl glass-dropdown shadow-xl p-2 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-100">
                    <Link
                      href="/policy?tab=privacy"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <Lock className="w-4 h-4 text-emerald-500" />
                      <span>Privacy Policy</span>
                    </Link>
                    <Link
                      href="/policy?tab=terms"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <FileText className="w-4 h-4 text-emerald-500" />
                      <span>Terms of Service</span>
                    </Link>
                    <Link
                      href="/policy?tab=rera"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>RERA Disclosures</span>
                    </Link>
                    <Link
                      href="/policy?tab=broker_code"
                      className="flex items-center space-x-2 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <Scale className="w-4 h-4 text-emerald-500" />
                      <span>Broker Code</span>
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Right: Clean Single-Line Controls */}
            <div className="flex items-center space-x-2 shrink-0">
              {/* Search Pill */}
              <button
                onClick={onOpenSearch}
                aria-label="Search"
                className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-500 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                <Search className="w-3.5 h-3.5 text-emerald-500" />
                <span>Search</span>
                <kbd className="px-1 py-0.2 text-[9px] bg-white dark:bg-gray-900 border rounded">⌘K</kbd>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Portals Single-Word Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Portals</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {portalDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-2xl glass-dropdown shadow-2xl p-2 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setPortalDropdownOpen(false)}
                  >
                    <button
                      onClick={() => openAuthWithRole('user')}
                      className="w-full flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-left transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="text-xs font-bold text-gray-900 dark:text-white">Buyer Portal</div>
                        <div className="text-[10px] text-gray-400">Saved homes & tours</div>
                      </div>
                    </button>

                    <button
                      onClick={() => openAuthWithRole('agent')}
                      className="w-full flex items-center space-x-2.5 p-2 rounded-xl hover:bg-teal-50 dark:hover:bg-teal-950/40 text-left transition-colors cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4 text-teal-600" />
                      <div>
                        <div className="text-xs font-bold text-gray-900 dark:text-white">Broker Hub</div>
                        <div className="text-[10px] text-gray-400">Listings & Leads CRM</div>
                      </div>
                    </button>

                    <button
                      onClick={() => openAuthWithRole('admin')}
                      className="w-full flex items-center space-x-2.5 p-2 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/40 text-left transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="text-xs font-bold text-gray-900 dark:text-white">Admin Console</div>
                        <div className="text-[10px] text-gray-400">Approvals & Operations</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Post Free Property CTA */}
              <button
                onClick={onOpenPostProperty}
                className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            {/* Quick Portals Row */}
            <div className="grid grid-cols-3 gap-2 pb-2 border-b border-gray-100 dark:border-gray-800 text-center">
              <button
                onClick={() => openAuthWithRole('user')}
                className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold"
              >
                Buyer
              </button>
              <button
                onClick={() => openAuthWithRole('agent')}
                className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold"
              >
                Broker
              </button>
              <button
                onClick={() => openAuthWithRole('admin')}
                className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-xs font-bold"
              >
                Admin
              </button>
            </div>

            {/* Menu Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Home
              </Link>
              <Link href="/listing" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Properties
              </Link>
              <Link href="/invest-properties" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-emerald-600">
                Invest
              </Link>
              <Link href="/calculators" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Calculators
              </Link>
              <Link href="/agents" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Agents
              </Link>
              <Link href="/reviews" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Reviews
              </Link>
              <Link href="/plans" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Pricing
              </Link>
              <Link href="/policy" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Policies
              </Link>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenPostProperty) onOpenPostProperty();
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center justify-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Post Property</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent navbar cover */}
      <div className="h-16" />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialRole={authRole}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
