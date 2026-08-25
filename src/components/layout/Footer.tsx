'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Lock, 
  Award, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Heart,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 relative overflow-hidden">
      {/* Tier 1: Stats & Credibility Reassurance Bar */}
      <div className="border-b border-gray-800/80 bg-gray-950/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">8,000+</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Verified Listings</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">150+</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Cities Covered</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">0%</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Hidden Brokerage</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">4.9 ★</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Google Rating (840+)</div>
            </div>
            <div className="pt-3 md:pt-0 col-span-2 md:col-span-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">₹500Cr+</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">Transaction Volume</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2: Main Sitemap & Brand Narrative */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Headquarters Coordinates */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-gray-950 font-black shadow-lg shadow-emerald-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                HOMELYF<span className="text-emerald-400">.IN</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed pr-6">
              Homelyf Solutions is India’s premier transparent real estate marketplace. We eliminate predatory brokerages, verify 100% of property titles and RERA certifications, and deliver direct end-to-end digital property solutions.
            </p>
            <div className="pt-2 space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Headquarters:</strong> Plot No. 218, Zone-2, MP Nagar, Bhopal, Madhya Pradesh 462011, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Direct Line:</strong> +91 84390 44541 / +91 96856 37312</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>Email Support:</strong> hello@homelyf.in / homelyfsolutions@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links & Properties */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Real Estate Hubs
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/listing?city=Bhopal" className="hover:text-emerald-400 transition-colors">
                  Bhopal Properties
                </Link>
              </li>
              <li>
                <Link href="/listing?locality=Arera+Colony" className="hover:text-emerald-400 transition-colors">
                  Arera Colony Luxury
                </Link>
              </li>
              <li>
                <Link href="/listing?locality=MP+Nagar" className="hover:text-emerald-400 transition-colors">
                  MP Nagar Commercial
                </Link>
              </li>
              <li>
                <Link href="/listing?city=Indore" className="hover:text-emerald-400 transition-colors">
                  Indore Super Corridor
                </Link>
              </li>
              <li>
                <Link href="/invest-properties" className="hover:text-emerald-400 transition-colors flex items-center">
                  Pre-Leased Commercial <span className="ml-1 text-[9px] bg-emerald-950 text-emerald-300 px-1 py-0.5 rounded">9%+ ROI</span>
                </Link>
              </li>
              <li>
                <Link href="/listing?type=villa" className="hover:text-emerald-400 transition-colors">
                  Independent Villas
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Calculators & Tools */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Financial Toolkits
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/calculators?tab=emi" className="hover:text-emerald-400 transition-colors">
                  Home Loan EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=stamp" className="hover:text-emerald-400 transition-colors">
                  Stamp Duty Calculator (MP)
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=roi" className="hover:text-emerald-400 transition-colors">
                  Rental Yield & ROI Estimator
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-emerald-400 transition-colors">
                  4.9★ Google Reviews
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-emerald-400 transition-colors">
                  Photo & Video Gallery
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-emerald-400 transition-colors">
                  PropTech Market Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Partner, Portals & Compliance */}
          <div>
            <div className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Portals & Compliance
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/portal/user" className="hover:text-emerald-400 transition-colors">
                  👤 Buyer & Tenant Portal
                </Link>
              </li>
              <li>
                <Link href="/portal/agent" className="hover:text-emerald-400 transition-colors">
                  🏢 Broker / Partner Console
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition-colors">
                  🛡️ Master Admin Console
                </Link>
              </li>
              <li>
                <Link href="/policy" className="hover:text-emerald-400 transition-colors text-emerald-300 font-medium">
                  📜 Policy & Legal Center
                </Link>
              </li>
              <li>
                <Link href="/plans" className="hover:text-emerald-400 transition-colors">
                  Listing Pricing & Plans
                </Link>
              </li>
              <li>
                <a 
                  href="https://rera.mp.gov.in" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-emerald-400 transition-colors flex items-center"
                >
                  MP-RERA Official Portal <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tier 3: Consultation Action Bar */}
      <div className="border-t border-b border-gray-800 bg-emerald-950/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Need Personal Real Estate Advisory in Central India?</div>
              <div className="text-xs text-gray-400">Speak directly with our senior RERA advisors in Bhopal & Indore.</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <a
              href="https://wa.me/918439044541?text=Hi%20Homelyf%2C%20I%20am%20looking%20for%20property%20advisory."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-all border border-gray-700 active:scale-95"
            >
              Book Site Visit
            </Link>
          </div>
        </div>
      </div>

      {/* Tier 4: Security Badges & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-gray-400">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit SSL Encrypted</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1.5 text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>RERA Compliant Framework</span>
          </div>
        </div>
        <div className="text-center sm:text-right">
          © {new Date().getFullYear()} Homelyf Solutions Private Limited. All Rights Reserved. Custom Domain: <span className="text-emerald-400 font-mono">homelyf.thewebvale.com</span>
        </div>
      </div>
    </footer>
  );
}
