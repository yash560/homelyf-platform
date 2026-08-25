'use client';

import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  ShieldCheck, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Share2, 
  Heart,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Property } from '@/data/properties';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onBookVisit: (property: Property) => void;
}

export default function PropertyDetailModal({ property, onClose, onBookVisit }: PropertyDetailModalProps) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!property) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div
        className="w-full max-w-4xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        data-lenis-prevent
      >
        {/* Modal Header Bar */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/70 dark:bg-gray-950/70">
          <div className="flex items-center space-x-2.5">
            <span className="text-xs uppercase font-extrabold px-2.5 py-1 rounded-md bg-emerald-500 text-white">
              {property.purpose === 'buy' ? 'For Sale' : property.purpose === 'rent' ? 'For Rent' : 'Investment Asset'}
            </span>
            {property.reraApproved && (
              <span className="hidden sm:inline-flex items-center text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                RERA: {property.reraId}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs flex items-center space-x-1 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Image Slider */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-900 h-64 sm:h-96 group">
            <img
              src={property.images[activeImgIndex] || property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImgIndex((prev) => (prev > 0 ? prev - 1 : property.images.length - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveImgIndex((prev) => (prev < property.images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 text-white text-xs font-semibold">
              {activeImgIndex + 1} / {property.images.length}
            </div>
          </div>

          {/* Thumbnails Row */}
          {property.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-1">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImgIndex === idx ? 'border-emerald-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Title & Key Pricing Box */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                {property.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                <MapPin className="w-4 h-4 text-emerald-500 mr-1.5 shrink-0" />
                <span>{property.location.address}, {property.location.city}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 italic">
                &ldquo;{property.tagline}&rdquo;
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0 bg-emerald-50/60 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
              <div className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400">
                Offering Price
              </div>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {property.priceFormatted}
              </div>
              {property.pricePerSqft && (
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                  {property.pricePerSqft} • 0% Brokerage
                </div>
              )}
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-center">
              <div className="text-xs text-gray-400 font-medium">Bedrooms</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                {property.bedrooms ? `${property.bedrooms} BHK` : property.type}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-center">
              <div className="text-xs text-gray-400 font-medium">Super Built-Up Area</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                {property.superAreaSqft} sq.ft
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-center">
              <div className="text-xs text-gray-400 font-medium">Possession Status</div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {property.possessionStatus}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-center">
              <div className="text-xs text-gray-400 font-medium">Furnishing & Facing</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                {property.furnishing} ({property.facing})
              </div>
            </div>
          </div>

          {/* Highlights */}
          {property.highlights && property.highlights.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property.highlights.map((hl, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Property Description
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Amenities Checklist */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              World-Class Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {property.amenities.map((am, i) => (
                <div key={i} className="flex items-center space-x-2 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 text-xs font-medium text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Agent Card */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-gray-800/80 border border-emerald-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <img src={property.agent.avatar} alt={property.agent.name} className="w-12 h-12 rounded-xl object-cover bg-emerald-200" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Assigned RERA Advisor</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">{property.agent.name}</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  RERA: {property.agent.reraNumber} • {property.agent.rating} ★
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <a
                href={`https://wa.me/${property.agent.whatsapp}?text=Hi%20${encodeURIComponent(property.agent.name)}%2C%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${property.agent.phone}`}
                className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer CTA */}
        <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
            ⚡ 100% Free Site Visits with Dedicated Chauffeur in Bhopal & Indore.
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => onBookVisit(property)}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Free Site Visit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
