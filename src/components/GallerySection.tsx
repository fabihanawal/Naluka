import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['সব', ...Array.from(new Set(gallery.map((g) => g.category)))];

  const filtered = selectedCategory === 'সব'
    ? gallery
    : gallery.filter((g) => g.category === selectedCategory);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>আলোকচিত্রে চিরস্মরণীয় মুহূর্তসমূহ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              ফটোগ্যালারি ও ক্যাম্পাস জীবন
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              নালুকাবাড়ি বিদ্যালয়ের সবুজ মাঠ, প্রাত্যহিক সমাবেশ, স্মার্ট ক্লাসরুম ও শিশুদের আনন্দময় মুখরিত জীবনের প্রতিচ্ছবি।
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-emerald-50/50 text-slate-700 hover:text-emerald-900 border border-emerald-900/10 hover:bg-emerald-100/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between hover:border-emerald-300 relative"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-white/80 text-slate-900 shadow-md">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-800 shadow-xs">
                  {item.category}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div 
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full flex flex-col items-center relative"
          >
            {/* Top Bar with Close button */}
            <div className="w-full flex justify-between items-center text-white pb-3 px-2">
              <span className="text-xs font-semibold text-emerald-300">
                {activeItem.category} ({lightboxIndex + 1} / {filtered.length})
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="বন্ধ করুন"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Visual */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-black max-h-[70vh] flex items-center justify-center">
              <img
                src={activeItem.mediaUrl}
                alt={activeItem.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Prev Button */}
              {filtered.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors"
                  aria-label="পূর্ববর্তী ছবি"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {filtered.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors"
                  aria-label="পরবর্তী ছবি"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption */}
            <div className="w-full bg-slate-900/90 text-white p-4 rounded-xl mt-3 text-center border border-white/10">
              <h3 className="font-bold text-sm sm:text-base text-emerald-200">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl mx-auto">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
