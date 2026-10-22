import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Compass, Sun, Ship } from 'lucide-react';
import { CANAL_GALLERY_IMAGES, GalleryImage } from '../data/galleryData.ts';

interface CivicGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const CivicGalleryModal: React.FC<CivicGalleryModalProps> = ({
  isOpen,
  onClose,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const filteredImages = selectedCategory === 'all'
    ? CANAL_GALLERY_IMAGES
    : CANAL_GALLERY_IMAGES.filter((img) => img.category === selectedCategory);

  const activeImage: GalleryImage = filteredImages[currentIndex] || CANAL_GALLERY_IMAGES[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="civic-gallery-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Ship className="w-4 h-4" />
            </div>
            <div>
              <h3 id="civic-gallery-title" className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                Woodlawn SSA Canal Terminal & Clean Grid Gallery
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 font-mono">
                  8 High-Def Studies
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Navigable Locks, Electric Ferries & Floating Solar Photovoltaic Infrastructure</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
              {(['all', 'transit', 'campus', 'clean-energy', 'urban-locks'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentIndex(0);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.replace('-', ' ').toUpperCase()}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Stage */}
        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
          <img
            src={activeImage.src}
            alt={activeImage.title}
            className="w-full h-full object-contain"
          />

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700 text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700 text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Caption Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent backdrop-blur-xs flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                {activeImage.yearEst}
              </span>
              <h4 className="text-sm font-bold text-white">{activeImage.title}</h4>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5 leading-relaxed">
                {activeImage.description}
              </p>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto text-[11px] font-mono text-slate-400">
              <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800">
                {currentIndex + 1} / {filteredImages.length}
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail Filmstrip */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
          {filteredImages.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all relative ${
                currentIndex === idx
                  ? 'border-cyan-400 shadow-md scale-105'
                  : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
