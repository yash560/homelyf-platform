'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Heart, 
  Calendar, 
  FileCheck, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  PlusCircle, 
  ArrowRight,
  LogOut,
  Building2
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import { PROPERTIES } from '@/data/properties';

export default function UserPortalPage() {
  const [activeTab, setActiveTab] = useState<'saved' | 'visits' | 'loans'>('saved');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const savedProperties = PROPERTIES.slice(0, 3);

  const bookedVisits = [
    {
      id: 'vis-1',
      propertyTitle: 'Emerald Heights Luxury Residences',
      locality: 'Arera Colony, Bhopal',
      date: 'Tomorrow, 11:30 AM',
      mode: 'In-Person (Free Chauffeur Pick & Drop)',
      advisorName: 'Rajesh Sharma',
      phone: '+91 84390 44541',
      status: 'Confirmed'
    },
    {
      id: 'vis-2',
      propertyTitle: 'The Pinnacle Grand 3 BHK',
      locality: 'Vijay Nagar, Indore',
      date: 'Saturday, 04:00 PM',
      mode: 'Live HD Video Walkthrough',
      advisorName: 'Pooja Agarwal',
      phone: '+91 84390 44541',
      status: 'Scheduled'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenPostProperty={() => setIsPostOpen(true)} 
      />

      {/* User Dashboard Header */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-black text-xl shadow-lg">
                U
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                    Dr. Amitav Mukherji
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    Verified Buyer
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  buyer@homelyf.in • +91 98260 11223 • Bhopal Market
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPostOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
              >
                + Post Property Free
              </button>
              <Link
                href="/"
                className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 border-t border-gray-100 dark:border-gray-800 mt-6 pt-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('saved')}
              className={`pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'saved'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Saved Properties ({savedProperties.length})
            </button>

            <button
              onClick={() => setActiveTab('visits')}
              className={`pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'visits'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Scheduled Site Visits ({bookedVisits.length})
            </button>

            <button
              onClick={() => setActiveTab('loans')}
              className={`pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'loans'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Home Loan Pre-Approval Desk
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full space-y-6">
        {activeTab === 'saved' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Bookmarked Properties</h2>
              <Link href="/listing" className="text-xs font-bold text-emerald-600 hover:underline">
                Explore More Properties →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-gray-900">
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 text-red-500">
                      <Heart className="w-4 h-4 fill-red-500" />
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/80 text-white text-xs font-bold">
                      {prop.priceFormatted}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{prop.title}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 mr-1" />
                      <span>{prop.location.locality}, {prop.location.city}</span>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex space-x-2">
                    <Link
                      href={`/listing?search=${encodeURIComponent(prop.location.locality)}`}
                      className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-center"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/${prop.agent.whatsapp}?text=Hi%2C%20following%20up%20on%20my%20saved%20property%20${encodeURIComponent(prop.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'visits' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Active Site Visit Schedule</h2>
            <div className="space-y-3">
              {bookedVisits.map((vis) => (
                <div
                  key={vis.id}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {vis.status}
                      </span>
                      <span className="text-xs text-gray-400">• {vis.mode}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">{vis.propertyTitle}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 mr-1" />
                      <span>{vis.locality}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-3.5 h-3.5 text-emerald-500 mr-1" />
                      <span>{vis.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <a
                      href={`tel:${vis.phone}`}
                      className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold flex items-center space-x-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Driver / Advisor</span>
                    </a>
                    <a
                      href="https://wa.me/918439044541?text=Hi%2C%20following%20up%20on%20my%20scheduled%20site%20visit."
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'loans' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  SBI & HDFC Pre-Approved Home Loan
                </h3>
                <div className="text-xs text-gray-500">Sanction Limit: Up to ₹1.20 Crores @ 8.35% p.a.</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-900 dark:text-emerald-300 space-y-1">
              <div className="font-bold">✓ Documents Pre-Verified</div>
              <p>Your KYC, ITR submissions, and property legal title checks are completed. Instant disbursal ready on final agreement execution.</p>
            </div>
          </div>
        )}
      </main>

      <Footer />

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
