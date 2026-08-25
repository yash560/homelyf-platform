'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  DollarSign, 
  Award, 
  Users, 
  Phone,
  FileSpreadsheet
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import InvestmentRoiCalculator from '@/components/calculators/InvestmentRoiCalculator';
import { INVESTMENTS, InvestmentProperty } from '@/data/investments';
import confetti from 'canvas-confetti';

export default function InvestPage() {
  const [selectedAsset, setSelectedAsset] = useState<InvestmentProperty | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [phone, setPhone] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const handleDownloadMemo = (inv: InvestmentProperty) => {
    setSelectedAsset(inv);
    setDownloadSuccess(false);
  };

  const submitMemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setDownloadSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenPostProperty={() => setIsPostOpen(true)} 
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 text-white py-14 sm:py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Institutional Real Estate Syndication Desk</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Pre-Leased Commercial & <br />
              <span className="text-emerald-400">High-Yield Assets (9% - 12% Yield)</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Acquire institutional-grade corporate offices, banking branches, and high-footfall retail anchor stores with blue-chip corporate tenants, locked leases, and direct monthly cash payouts.
            </p>
          </div>
        </div>
      </section>

      {/* Assets Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INVESTMENTS.map((inv) => (
            <div
              key={inv.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between hover:shadow-2xl transition-all group"
            >
              <div>
                <div className="relative h-56 bg-gray-900 overflow-hidden">
                  <img src={inv.image} alt={inv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-emerald-500 text-white font-black text-xs shadow-md">
                    {inv.netYield}% Net Rental Yield
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/80 text-white text-xs font-bold backdrop-blur-xs">
                    {inv.totalValueFormatted}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-xs uppercase font-extrabold text-emerald-600 dark:text-emerald-400">
                      {inv.assetType} • {inv.locality}, {inv.city}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                      {inv.title}
                    </h3>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Monthly Rent Payout:</span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{inv.monthlyRentalPayout}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tenant Covenant:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{inv.tenantName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Lease Lock-in:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{inv.lockInYearsRemaining} Years Left (Total {inv.leaseTermYears} Yrs)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rent Escalation:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{inv.escalationRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">5-Year Projected IRR:</span>
                      <span className="font-bold text-teal-600 dark:text-teal-400">{inv.expectedIrr5Years}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                    {inv.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => handleDownloadMemo(inv)}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Investment Memo (PDF)</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ROI Calculator Hub */}
        <div className="pt-8">
          <InvestmentRoiCalculator />
        </div>
      </section>

      <Footer />

      {/* Download Memo Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                Download Investment Prospectus
              </h3>
              <button onClick={() => setSelectedAsset(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            {downloadSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-gray-900 dark:text-white">Prospectus Dispatched!</h4>
                <p className="text-xs text-gray-500">
                  The audited financials and lease covenant for <strong>{selectedAsset.title}</strong> have been sent to your WhatsApp ({phone}).
                </p>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submitMemoRequest} className="space-y-3">
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Enter your mobile number to receive the full financial cash flow model and tenant lease deed for <strong>{selectedAsset.title}</strong>.
                </p>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">WhatsApp / Mobile</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                >
                  Send Investment Memo via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
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
