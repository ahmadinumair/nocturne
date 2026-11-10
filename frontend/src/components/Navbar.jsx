import React from 'react';
import { ShoppingBag, Heart, Search, ShieldCheck, Cpu } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  wishlistCount,
  backendOnline,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0d10]/90 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <a href="#" className="flex flex-col group">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#f3f4f6] font-light group-hover:text-[#c5a880] transition-colors">
                NOCTURNE
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#c5a880] font-medium -mt-1">
                Genève • Atelier 1928
              </span>
            </a>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari model, kaliber, atau seri..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#14171f] text-sm text-gray-200 placeholder-gray-500 pl-10 pr-4 py-2 rounded-full border border-white/10 focus:outline-none focus:border-[#c5a880] transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Right Action Icons & Status */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Rust Backend status pill */}
            <div
              title={
                backendOnline
                  ? "Terhubung ke Rust Axum Backend (Port 8080)"
                  : "Berjalan dalam Mode Klien Mandiri (Offline Fallback)"
              }
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono border transition-all ${
                backendOnline
                  ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                  : "bg-amber-950/30 border-amber-500/30 text-amber-300"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  backendOnline ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
              <span className="text-[11px] font-sans">
                {backendOnline ? "Rust API Online" : "Rust Client Mode"}
              </span>
            </div>

            {/* Wishlist Icon */}
            <div className="relative cursor-pointer p-2 text-gray-300 hover:text-[#c5a880] transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#c5a880] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Cart Icon */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center space-x-2 bg-[#161a22] hover:bg-[#1f2430] border border-white/10 hover:border-[#c5a880]/50 px-3.5 py-2 rounded-full transition-all text-gray-200 group"
            >
              <ShoppingBag className="w-5 h-5 text-[#c5a880] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium tracking-wider uppercase hidden sm:inline">
                Keranjang
              </span>
              <span className="bg-[#c5a880] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Cari model jam tangan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#14171f] text-sm text-gray-200 placeholder-gray-500 pl-9 pr-4 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-[#c5a880]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </header>
  );
}

