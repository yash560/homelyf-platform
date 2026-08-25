'use client';

import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle2, Building, DollarSign, Image, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPropertyModal({ isOpen, onClose }: AddPropertyModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    purpose: 'buy',
    type: 'apartment',
    city: 'Bhopal',
    locality: '',
    bedrooms: '3',
    price: '',
    superArea: '',
    furnishing: 'Semi-Furnished',
    ownerName: '',
    phone: '',
    email: '',
    reraNumber: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        data-lenis-prevent
      >
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/70 dark:bg-gray-950/70">
          <div className="flex items-center space-x-2">
            <PlusCircle className="w-5 h-5 text-emerald-500" />
            <span className="font-bold text-gray-900 dark:text-white text-base">
              Post Verified Property (Zero Brokerage)
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Property Submitted for Verification!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                Your listing <strong>&ldquo;{formData.title || 'Residential Property'}&rdquo;</strong> in <strong>{formData.locality || 'Bhopal'}</strong> has been received. Our verification officer will contact you at <strong>{formData.phone}</strong> within 4 hours to verify title documents and activate your listing.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
              >
                Close & View Platform
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Stepper Header */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 text-xs font-semibold">
                <span className={step >= 1 ? 'text-emerald-600 font-bold' : 'text-gray-400'}>1. Property Specs</span>
                <span className={step >= 2 ? 'text-emerald-600 font-bold' : 'text-gray-400'}>2. Price & Location</span>
                <span className={step >= 3 ? 'text-emerald-600 font-bold' : 'text-gray-400'}>3. Owner Verification</span>
              </div>

              {step === 1 && (
                <div className="space-y-3 animate-in fade-in duration-150">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Property Title / Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Spacious 3 BHK Apartment in Arera Colony"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full mt-1 px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Listing Purpose</label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                      >
                        <option value="buy">For Sale</option>
                        <option value="rent">For Rent</option>
                        <option value="invest">Investment Asset</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Property Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                      >
                        <option value="apartment">Apartment / Flat</option>
                        <option value="villa">Independent Villa</option>
                        <option value="commercial">Commercial Office / Shop</option>
                        <option value="plot">Plot / Land</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3 animate-in fade-in duration-150">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">City</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                      >
                        <option>Bhopal</option>
                        <option>Indore</option>
                        <option>Mumbai</option>
                        <option>Bangalore</option>
                        <option>Delhi NCR</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Locality</label>
                      <input
                        type="text"
                        placeholder="e.g. MP Nagar / Arera Colony"
                        value={formData.locality}
                        onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                        required
                        className="w-full mt-1 px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Expected Price (₹)</label>
                      <input
                        type="text"
                        placeholder="e.g. ₹75,00,000"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                        className="w-full mt-1 px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Built-Up Area (sq.ft)</label>
                      <input
                        type="number"
                        placeholder="e.g. 1650"
                        value={formData.superArea}
                        onChange={(e) => setFormData({ ...formData, superArea: e.target.value })}
                        required
                        className="w-full mt-1 px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3 animate-in fade-in duration-150">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Owner / Builder Name</label>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      required
                      className="w-full mt-1 px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">WhatsApp / Phone</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full mt-1 px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">RERA Number (Optional)</label>
                      <input
                        type="text"
                        placeholder="P-BPL-22-XXXX"
                        value={formData.reraNumber}
                        onChange={(e) => setFormData({ ...formData, reraNumber: e.target.value })}
                        className="w-full mt-1 px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="ml-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md"
                >
                  {step === 3 ? 'Publish Listing (Free)' : 'Next Step →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
