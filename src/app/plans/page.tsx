'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  Zap, 
  Building2, 
  Award,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import { PRICING_PLANS, PricingPlan } from '@/data/plans';
import confetti from 'canvas-confetti';

export default function PlansPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [phone, setPhone] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setCheckoutSuccess(false);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setCheckoutSuccess(true);
    confetti({
      particleCount: 90,
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
      <section className="py-14 sm:py-20 text-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Subscription & Listing Pricing</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Simple, Transparent Pricing Plans. <br />
            <span className="text-emerald-600 dark:text-emerald-400">Zero Hidden Brokerage.</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Whether you are an individual homeowner posting 1 property or a multi-city builder marketing 500 units, we have tailored solutions for you.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="pt-4 flex items-center justify-center space-x-3">
            <span className={`text-xs font-bold ${!isAnnual ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${isAnnual ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-700'}`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-xs font-bold flex items-center ${isAnnual ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500'}`}>
              Annual Billing
              <span className="ml-1.5 px-2 py-0.5 text-[9px] font-black uppercase rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-white border-2 border-emerald-500 shadow-2xl relative lg:-translate-y-2'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-white text-xs font-black uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className={`text-xs mt-1 ${plan.popular ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                    {plan.targetAudience}
                  </p>
                </div>

                <div className="py-4 border-t border-b border-gray-100 dark:border-gray-800/80">
                  <div className="text-3xl sm:text-4xl font-black">
                    {isAnnual ? plan.priceFormattedAnnual : plan.priceFormattedMonthly}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 text-xs">
                  <div className={`font-bold uppercase text-[10px] tracking-wider ${plan.popular ? 'text-emerald-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    Included Capabilities:
                  </div>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2.5">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? 'text-emerald-400' : 'text-emerald-500'}`} />
                      <span>{feat}</span>
                    </div>
                  ))}

                  {plan.notIncluded && plan.notIncluded.length > 0 && (
                    <div className="pt-2 space-y-2 opacity-50">
                      {plan.notIncluded.map((feat, i) => (
                        <div key={i} className="flex items-start space-x-2.5">
                          <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer ${
                    plan.popular
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-gray-950 shadow-emerald-500/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Contact Reassurance */}
        <div className="mt-14 p-8 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-emerald-600 text-white shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">
                Need a Custom API, White-Label Portal, or Multi-City Developer Package?
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Our enterprise advisory desk coordinates custom CRM integrations, automated lead distribution, and 3D architectural renders.
              </p>
            </div>
          </div>
          <a
            href="tel:+918439044541"
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shrink-0 active:scale-95"
          >
            Call Enterprise Desk (+91 84390 44541)
          </a>
        </div>
      </section>

      <Footer />

      {/* Checkout Inquiry Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">
                  Activate {selectedPlan.name}
                </h3>
                <div className="text-xs text-emerald-600 font-bold">
                  {isAnnual ? selectedPlan.priceFormattedAnnual : selectedPlan.priceFormattedMonthly}
                </div>
              </div>
              <button onClick={() => setSelectedPlan(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            {checkoutSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-gray-900 dark:text-white">Plan Order Received!</h4>
                <p className="text-xs text-gray-500">
                  Your onboarding manager will connect on WhatsApp ({phone}) with your dashboard credentials.
                </p>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Continue
                </button>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">WhatsApp / Mobile</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md mt-2"
                >
                  Confirm & Activate Plan
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
