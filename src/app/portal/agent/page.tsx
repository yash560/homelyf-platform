'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Building, 
  Users, 
  DollarSign, 
  PlusCircle, 
  MessageSquare, 
  Phone, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  LogOut,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import { PROPERTIES } from '@/data/properties';
import confetti from 'canvas-confetti';

export default function AgentPortalPage() {
  const [activeTab, setActiveTab] = useState<'leads' | 'listings' | 'earnings'>('leads');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const leads = [
    {
      id: 'ld-1',
      clientName: 'Sanjay Deshmukh',
      phone: '+91 98270 44512',
      property: 'Emerald Heights 3 BHK (Arera Colony)',
      budget: '₹1.25 Cr',
      stage: 'Hot 🔥',
      date: '10 mins ago',
      notes: 'Wants lakeview flat on 7th floor. Bank loan pre-approved with SBI.'
    },
    {
      id: 'ld-2',
      clientName: 'Rohit & Neha Agrawal',
      phone: '+91 94250 88910',
      property: 'Grand Orchard Royal Villa (Kolar Road)',
      budget: '₹1.85 Cr',
      stage: 'Warm ☀️',
      date: '2 hours ago',
      notes: 'Scheduled in-person site visit for Saturday 11 AM.'
    },
    {
      id: 'ld-3',
      clientName: 'Kunal Shah (Investor)',
      phone: '+91 99810 55432',
      property: 'The Imperial Commercial Hub (MP Nagar)',
      budget: '₹2.85 Cr',
      stage: 'Negotiation 🤝',
      date: 'Yesterday',
      notes: 'Requested audited lease deed copy and tenant lock-in agreement.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenPostProperty={() => setIsPostOpen(true)} 
      />

      {/* Broker Profile Banner */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                RS
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                    Rajesh Sharma
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    RERA: A-BPL-20-192
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Principal Luxury Real Estate Advisor • 4.9 ★ (142 Reviews)
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPostOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center space-x-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Property Inventory</span>
              </button>
              <Link
                href="/"
                className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center space-x-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
              <div className="text-[10px] uppercase font-bold text-gray-400">Active Listed Inventory</div>
              <div className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">48 Units</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
              <div className="text-[10px] uppercase font-bold text-gray-400">High-Intent Leads This Week</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">24 Enquiries</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
              <div className="text-[10px] uppercase font-bold text-gray-400">Deals Closed YTD</div>
              <div className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-0.5">18 Closures</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
              <div className="text-[10px] uppercase font-bold text-gray-400">Total Transacted Value</div>
              <div className="text-2xl font-black text-amber-500 mt-0.5">₹26.4 Cr</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 border-t border-gray-100 dark:border-gray-800 mt-6 pt-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('leads')}
              className={`pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'leads' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500'
              }`}
            >
              Client Lead Pipeline ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'listings' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500'
              }`}
            >
              Manage Inventory (48)
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'earnings' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500'
              }`}
            >
              Payouts & Direct Ledger
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full space-y-6">
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Active Buyer Enquiries</h2>
              <button
                onClick={() => setIsPostOpen(true)}
                className="text-xs font-bold text-emerald-600 hover:underline"
              >
                + Add Custom Lead Note
              </button>
            </div>

            <div className="space-y-3">
              {leads.map((ld) => (
                <div
                  key={ld.id}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{ld.clientName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        {ld.stage}
                      </span>
                      <span className="text-xs text-gray-400">• {ld.date}</span>
                    </div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Budget: {ld.budget}
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 p-3 rounded-2xl">
                    <strong>Property:</strong> {ld.property} <br />
                    <strong>Requirement:</strong> {ld.notes}
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <a
                      href={`https://wa.me/${ld.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(ld.clientName)}%2C%20Rajesh%20Sharma%20here%20from%20Homelyf%20regarding%20${encodeURIComponent(ld.property)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      Instant WhatsApp Follow-Up
                    </a>
                    <a
                      href={`tel:${ld.phone}`}
                      className="px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center space-x-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Client</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Active Listed Portfolio</h2>
              <button
                onClick={() => setIsPostOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs"
              >
                + New Inventory Entry
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROPERTIES.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-4 flex space-x-3 items-center shadow-xs"
                >
                  <img src={p.images[0]} alt={p.title} className="w-20 h-20 rounded-2xl object-cover bg-gray-900 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-emerald-600">{p.priceFormatted} • {p.purpose.toUpperCase()}</div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{p.title}</h3>
                    <div className="text-[11px] text-gray-400">{p.location.locality}, {p.location.city}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">✓ RERA Approved: {p.reraId}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Channel Partner Escrow & Payout Ledger</h3>
            <p className="text-xs text-gray-500">
              Direct monthly settlements credited to your registered HDFC Current Account (A/C: •••• 9012).
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-900 dark:text-emerald-300 font-semibold">
              ✓ August 2026 Escrow Cleared: ₹3,45,000 (3 Closures)
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
