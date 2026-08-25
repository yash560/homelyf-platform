'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Send,
  Building2,
  PhoneCall
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Bhopal',
    subject: 'Property Consultation',
    message: ''
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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

      {/* Header */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Direct Client & Partner Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Get in Touch with Homelyf
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Have questions about buying, selling, renting, or commercial property investments? Our senior Bhopal & Indore property desks are here to assist you.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Coordinates Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Bhopal Corporate Headquarters
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Physical Address</div>
                    <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                      Plot No. 218, Zone-2, MP Nagar, Bhopal, Madhya Pradesh 462011, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Direct Phone Lines</div>
                    <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                      +91 84390 44541 (Advisory Desk) <br />
                      +91 96856 37312 (Commercial Desk)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Email Addresses</div>
                    <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                      hello@homelyf.in <br />
                      homelyfsolutions@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Operational Hours</div>
                    <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                      Monday to Sunday: 09:30 AM – 08:30 PM (Site visits 7 days a week)
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Help Pill */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
                <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-emerald-600" />
                  <span>Instant 1-Click WhatsApp Support:</span>
                </div>
                <a
                  href="https://wa.me/918439044541?text=Hi%20Homelyf%20Solutions%2C%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center shadow-xs"
                >
                  Start Live Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Send an Inquiry or Book Consultation
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Fill in your requirements below and our certified property specialist will get in touch with you within 30 minutes.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                    Thank you <strong>{formData.name}</strong>. A dedicated relationship manager from our Bhopal office will call you at <strong>{formData.phone}</strong> shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Rajesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full mt-1 px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">WhatsApp / Mobile</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full mt-1 px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full mt-1 px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Inquiry Purpose</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full mt-1 px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-500"
                      >
                        <option>Property Consultation</option>
                        <option>Schedule In-Person Site Visit</option>
                        <option>Pre-Leased Commercial Investment (9%+ Yield)</option>
                        <option>Post Free Property Listing</option>
                        <option>Channel Partner Registration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Detailed Message / Locality Preference</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Specify requirements (e.g. looking for 3 BHK apartment in Arera Colony with budget of ₹1.2 Cr)..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full mt-1 px-3.5 py-2.5 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Property Desk</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
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
