import React, { useState } from 'react';
import { X, ShieldCheck, Check, ShoppingBag, Award, Sparkles } from 'lucide-react';
import { formatIDR, formatUSD } from '../data/watches';

export default function QuickViewModal({ watch, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!watch) return null;

  const handleAdd = () => {
    onAddToCart(watch, qty);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-[#12151b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Watch Photo */}
          <div className="md:col-span-6 relative aspect-square md:aspect-auto bg-[#0a0c0f] min-h-[360px]">
            <img
              src={watch.image_url}
              alt={watch.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12151b] via-transparent to-transparent md:hidden" />
            
            {watch.badge && (
              <div className="absolute top-4 left-4 bg-[#c5a880] text-black text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-md">
                {watch.badge}
              </div>
            )}
          </div>

          {/* Right Watch Details */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{watch.series}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white mt-1">
                {watch.name}
              </h2>

              {/* Price */}
              <div className="mt-3 flex items-baseline space-x-3">
                <span className="font-mono text-2xl font-bold text-[#e5cbab]">
                  {formatIDR(watch.price_idr)}
                </span>
                <span className="font-mono text-sm text-gray-500">
                  ({formatUSD(watch.price_usd)})
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-gray-300 leading-relaxed font-light">
                {watch.description}
              </p>

              {/* Detailed Technical Specs Table */}
              <div className="mt-6 border-t border-b border-white/5 py-4 space-y-2.5 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-400">Kaliber Mesin:</span>
                  <span className="text-gray-200 font-medium text-right">{watch.movement}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-400">Diameter & Tebal:</span>
                  <span className="text-gray-200 font-medium text-right">{watch.case_diameter} • {watch.thickness}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-400">Ketahanan Air:</span>
                  <span className="text-gray-200 font-medium text-right">{watch.water_resistance}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-400">Cadangan Daya (Power Reserve):</span>
                  <span className="text-gray-200 font-medium text-right">{watch.power_reserve}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-400">Material Tali (Strap):</span>
                  <span className="text-gray-200 font-medium text-right">{watch.strap_material}</span>
                </div>
              </div>
            </div>

            {/* Actions & Quantity */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-4">
                {/* Quantity selector */}
                <div className="flex items-center border border-white/15 rounded-lg bg-[#181d25] p-1">
                  <button
                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded hover:bg-white/5 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-sm text-white font-medium">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((prev) => prev + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded hover:bg-white/5 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to cart button */}
                <button
                  onClick={handleAdd}
                  disabled={!watch.in_stock || addedAnimation}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                    addedAnimation
                      ? "bg-emerald-600 text-white"
                      : watch.in_stock
                      ? "bg-[#c5a880] hover:bg-[#d4b992] text-black shadow-lg shadow-[#c5a880]/15"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Berhasil Ditambahkan!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        {watch.in_stock ? `Masukkan Keranjang • ${formatIDR(watch.price_idr * qty)}` : "Stok Habis"}
                      </span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center space-x-6 text-[11px] text-gray-400">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Brankas Berasuransi Penuh</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Sertifikat Asli Atelier</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

