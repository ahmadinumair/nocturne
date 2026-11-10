import React from 'react';
import { Compass, Shield, Award, Gem } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Compass,
      title: 'Kaliber Presisi Tinggi',
      desc: 'Setiap mesin jam dikalibrasi hingga 5 posisi dan diuji pada temperatur ekstrem untuk memastikan akurasi deviasi di bawah -2/+2 detik per hari.',
    },
    {
      icon: Gem,
      title: 'Kristal Safir Berlapis Ganda',
      desc: 'Kaca safir sintetis dengan kekerasan skala Mohs 9, dipoles dengan perlakuan anti-reflektif 7 lapis di kedua sisinya untuk kejernihan tanpa silau.',
    },
    {
      icon: Award,
      title: 'Finishing Chamfer Tangan',
      desc: 'Bevel dan jembatan mesin dipoles manual oleh horologis berpengalaman menggunakan kayu gentian tradisional demi pantulan cahaya sempurna.',
    },
    {
      icon: Shield,
      title: 'Garansi Brankas 5 Tahun',
      desc: 'Perlindungan menyeluruh dan perawatan berkala resmi di seluruh jaringan butik atelier kami di Geneva, Tokyo, dan Jakarta.',
    },
  ];

  return (
    <section id="filosofi" className="py-20 bg-[#0d0f14] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
            Dedikasi Terhadap Kesempurnaan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
            Standar Haute Horlogerie
          </h2>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            Kami memadukan teknik mekanis berusia ratusan tahun dengan metalurgi modern 
            untuk menciptakan instrumen waktu yang melampaui generasi.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#12151b] border border-white/5 hover:border-[#c5a880]/30 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1a1e27] border border-white/5 flex items-center justify-center text-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-black transition-all mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-white font-medium mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

