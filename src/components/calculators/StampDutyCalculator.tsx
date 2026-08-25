'use client';

import React, { useState, useMemo } from 'react';
import { FileText, Shield, Info, CheckCircle2 } from 'lucide-react';

export default function StampDutyCalculator() {
  const [propertyValue, setPropertyValue] = useState(6000000); // 60 Lakhs
  const [selectedState, setSelectedState] = useState<'MP' | 'MH' | 'KA' | 'DL' | 'UP'>('MP');
  const [buyerGender, setBuyerGender] = useState<'male' | 'female' | 'joint'>('male');

  const rates = {
    MP: {
      male: { stamp: 7.5, reg: 3.0 },
      female: { stamp: 7.5, reg: 3.0 }, // MP state uniform / municipal surcharge
      joint: { stamp: 7.5, reg: 3.0 }
    },
    MH: {
      male: { stamp: 6.0, reg: 1.0 },
      female: { stamp: 5.0, reg: 1.0 },
      joint: { stamp: 5.5, reg: 1.0 }
    },
    KA: {
      male: { stamp: 5.6, reg: 1.0 },
      female: { stamp: 5.6, reg: 1.0 },
      joint: { stamp: 5.6, reg: 1.0 }
    },
    DL: {
      male: { stamp: 6.0, reg: 1.0 },
      female: { stamp: 4.0, reg: 1.0 },
      joint: { stamp: 5.0, reg: 1.0 }
    },
    UP: {
      male: { stamp: 7.0, reg: 1.0 },
      female: { stamp: 6.0, reg: 1.0 },
      joint: { stamp: 6.5, reg: 1.0 }
    }
  };

  const calc = useMemo(() => {
    const stateConfig = rates[selectedState][buyerGender];
    const stampAmount = (propertyValue * stateConfig.stamp) / 100;
    const regAmount = Math.min((propertyValue * stateConfig.reg) / 100, 30000); // capped in some states or proportional
    const totalGovtCharges = stampAmount + regAmount;

    return {
      stampRate: stateConfig.stamp,
      regRate: stateConfig.reg,
      stampAmount,
      regAmount,
      totalGovtCharges
    };
  }, [propertyValue, selectedState, buyerGender]);

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
        <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Stamp Duty & Registry Fee Calculator
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Official government registration charges calculation across Madhya Pradesh & other states.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          {/* State Selector */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              State of Registration
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[
                { code: 'MP', name: 'Madhya Pradesh' },
                { code: 'MH', name: 'Maharashtra' },
                { code: 'KA', name: 'Karnataka' },
                { code: 'DL', name: 'Delhi NCR' },
                { code: 'UP', name: 'Uttar Pradesh' }
              ].map((s) => (
                <button
                  key={s.code}
                  type="button"
                  onClick={() => setSelectedState(s.code as any)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedState === s.code
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {s.code}
                </button>
              ))}
            </div>
          </div>

          {/* Property Agreement Value Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-gray-700 dark:text-gray-300">Property Agreement Value</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold text-base">
                {formatINR(propertyValue)}
              </span>
            </div>
            <input
              type="range"
              min={1000000}
              max={30000000}
              step={200000}
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
          </div>

          {/* Buyer Gender & Ownership */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Primary Buyer Ownership
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'male', label: 'Male Buyer' },
                { id: 'female', label: 'Female Buyer (Discount)' },
                { id: 'joint', label: 'Joint (Male + Female)' }
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setBuyerGender(g.id as any)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                    buyerGender === g.id
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 bg-teal-50/50 dark:bg-gray-950/60 border border-teal-100 dark:border-teal-950/50 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-teal-100 dark:border-gray-800">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
                Total Government Charges
              </span>
              <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">
                {formatINR(calc.totalGovtCharges)}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                Stamp Duty + Legal Registration Fee
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">Stamp Duty ({calc.stampRate}%)</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{formatINR(calc.stampAmount)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">Registration Fee</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{formatINR(calc.regAmount)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold text-sm text-gray-900 dark:text-white">
                <span>Total Acquisition Cost</span>
                <span className="text-teal-600 dark:text-teal-400">{formatINR(propertyValue + calc.totalGovtCharges)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-teal-100/70 dark:bg-teal-950/60 text-xs text-teal-900 dark:text-teal-300 flex items-start space-x-2">
            <Shield className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Homelyf verified advocates assist with 100% digital slot booking & registry execution at Bhopal Sub-Registrar Office.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
