'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  TrendingUp, 
  LogOut, 
  AlertTriangle,
  FileText,
  DollarSign
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import confetti from 'canvas-confetti';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'approvals' | 'agents' | 'telemetry'>('approvals');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const [pendingListings, setPendingListings] = useState([
    {
      id: 'pend-1',
      title: 'Shalimar Park 3 BHK Lakeview',
      locality: 'Shahpura, Bhopal',
      ownerName: 'Dr. Vivek Saxena',
      phone: '+91 94251 22334',
      price: '₹95,00,000',
      reraId: 'P-BPL-23-9912',
      submittedDate: '1 hour ago',
      status: 'Pending Verification'
    },
    {
      id: 'pend-2',
      title: 'Indore IT Park Office Suite',
      locality: 'Khandwa Road, Indore',
      ownerName: 'Malwa Tech Ventures',
      phone: '+91 98263 77889',
      price: '₹1,45,00,000',
      reraId: 'P-IND-22-4411',
      submittedDate: '3 hours ago',
      status: 'Pending Verification'
    }
  ]);

  const handleApprove = (id: string) => {
    setPendingListings(prev => prev.filter(p => p.id !== id));
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  const handleReject = (id: string) => {
    setPendingListings(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenPostProperty={() => setIsPostOpen(true)} 
      />

      {/* Admin Header */}
      <section className="bg-purple-950 text-white py-8 border-b border-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-black text-xl shadow-xl">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold">
                    Homelyf Master Admin Console
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-800 text-purple-200">
                    Root Access
                  </span>
                </div>
                <div className="text-xs text-purple-300 mt-0.5">
                  admin@homelyf.in • Real-Time RERA Verification & Fleet Operations
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPostOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                + Post System Inventory
              </button>
              <Link
                href="/"
                className="px-3.5 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-900 text-xs font-semibold text-purple-200 flex items-center space-x-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </Link>
            </div>
          </div>

          {/* Admin Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-purple-900/80">
            <div className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-800/80">
              <div className="text-[10px] uppercase font-bold text-purple-300">Pending Approvals</div>
              <div className="text-2xl font-black text-amber-400 mt-0.5">{pendingListings.length} In Queue</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-800/80">
              <div className="text-[10px] uppercase font-bold text-purple-300">Active RERA Listings</div>
              <div className="text-2xl font-black text-emerald-400 mt-0.5">8,420 Live</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-800/80">
              <div className="text-[10px] uppercase font-bold text-purple-300">Channel Partners</div>
              <div className="text-2xl font-black text-white mt-0.5">142 Brokers</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-800/80">
              <div className="text-[10px] uppercase font-bold text-purple-300">Platform GMV Facilitated</div>
              <div className="text-2xl font-black text-teal-300 mt-0.5">₹518.5 Cr</div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 text-xs font-bold pt-4">
          <button
            onClick={() => setActiveTab('approvals')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'approvals' ? 'border-purple-600 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500'
            }`}
          >
            Listing Approval Queue ({pendingListings.length})
          </button>
          <button
            onClick={() => setActiveTab('agents')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'agents' ? 'border-purple-600 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500'
            }`}
          >
            Channel Partner Audit
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'telemetry' ? 'border-purple-600 text-purple-600 dark:text-purple-400' : 'border-transparent text-gray-500'
            }`}
          >
            System Telemetry & Health
          </button>
        </div>
      </div>

      {/* Content Area */}
      <main className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full space-y-6">
        {activeTab === 'approvals' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Pending Title & RERA Verification Queue
            </h2>

            {pendingListings.length === 0 ? (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">All Clear!</h3>
                <p className="text-xs text-gray-500">Zero pending listing approvals in the moderation backlog.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingListings.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{p.price}</span>
                        <span className="text-xs text-gray-400">• RERA: {p.reraId}</span>
                        <span className="text-xs text-gray-400">• Submitted {p.submittedDate}</span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">{p.title}</h3>
                      <div className="text-xs text-gray-500">
                        Location: <strong>{p.locality}</strong> | Owner: <strong>{p.ownerName}</strong> ({p.phone})
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleReject(p.id)}
                        className="px-4 py-2 rounded-xl bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold text-xs flex items-center space-x-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                      <button
                        onClick={() => handleApprove(p.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1 shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verify & Approve Live</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Channel Partner Compliance Checklist</h3>
            <p className="text-xs text-gray-500">
              100% of active brokers in Bhopal and Indore are verified against official MP-RERA registries.
            </p>
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-xs text-purple-900 dark:text-purple-300">
              ✓ Automated Daily RERA API Sync: All 142 broker licenses are active with 0 disciplinary flags.
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">System Infrastructure Telemetry</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border">
                <div className="text-gray-400">Vercel Edge CDN</div>
                <div className="text-sm font-bold text-emerald-600 mt-1">Operational (bom1 Edge)</div>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border">
                <div className="text-gray-400">DNS Resolution</div>
                <div className="text-sm font-bold text-emerald-600 mt-1">homelyf.thewebvale.com</div>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border">
                <div className="text-gray-400">AI Concierge Model</div>
                <div className="text-sm font-bold text-emerald-600 mt-1">Sub-Second Active</div>
              </div>
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
