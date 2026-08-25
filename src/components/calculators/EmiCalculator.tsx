'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2, TrendingUp, DollarSign, Percent, Calendar, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(5000000); // 50 Lakhs default
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% default
  const [tenureYears, setTenureYears] = useState(20);     // 20 years default
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculation = useMemo(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    const emi = Math.round((p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;
    const principalPercentage = Math.round((p / totalAmount) * 100);
    const interestPercentage = 100 - principalPercentage;

    return {
      monthlyEmi: emi,
      totalAmount,
      totalInterest,
      principalPercentage,
      interestPercentage
    };
  }, [loanAmount, interestRate, tenureYears]);

  const handleApplyPreApproval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLeadSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

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
        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Home Loan EMI Calculator
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Calculate your monthly repayment, total interest, and get instant bank pre-qualification.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sliders Input Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-gray-700 dark:text-gray-300">Loan Amount (Principal)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-base">
                {formatINR(loanAmount)}
              </span>
            </div>
            <input
              type="range"
              min={500000}
              max={50000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>₹5 Lakhs</span>
              <span>₹2.5 Crores</span>
              <span>₹5 Crores</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-gray-700 dark:text-gray-300">Interest Rate (% p.a.)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-base">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min={6.5}
              max={15.0}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>6.5% (Prime)</span>
              <span>8.5% (Current Avg)</span>
              <span>15.0%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-gray-700 dark:text-gray-300">Loan Tenure</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-base">
                {tenureYears} Years ({tenureYears * 12} Months)
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          {/* Bank Partner Badges */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Preferred Home Loan Partners (Lowest Rates):
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {['SBI (8.35%)', 'HDFC Bank (8.40%)', 'ICICI Bank (8.45%)', 'Bank of Baroda (8.30%)', 'Axis Bank (8.50%)'].map((bank) => (
                <span key={bank} className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                  {bank}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Results & Visual Breakdown */}
        <div className="lg:col-span-5 bg-emerald-50/50 dark:bg-gray-950/60 border border-emerald-100 dark:border-emerald-950/50 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-center pb-4 border-b border-emerald-100 dark:border-gray-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Monthly Loan EMI
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {formatINR(calculation.monthlyEmi)}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                Principal + Interest Payable Every Month
              </div>
            </div>

            {/* Visual Ratio Bar */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-emerald-700 dark:text-emerald-400">Principal: {calculation.principalPercentage}%</span>
                <span className="text-teal-600 dark:text-teal-300">Interest: {calculation.interestPercentage}%</span>
              </div>
              <div className="h-3 w-full bg-teal-200 dark:bg-teal-950 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${calculation.principalPercentage}%` }}
                />
                <div
                  className="bg-teal-400 dark:bg-teal-600 h-full transition-all duration-300"
                  style={{ width: `${calculation.interestPercentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">Principal Loan Amount</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{formatINR(loanAmount)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">Total Interest Payable</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{formatINR(calculation.totalInterest)}</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-sm text-gray-900 dark:text-white">
                <span>Total Payment (P + I)</span>
                <span className="text-emerald-600 dark:text-emerald-400">{formatINR(calculation.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Instant Bank Pre-Approval Lead Capture */}
          <div className="mt-6 pt-4 border-t border-emerald-200 dark:border-gray-800">
            {leadSubmitted ? (
              <div className="p-3.5 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl text-center space-y-1">
                <div className="flex items-center justify-center space-x-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Pre-Qualification Request Sent!</span>
                </div>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Our SBI / HDFC loan officer will call you within 30 minutes with customized rate offers.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplyPreApproval} className="space-y-2">
                <div className="text-[11px] font-bold uppercase text-emerald-900 dark:text-emerald-300">
                  ⚡ 1-Click Bank Pre-Approval:
                </div>
                <div className="flex space-x-2">
                  <input
                    type="tel"
                    placeholder="Enter WhatsApp / Mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="flex-1 px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
                  >
                    Check Eligibility
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
