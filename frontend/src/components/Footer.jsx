import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#08090c] border-t border-white/5 pt-16 pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl tracking-[0.25em] text-white font-light block">
              NOCTURNE
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] block -mt-2">
              L'Art de la Haute Horlogerie
            </span>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm">
              Butik jam tangan mekanis independen yang berakar pada ketelitian Swiss dan estetika minimalis modern. 
              Melayani kolektor di Geneva, Tokyo, dan Jakarta.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm text-white font-medium uppercase tracking-wider">
              Koleksi
            </h4>
            <ul className="space-y-2 font-light">
              <li><a href="#" className="hover:text-[#c5a880] transition-colors">Tourbillon Royale</a></li>
              <li><a href="#" className="hover:text-[#c5a880] transition-colors">Chronographe 01</a></li>
              <li><a href="#" className="hover:text-[#c5a880] transition-colors">Submaris Diver 300M</a></li>
              <li><a href="#" className="hover:text-[#c5a880] transition-colors">Bauhaus Minimalist</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm text-white font-medium uppercase tracking-wider">
              Layanan Atelier
            </h4>
            <ul className="space-y-2 font-light">
              <li><a href="#" className="hover:text-[#c5a880] transition-colors">Sertifikasi & Garansi</a></li>
              <li><a href="#" className="hover:text-[#c5a880] transition-colors">Perawatan Kaliber</a></li>
              <li><a href="#" className="hover:text-[#c5a880] transition-colors">Pesanan Khusus (Bespoke)</a></li>
              <li><a href="#" className="hover:text-[#c5a880] transition-colors">Panduan Ukuran Casing</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm text-white font-medium uppercase tracking-wider">
              Jurnal Waktu
            </h4>
            <p className="font-light text-gray-400 text-xs leading-relaxed">
              Daftarkan diri Anda untuk menerima pratinjau edisi terbatas dan catatan teknis horologi.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Alamat email Anda..."
                className="w-full bg-[#14171f] border border-white/10 rounded-l-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#c5a880]"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  alert('Terima kasih telah berlangganan Jurnal Nocturne.');
                }}
                className="bg-[#c5a880] hover:bg-[#d4b992] text-black px-3.5 py-2 rounded-r-lg font-semibold text-xs transition-colors flex items-center justify-center"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & tech stack badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-gray-500 space-y-4 sm:space-y-0 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} HORLOGERIE NOCTURNE ATELIER. Hak Cipta Dilindungi.
          </div>
          <div className="flex items-center space-x-3 font-mono">
            <span>Tech: Rust (Axum) + React + Vite</span>
            <span>•</span>
            <span className="text-[#c5a880]">Minimalist Luxury</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

