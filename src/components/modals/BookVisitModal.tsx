'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, Video, Car } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Property } from '@/data/properties';

interface BookVisitModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function BookVisitModal({ property, onClose }: BookVisitModalProps) {
  const [tourType, setTourType] = useState<'in_person' | 'video'>('in_person');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        data-lenis-prevent
      >
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/70 dark:bg-gray-950/70">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            <span className="font-bold text-gray-900 dark:text-white text-base">
              Schedule Property Tour
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
                Site Visit Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
                Thank you <strong>{name}</strong>. Your {tourType === 'in_person' ? 'in-person private site visit' : 'guided HD video walkthrough'} for <strong>{property.title}</strong> has been booked for <strong>{date || 'Tomorrow'}</strong> at <strong>{timeSlot}</strong>.
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-xs text-emerald-800 dark:text-emerald-300">
                Assigned Advisor <strong>{property.agent.name}</strong> will send the exact GPS pin on WhatsApp ({phone}).
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 flex items-center space-x-3">
                <img src={property.images[0]} alt={property.title} className="w-12 h-12 rounded-lg object-cover" />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-gray-900 dark:text-white truncate">{property.title}</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{property.priceFormatted} • {property.location.locality}</div>
                </div>
              </div>

              {/* Tour Mode */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTourType('in_person')}
                  className={`p-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 border transition-all ${
                    tourType === 'in_person'
                      ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  <span>In-Person Site Visit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTourType('video')}
                  className={`p-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 border transition-all ${
                    tourType === 'video'
                      ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Live Video Walkthrough</span>
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Preferred Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Preferred Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:border-emerald-500"
                >
                  <option>10:00 AM - 12:00 PM (Morning)</option>
                  <option>12:00 PM - 02:00 PM (Afternoon)</option>
                  <option>03:00 PM - 05:00 PM (Evening)</option>
                  <option>05:00 PM - 07:00 PM (Sunset Slot)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">WhatsApp / Mobile</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 active:scale-95 transition-all mt-4"
              >
                Confirm Site Visit Booking (100% Free)
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
