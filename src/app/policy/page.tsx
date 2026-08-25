'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Scale, 
  Building2, 
  CheckCircle2, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import AuthModal, { AuthRole } from '@/components/auth/AuthModal';

function PolicyContent() {
  const searchParams = useSearchParams();
  const initialSection = searchParams.get('tab') || 'privacy';
  const [activeSection, setActiveSection] = useState<'privacy' | 'terms' | 'rera' | 'broker_code' | 'fair_housing'>(initialSection as any);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authRole, setAuthRole] = useState<AuthRole>('user');

  const policySections = [
    { id: 'privacy', label: 'Privacy Policy', icon: Lock },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'rera', label: 'MP-RERA Disclosures', icon: ShieldCheck },
    { id: 'broker_code', label: 'Broker Code of Conduct', icon: Scale },
    { id: 'fair_housing', label: 'Fair Housing Policy', icon: Building2 }
  ];

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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Legal, Regulatory & Ethical Standards</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Policies & Compliance Center
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Homelyf Solutions operates with complete legal compliance under the Real Estate (Regulation and Development) Act (RERA) and Indian IT Laws.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-4 space-y-2">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-4 shadow-sm sticky top-24 space-y-1.5">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Policy Modules
              </div>
              {policySections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id as any)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{sec.label}</span>
                  </button>
                );
              })}

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 px-3">
                <div className="text-xs text-gray-400">
                  Headquarters Legal Desk: <br />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">legal@homelyf.in</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Policy Text Body */}
          <main className="lg:col-span-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-sm leading-relaxed space-y-6 text-sm text-gray-700 dark:text-gray-300">
            {activeSection === 'privacy' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy & Data Security</h2>
                <p className="text-xs text-gray-400">Last Updated: August 2026</p>

                <p>
                  At <strong>Homelyf Solutions Private Limited</strong> (&ldquo;Homelyf&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), we prioritize the confidentiality and protection of personal data belonging to homebuyers, tenants, individual property owners, and certified channel partners across India.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white pt-2">1. Information We Collect</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>Contact Coordinates:</strong> Full name, verified mobile number, email address, and residential city for scheduling property site visits.</li>
                  <li><strong>Listing Information:</strong> Property title deeds, RERA registration numbers, floor plans, photographs, and pricing expectations submitted by property owners or authorized channel partners.</li>
                  <li><strong>Financial Pre-Approvals:</strong> Loan eligibility parameters voluntarily submitted for bank liaison with partner financial institutions (SBI, HDFC, ICICI).</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white pt-2">2. Zero Spam & Strict Anti-Broker Sellout Policy</h3>
                <p className="text-xs">
                  We <strong>never sell, lease, or distribute</strong> user phone numbers or email addresses to unauthorized telemarketers or third-party spam networks. Contact details are only shared with the assigned RERA-certified advisor or the verified property owner upon explicit user request.
                </p>
              </div>
            )}

            {activeSection === 'terms' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Terms of Service</h2>
                <p className="text-xs text-gray-400">Last Updated: August 2026</p>

                <p>
                  By accessing or using the platform at <strong>homelyf.thewebvale.com</strong> or <strong>homelyf.in</strong>, you agree to be bound by the following terms and operating conditions.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white pt-2">1. Verification & Accuracy of Property Listings</h3>
                <p className="text-xs">
                  Homelyf employs a rigorous document review protocol to verify RERA registrations and title deeds. However, buyers and investors are encouraged to conduct independent legal searches with qualified advocates before signing financial registry deeds.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white pt-2">2. Free Site Visits & Chauffeur Services</h3>
                <p className="text-xs">
                  Complimentary site visit chauffeur facilities in Bhopal and Indore are subject to slot availability and prior confirmation with our property advisory desk.
                </p>
              </div>
            )}

            {activeSection === 'rera' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Madhya Pradesh RERA Compliance</h2>
                <p className="text-xs text-gray-400">Regulatory Reference: Real Estate (Regulation and Development) Act, 2016</p>

                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
                  <div className="font-bold text-emerald-900 dark:text-emerald-300 text-xs">
                    Official MP-RERA Registration Desk
                  </div>
                  <p className="text-xs text-emerald-800 dark:text-emerald-400">
                    All ongoing and new development projects listed on Homelyf display their authentic MP-RERA project registration IDs (e.g. <code>P-BPL-22-XXXX</code>).
                  </p>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white pt-2">Verification Invariants</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>Carpet area measurements conform strictly to RERA definitions (excluding external walls, common shafts, and open balconies).</li>
                  <li>No under-construction project is promoted without an active RERA registration sanction.</li>
                  <li>All listed channel partners maintain active individual or firm agent registrations under MP-RERA.</li>
                </ul>
              </div>
            )}

            {activeSection === 'broker_code' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Broker & Channel Partner Code of Conduct</h2>
                <p className="text-xs text-gray-400">Ethical Standards for Certified Partners</p>

                <p className="text-xs">
                  All real estate consultants, brokers, and channel partners registered on the Homelyf platform must strictly adhere to our Ethical Code of Conduct:
                </p>

                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li><strong>Zero Unsanctioned Brokerage:</strong> No partner shall charge brokerage on properties explicitly designated as Direct-From-Owner or Direct-Builder listings.</li>
                  <li><strong>Truth in Advertising:</strong> Property pricing, availability status, and photo assets must reflect actual on-ground conditions without misleading inflation.</li>
                  <li><strong>Dispute-Free Title Disclosure:</strong> Any known encumbrances, litigation, or easement issues must be disclosed to prospective buyers upfront.</li>
                </ul>
              </div>
            )}

            {activeSection === 'fair_housing' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Fair Housing & Non-Discrimination Charter</h2>
                <p className="text-xs text-gray-400">Universal Access to Housing</p>

                <p className="text-xs">
                  Homelyf is committed to ensuring that every individual, regardless of religion, caste, gender, marital status, or dietary preference, enjoys equal and fair access to residential rental and purchase opportunities across Indian cities.
                </p>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs space-y-2">
                  <div className="font-bold text-gray-900 dark:text-white">Anti-Discrimination Hotline:</div>
                  <p className="text-gray-500">
                    If you experience discrimination by any listed owner or broker, please report immediately to <strong>compliance@homelyf.in</strong> or call <strong>+91 84390 44541</strong> for priority investigation and listing suspension.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <AuthModal
        isOpen={authOpen}
        initialRole={authRole}
        onClose={() => setAuthOpen(false)}
      />
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

export default function PolicyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Policies...</div>}>
      <PolicyContent />
    </Suspense>
  );
}
