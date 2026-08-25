'use client';

import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Star, 
  CheckCircle2, 
  Search, 
  Award, 
  Briefcase, 
  Building,
  UserPlus
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/common/CommandPalette';
import AddPropertyModal from '@/components/modals/AddPropertyModal';
import { AGENTS, Agent } from '@/data/agents';
import confetti from 'canvas-confetti';

export default function AgentsPage() {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  const filteredAgents = AGENTS.filter(a => {
    if (cityFilter !== 'All' && !a.city.toLowerCase().includes(cityFilter.toLowerCase())) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.locality.toLowerCase().includes(q) ||
        a.specialization.some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinSubmitted(true);
    confetti({
      particleCount: 100,
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
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% RERA Registered Channel Partners</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
                Verified Real Estate Advisory Network
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect directly with certified local property consultants across Bhopal, Indore & Central India with zero spam and verified transaction track records.
              </p>
            </div>

            <button
              onClick={() => {
                setIsJoinOpen(true);
                setJoinSubmitted(false);
              }}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center space-x-2 self-start md:self-auto cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Join as Channel Partner</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search & Filter Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-gray-900 p-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by agent name, locality (e.g. Arera Colony), or specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
            {['All', 'Bhopal', 'Indore'].map((c) => (
              <button
                key={c}
                onClick={() => setCityFilter(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  cityFilter === c
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Agents Directory */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all space-y-5"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-16 h-16 rounded-2xl object-cover bg-emerald-100 dark:bg-emerald-950 p-1 border-2 border-emerald-500 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                      {agent.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{agent.rating} ({agent.reviewsCount})</span>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                    {agent.role}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <MapPin className="w-3 h-3 text-emerald-500 mr-1 shrink-0" />
                    <span>{agent.locality}, {agent.city}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {agent.bio}
              </p>

              {/* Specialization Tags */}
              <div className="flex flex-wrap gap-1.5">
                {agent.specialization.map((spec) => (
                  <span
                    key={spec}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-center text-xs">
                <div>
                  <div className="text-gray-400 text-[10px]">Experience</div>
                  <div className="font-bold text-gray-900 dark:text-white mt-0.5">{agent.experienceYears} Years</div>
                </div>
                <div>
                  <div className="text-gray-400 text-[10px]">Deals Closed</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{agent.dealsClosed}+</div>
                </div>
                <div>
                  <div className="text-gray-400 text-[10px]">Active Listings</div>
                  <div className="font-bold text-gray-900 dark:text-white mt-0.5">{agent.propertiesListed} Units</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-1 border-t border-gray-100 dark:border-gray-800">
                <a
                  href={`https://wa.me/${agent.whatsapp}?text=Hi%20${encodeURIComponent(agent.name)}%2C%20I%20am%20looking%20for%20property%20advice.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center shadow-xs"
                >
                  Direct WhatsApp Chat
                </a>
                <a
                  href={`tel:${agent.phone}`}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-bold text-xs flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      {/* Become Channel Partner Modal */}
      {isJoinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                Join Homelyf Channel Partner Network
              </h3>
              <button onClick={() => setIsJoinOpen(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            {joinSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-gray-900 dark:text-white">Application Received!</h4>
                <p className="text-xs text-gray-500">
                  Our channel partner desk will review your RERA credentials and activate your agent profile within 24 hours.
                </p>
                <button
                  onClick={() => setIsJoinOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">RERA Agent ID</label>
                    <input
                      type="text"
                      required
                      placeholder="A-BPL-22-XXXX"
                      className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Operating City</label>
                    <select className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none">
                      <option>Bhopal</option>
                      <option>Indore</option>
                      <option>Mumbai</option>
                      <option>Bangalore</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Experience (Years)</label>
                    <input
                      type="number"
                      placeholder="e.g. 5"
                      className="w-full mt-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md mt-2"
                >
                  Submit Channel Partner Application
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
