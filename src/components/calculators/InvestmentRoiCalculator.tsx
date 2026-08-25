'use client';

import React, { useState, useMemo } from 'react';
import { TrendingUp, Percent, Award, AlertCircle } from 'lucide-react';

export default function InvestmentRoiCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(25000000); // 2.5 Cr
  const [monthlyRent, setMonthlyRent] = useState(190000);       // 1.9 Lakhs/mo
  const [annualMaintenance, setAnnualMaintenance] = useState(60000);
  const [expectedAppreciation, setExpectedAppreciation] = useState(8.5); // 8.5%

  const metrics = useMemo(() => {
    const annualGrossRent = monthlyRent * 12;
    const annualNetRent = annualGrossRent - annualMaintenance;
    const grossYield = ((annualGrossRent / propertyPrice) * 100).toFixed(2);
    const netYield = ((annualNetRent / propertyPrice) * 100).toFixed(2);
    const estimatedValue5Y = Math.round(propertyPrice * Math.pow(1 + expectedAppreciation / 100, 5));
    const total5YRent = annualNetRent * 5 * 1.15; // with 15% escalation
    const total5YReturn = estimatedValue5Y - propertyPrice + total5YRent;
    const simpleIrr = (((total5YReturn / propertyPrice) / 5) * 100).toFixed(1);

    return {
      annualGrossRent,
      annualNetRent,
      grossYield,
      netYield,
      estimatedValue5Y,
      total5YRent,
      total5YReturn,
      simpleIrr
    };
  }, [propertyPrice, monthlyRent, annualMaintenance, expectedAppreciation]);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Commercial Rental Yield & ROI Estimator
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Analyze gross vs net rental yields, 5-year capital appreciation, and IRR metrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm font-semibold">
              <span>Asset Purchase Price</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{formatINR(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={2500000}
              max={100000000}
              step={500000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm font-semibold">
              <span>Monthly Rental Payout (Tenant Lease)</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{formatINR(monthlyRent)} / mo</span>
            </div>
            <input
              type="range"
              min={20000}
              max={1000000}
              step={5000}
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm font-semibold">
              <span>Expected Annual Capital Appreciation (%)</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{expectedAppreciation}% p.a.</span>
            </div>
            <input
              type="range"
              min={3}
              max={20}
              step={0.5}
              value={expectedAppreciation}
              onChange={(e) => setExpectedAppreciation(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 bg-amber-50/50 dark:bg-gray-950/60 border border-amber-100 dark:border-amber-950/50 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-center pb-4 border-b border-amber-100 dark:border-gray-800">
              <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-amber-200 dark:border-gray-800">
                <div className="text-[10px] uppercase font-bold text-gray-500">Gross Rental Yield</div>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">{metrics.grossYield}%</div>
              </div>
              <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-amber-200 dark:border-gray-800">
                <div className="text-[10px] uppercase font-bold text-gray-500">Net Rental Yield</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{metrics.netYield}%</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">Annual Net Rental Income</span>
                <span className="font-bold text-gray-900 dark:text-white">{formatINR(metrics.annualNetRent)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500">Estimated Value in 5 Years</span>
                <span className="font-bold text-gray-900 dark:text-white">{formatINR(metrics.estimatedValue5Y)}</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-sm text-gray-900 dark:text-white">
                <span>Estimated Annualized IRR</span>
                <span className="text-emerald-600 dark:text-emerald-400">~{metrics.simpleIrr}% p.a.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
