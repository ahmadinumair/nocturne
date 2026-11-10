import React from 'react';
import { Heart, Eye, Plus, Check } from 'lucide-react';
import { formatIDR, formatUSD } from '../data/watches';

export default function WatchCard({
  watch,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) {
  return (
    <div className="group relative bg-[#12151b] hover:bg-[#161a22] rounded-xl border border-white/5 hover:border-[#c5a880]/40 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#c5a880]/5">
      
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#0a0c0f]">
        <img
          src={watch.image_url}
          alt={watch.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12151b] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Badge */}
        {watch.badge && (
          <div className="absolute top-3 left-3 bg-[#c5a880]/90 text-black text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-md">
            {watch.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(watch.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white/80 hover:text-[#c5a880] transition-colors"
          title={isWishlisted ? "Hapus dari Favorit" : "Simpan ke Favorit"}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isWishlisted ? "fill-[#c5a880] text-[#c5a880]" : ""
            }`}
          />
        </button>

        {/* Quick View Button hover overlay */}
        <div className="absolute inset-x-4 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => onQuickView(watch)}
            className="w-full py-2 px-3 bg-black/80 hover:bg-black backdrop-blur-md text-[#e5cbab] text-xs uppercase tracking-wider font-medium rounded-lg border border-white/10 flex items-center justify-center space-x-2 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Spesifikasi Lengkap</span>
          </button>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#c5a880] uppercase tracking-wider font-medium">
            <span>{watch.series}</span>
            <span className="text-gray-400 font-mono text-[10px]">{watch.case_diameter}</span>
          </div>

          <h3
            onClick={() => onQuickView(watch)}
            className="font-serif text-lg font-medium text-white hover:text-[#c5a880] cursor-pointer mt-1 line-clamp-1 transition-colors"
          >
            {watch.name}
          </h3>

          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {watch.movement}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <div className="font-mono text-base font-semibold text-[#f3f4f6]">
              {formatIDR(watch.price_idr)}
            </div>
            <div className="text-[11px] text-gray-400 font-mono">
              {formatUSD(watch.price_usd)}
            </div>
          </div>

          <button
            onClick={() => onAddToCart(watch)}
            disabled={!watch.in_stock}
            className={`p-2.5 rounded-full transition-all flex items-center justify-center ${
              watch.in_stock
                ? "bg-[#1f242d] hover:bg-[#c5a880] text-[#c5a880] hover:text-black border border-[#c5a880]/30 hover:shadow-lg hover:shadow-[#c5a880]/20"
                : "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5"
            }`}
            title={watch.in_stock ? "Tambah ke Keranjang" : "Stok Habis"}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}

