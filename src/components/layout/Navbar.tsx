'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  ShieldCheck,
  User,
  Briefcase,
  Lock,
  ArrowRight,
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
  
  // Mega menu hover/click states
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<AuthRole>('user');

  const pathname = usePathname();
  const router = useRouter();

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md border-b border-gray-200/60 dark:border-gray-800/60 py-2.5'
            : 'bg-white/85 dark:bg-gray-950/85 backdrop-blur-md border-b border-gray-200/40 dark:border-gray-800/40 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & City Selector */}
            <div className="flex items-center space-x-3.5">
              <Link href="/" className="flex items-center space-x-2.5 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center">
                    HOMELYF<span className="text-emerald-500">.IN</span>
                    <span className="text-[9px] ml-1.5 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                      PRO
                    </span>
                  </span>
                  <span className="text-[9px] font-medium text-gray-400 -mt-1 hidden sm:block">
                    Verified Real Estate Marketplace
                  </span>
                </div>
              </Link>

              {/* City Selector */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gray-100/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{selectedCity}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {cityDropdownOpen && (
                  <div
                    className="absolute left-0 mt-2 w-44 rounded-2xl glass-dropdown shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setCityDropdownOpen(false)}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-gray-400 border-b border-gray-100 dark:border-gray-800">
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
                            ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50/50'
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

            {/* Desktop Mega Menu Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  pathname === '/'
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Home
              </Link>

              {/* 1. Explore Properties Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('properties')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    pathname.startsWith('/listing')
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>Properties</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {activeMenu === 'properties' && (
                  <div className="absolute left-0 mt-1 w-72 rounded-3xl glass-dropdown shadow-2xl p-3 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-gray-800 mb-1.5">
                      Explore Listings
                    </div>
                    <Link
                      href="/listing"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <Building2 className="w-4 h-4 text-emerald-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-bold">All Verified Listings</div>
                        <div className="text-[10px] text-gray-400">8,000+ properties across India</div>
                      </div>
                    </Link>
                    <Link
                      href="/listing?purpose=buy"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Buy Residential</div>
                        <div className="text-[10px] text-gray-400">Apartments, Flats & Duplexes</div>
                      </div>
                    </Link>
                    <Link
                      href="/listing?purpose=rent"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <Building2 className="w-4 h-4 text-emerald-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Rentals (Zero Deposit/Brokerage)</div>
                        <div className="text-[10px] text-gray-400">Furnished & Semi-Furnished</div>
                      </div>
                    </Link>
                    <Link
                      href="/listing?type=villa"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <Building2 className="w-4 h-4 text-emerald-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Villas & Luxury Penthouses</div>
                        <div className="text-[10px] text-gray-400">Lakeview & Gated Townships</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* 2. Invest & Calculators Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('invest')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    pathname.startsWith('/invest-properties') || pathname.startsWith('/calculators')
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>Invest & Tools</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-emerald-500 text-white">9%+</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {activeMenu === 'invest' && (
                  <div className="absolute left-0 mt-1 w-80 rounded-3xl glass-dropdown shadow-2xl p-3 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-gray-800 mb-1.5">
                      Investment & Financial Engines
                    </div>
                    <Link
                      href="/invest-properties"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-bold">Pre-Leased Commercial Assets</div>
                        <div className="text-[10px] text-gray-400">9% to 11.2% Net Monthly Yields</div>
                      </div>
                    </Link>
                    <Link
                      href="/calculators?tab=emi"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <Calculator className="w-4 h-4 text-teal-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Home Loan EMI Calculator</div>
                        <div className="text-[10px] text-gray-400">SBI, HDFC, ICICI Instant Rates</div>
                      </div>
                    </Link>
                    <Link
                      href="/calculators?tab=stamp"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <FileText className="w-4 h-4 text-amber-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Stamp Duty Calculator (MP & India)</div>
                        <div className="text-[10px] text-gray-400">Official registry fee estimation</div>
                      </div>
                    </Link>
                    <Link
                      href="/calculators?tab=roi"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400">Rental Yield & ROI Estimator</div>
                        <div className="text-[10px] text-gray-400">5-Year IRR & cash-flow models</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* 3. Network & Trust Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('network')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    pathname === '/agents' || pathname === '/reviews' || pathname === '/gallery' || pathname === '/blogs' || pathname === '/plans'
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>Company</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {activeMenu === 'network' && (
                  <div className="absolute left-0 mt-1 w-72 rounded-3xl glass-dropdown shadow-2xl p-3 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-150">
                    <Link
                      href="/agents"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-bold">RERA Certified Agents</div>
                        <div className="text-[10px] text-gray-400">Verified local property advisors</div>
                      </div>
                    </Link>
                    <Link
                      href="/reviews"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-bold">4.9★ Google Reviews</div>
                        <div className="text-[10px] text-gray-400">840+ customer testimonials</div>
                      </div>
                    </Link>
                    <Link
                      href="/gallery"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <ImageIcon className="w-4 h-4 text-emerald-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-bold">Architectural Gallery</div>
                        <div className="text-[10px] text-gray-400">HD photo walkthroughs</div>
                      </div>
                    </Link>
                    <Link
                      href="/blogs"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-bold">PropTech Insights</div>
                        <div className="text-[10px] text-gray-400">Market reports & buyer guides</div>
                      </div>
                    </Link>
                    <Link
                      href="/plans"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <Zap className="w-4 h-4 text-emerald-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-bold">Subscription & Pricing</div>
                        <div className="text-[10px] text-gray-400">Owners, Brokers & Builders</div>
                      </div>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-500" />
                      <div>
                        <div className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-bold">Bhopal Headquarters</div>
                        <div className="text-[10px] text-gray-400">MP Nagar Zone-2 Office</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* 4. Policies Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveMenu('policy')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    pathname.startsWith('/policy')
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>Policy & Legal</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {activeMenu === 'policy' && (
                  <div className="absolute left-0 mt-1 w-64 rounded-3xl glass-dropdown shadow-2xl p-3 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-150">
                    <Link
                      href="/policy?tab=privacy"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <Lock className="w-4 h-4 text-emerald-500" />
                      <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-medium">Privacy Policy</span>
                    </Link>
                    <Link
                      href="/policy?tab=terms"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <FileText className="w-4 h-4 text-emerald-500" />
                      <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-medium">Terms of Service</span>
                    </Link>
                    <Link
                      href="/policy?tab=rera"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-medium">MP-RERA Disclosures</span>
                    </Link>
                    <Link
                      href="/policy?tab=broker_code"
                      className="flex items-center space-x-2.5 p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold text-gray-800 dark:text-gray-200 group"
                    >
                      <Scale className="w-4 h-4 text-emerald-500" />
                      <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-medium">Broker Code of Conduct</span>
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Right-Hand Tools: Search, Theme, Login Panel, Post Free Property */}
            <div className="flex items-center space-x-2 sm:space-x-2.5">
              {/* Search Pill */}
              <button
                onClick={onOpenSearch}
                aria-label="Search properties"
                className="hidden xl:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-500 text-xs font-medium transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-emerald-500" />
                <span>Search...</span>
                <kbd className="px-1.5 py-0.5 text-[9px] font-semibold bg-white dark:bg-gray-900 border rounded">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Tri-Role Sign In / Portal Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Portals & Login</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {portalDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 rounded-3xl glass-dropdown shadow-2xl p-3 z-50 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-150"
                    onMouseLeave={() => setPortalDropdownOpen(false)}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-gray-800 mb-1.5">
                      Select Access Level
                    </div>

                    {/* 1. Buyer Portal */}
                    <button
                      onClick={() => openAuthWithRole('user')}
                      className="w-full flex items-start space-x-2.5 p-2.5 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-left transition-colors cursor-pointer group"
                    >
                      <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-emerald-600">
                          Buyer / Tenant Login
                        </div>
                        <div className="text-[10px] text-gray-400">
                          Manage saved homes, site visits & loans
                        </div>
                      </div>
                    </button>

                    {/* 2. Broker Portal */}
                    <button
                      onClick={() => openAuthWithRole('agent')}
                      className="w-full flex items-start space-x-2.5 p-2.5 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-left transition-colors cursor-pointer group"
                    >
                      <div className="p-2 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-teal-600">
                          Broker / Agent Console
                        </div>
                        <div className="text-[10px] text-gray-400">
                          Manage inventory, leads & WhatsApp CRM
                        </div>
                      </div>
                    </button>

                    {/* 3. Admin Console */}
                    <button
                      onClick={() => openAuthWithRole('admin')}
                      className="w-full flex items-start space-x-2.5 p-2.5 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-950/40 text-left transition-colors cursor-pointer group"
                    >
                      <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-purple-600">
                          Master Admin Console
                        </div>
                        <div className="text-[10px] text-gray-400">
                          Verify listings, RERA audit & system
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Post Free Property CTA */}
              <button
                onClick={onOpenPostProperty}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post Free Listing</span>
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-4 pt-3 pb-6 mt-2 space-y-3 animate-in slide-in-from-top-4 duration-200">
            {/* Quick Portals Row */}
            <div className="grid grid-cols-3 gap-2 pb-2 border-b border-gray-100 dark:border-gray-800 text-center">
              <button
                onClick={() => openAuthWithRole('user')}
                className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold"
              >
                👤 Buyer
              </button>
              <button
                onClick={() => openAuthWithRole('agent')}
                className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 text-xs font-bold"
              >
                🏢 Broker
              </button>
              <button
                onClick={() => openAuthWithRole('admin')}
                className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-xs font-bold"
              >
                🛡️ Admin
              </button>
            </div>

            {/* Menu Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Home
              </Link>
              <Link href="/listing" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Listings
              </Link>
              <Link href="/invest-properties" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-emerald-600">
                Invest Hub (9%+)
              </Link>
              <Link href="/calculators" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Calculators
              </Link>
              <Link href="/agents" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Verified Agents
              </Link>
              <Link href="/reviews" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                4.9★ Reviews
              </Link>
              <Link href="/plans" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Pricing Plans
              </Link>
              <Link href="/policy" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Policy & Legal
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                Contact HQ
              </Link>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenPostProperty) onOpenPostProperty();
                }}
                className="w-full py-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center justify-center space-x-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Free Property Listing</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent navbar cover */}
      <div className="h-18" />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialRole={authRole}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
