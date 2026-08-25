'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calculator, FileText, TrendingUp, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import EmiCalculator from '@/components/calculators/EmiCalculator';
import StampDutyCalculator from '@/components/calculators/StampDutyCalculator';
import InvestmentRoiCalculator from '@/components/calculators/InvestmentRoiCalculator';

function CalculatorsContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'emi';
  const [activeTab, setActiveTab] = useState<'emi' | 'stamp' | 'roi'>(initialTab as any);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)} 
        onOpenPostProperty={() => setIsPostOpen(true)} 
      />

      {/* Header */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Real Estate Financial Toolkits</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Property Financial Calculators
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Compute precise monthly mortgage EMIs, official state stamp duty & registry charges, and commercial net rental yields with instant calculation engines.
          </p>

          {/* Calculator Tabs */}
          <div className="pt-6 flex justify-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-2xl flex space-x-2 max-w-lg w-full">
              <button
                onClick={() => setActiveTab('emi')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                  activeTab === 'emi'
                    ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span>Home Loan EMI</span>
              </button>

              <button
                onClick={() => setActiveTab('stamp')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                  activeTab === 'stamp'
                    ? 'bg-white dark:bg-gray-900 text-teal-600 dark:text-teal-400 shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Stamp Duty</span>
              </button>

              <button
                onClick={() => setActiveTab('roi')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                  activeTab === 'roi'
                    ? 'bg-white dark:bg-gray-900 text-amber-600 dark:text-amber-400 shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Yield & ROI</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        {activeTab === 'emi' && <EmiCalculator />}
        {activeTab === 'stamp' && <StampDutyCalculator />}
        {activeTab === 'roi' && <InvestmentRoiCalculator />}
      </section>

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

export default function CalculatorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Calculators...</div>}>
      <CalculatorsContent />
    </Suspense>
  );
}
