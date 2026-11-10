import React from 'react';
import { ArrowRight, Compass, Shield, Award } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-white/5">
      {/* Background radial subtle ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/5 text-[#c5a880] text-xs uppercase tracking-[0.25em] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping" />
              <span>Haute Horlogerie • Swiss Calibre</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.1]">
              Waktu Abadi dalam <br />
              <span className="italic font-normal text-[#c5a880] bg-gradient-to-r from-[#e5cbab] via-[#c5a880] to-[#9e825c] bg-clip-text text-transparent">
                Presisi Tertinggi.
              </span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Diciptakan dengan toleransi mikronik dan kristal safir berkubah ganda. 
              Setiap jam tangan adalah perpaduan harmonis antara warisan mekanis klasik 
              dan estetika arsitektur kontemporer yang elegan.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-3.5 bg-[#c5a880] hover:bg-[#d4b992] text-black font-semibold text-sm uppercase tracking-wider rounded-full shadow-lg shadow-[#c5a880]/10 hover:shadow-[#c5a880]/20 transition-all group"
              >
                <span>Jelajahi Koleksi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#filosofi"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 border border-white/15 hover:border-[#c5a880]/60 text-gray-300 hover:text-white text-sm uppercase tracking-wider rounded-full transition-all"
              >
                <span>Filosofi Atelier</span>
              </a>
            </div>

            {/* Micro proof badges */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-white/10 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="font-serif text-2xl text-white font-medium">COSC</div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wider">Kronometer Tersertifikasi</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-white font-medium">5 Tahun</div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wider">Garansi Brankas Global</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-white font-medium">100%</div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wider">Perakitan Tangan Swiss</div>
              </div>
            </div>
          </div>

          {/* Right Featured Hero Visual */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative group max-w-md w-full">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-3xl border border-[#c5a880]/20 -rotate-3 scale-105 group-hover:rotate-0 transition-transform duration-700 pointer-events-none" />
              
              <div className="relative bg-[#13161c] rounded-2xl overflow-hidden border border-white/10 shadow-2xl p-4">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#0c0e12]">
                  <img
                    src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85"
                    alt="Nocturne Heritage Masterpiece"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  {/* Floating card caption */}
                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0e1117]/85 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880]">Koleksi Utama</span>
                        <h4 className="font-serif text-lg text-white font-medium">Nocturne Chronographe 01</h4>
                      </div>
                      <span className="font-mono text-sm text-[#e5cbab] font-semibold">Rp 28.500.000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

