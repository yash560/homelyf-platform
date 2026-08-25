'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Share2 } from 'lucide-react';

interface LightboxModalProps {
  images: { url: string; title: string; category: string; location: string }[];
  initialIndex: number;
  onClose: () => void;
}

export default function LightboxModal({ images, initialIndex, onClose }: LightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const current = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
        <div>
          <div className="text-sm font-bold">{current.title}</div>
          <div className="text-xs text-gray-400">{current.location} • {current.category}</div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-400">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative max-w-5xl max-h-[80vh] flex items-center justify-center">
        <img
          src={current.url}
          alt={current.title}
          className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
        />

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="absolute -left-12 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="absolute -right-12 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
