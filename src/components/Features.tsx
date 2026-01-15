import React from 'react';
import { Zap, LayoutGrid, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal'; // SOP: Menambahkan import animasi

// 1. Antarmuka properti item aplikasi
interface AppItem {
  name: string;
  desc: string;
  img: string;
  tag: string;
  link: string; 
}

// 2. Data aplikasi dengan konten tulisan yang telah dirapikan (UX Writer)
const apps: AppItem[] = [
  { 
    name: 'Merdesa Sensus', 
    desc: 'Aplikasi sensus keluarga partisipatif terintegrasi data spasial untuk profil penduduk.',
    img: '/img/apps/logo-sensus.png', 
    tag: 'Sensus Digital',
    link: 'play.google.com'
  },
  { 
    name: 'Merdesa Maps', 
    desc: 'Teknologi pemetaan partisipatif untuk pendataan sarana, vegetasi, dan batas wilayah presisi.',
    img: '/img/apps/logo-maps.png', 
    tag: 'Geospasial',
    link: 'play.google.com'
  },
  { 
    name: 'Merdesa Monev', 
    desc: 'Sistem monitoring untuk memantau progres dan kualitas hasil pendataan lapangan secara langsung.',
    img: '/img/apps/logo-monev.png', 
    tag: 'Pemantauan',
    link: 'monev.desapresisi.id'
  },
  { 
    name: 'Merdesa WebGIS', 
    desc: 'Dashboard analisis data desa untuk pemangku kebijakan melihat capaian pembangunan.',
    img: '/img/apps/logo-webgis.png', 
    tag: 'Analitik',
    link: 'webgis.desapresisi.id'
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32 bg-[#FDFDFD] overflow-hidden selection:bg-[#E3242B] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-24 relative">
        
        {/* --- 1. HEADER (ANIMATED) --- */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-20 pb-10 border-b border-gray-100">
            <div className="space-y-3 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                 <span className="text-[10px] font-bold text-[#E3242B] tracking-widest uppercase">Rangkaian Perangkat Lunak</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter leading-none">
                Ekosistem <span className="text-[#E3242B]">Aplikasi</span>
              </h2>
              <p className="text-gray-500 font-medium text-sm max-w-md leading-relaxed">
                Rangkaian alat digital terintegrasi untuk kedaulatan data desa Indonesia.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3 text-gray-300 text-left">
               <ShieldCheck size={20} />
               <span className="text-[10px] font-bold tracking-widest uppercase">Keamanan Terverifikasi</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* --- 2. APPS LIST (ANIMATED DELAY 0.2) --- */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <ScrollReveal delay={0.2} direction="right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {apps.map((app, i) => (
                  <a 
                    key={i} 
                    href={app.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#E3242B]/20 transition-all duration-500 flex flex-col h-full text-center lg:text-left items-center lg:items-start justify-between cursor-pointer"
                  >
                    <div className="space-y-6 w-full">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                          {/* Logo Container */}
                          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-3 group-hover:bg-white transition-all duration-500 border border-gray-100 shadow-inner overflow-hidden">
                            <img 
                              src={app.img} 
                              alt={app.name} 
                              className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <span className="text-[9px] font-bold text-gray-400 group-hover:text-[#E3242B] transition-colors tracking-wider bg-gray-50 px-3 py-1 rounded-full uppercase">{app.tag}</span>
                        </div>
                        
                        <div className="space-y-2 text-left">
                          <h4 className="text-lg font-bold text-[#111827] tracking-tight leading-tight">{app.name}</h4>
                          <p className="text-[12px] text-gray-500 font-medium leading-relaxed tracking-normal line-clamp-3">
                            {app.desc}
                          </p>
                        </div>
                    </div>

                    <div className="pt-6 w-full flex justify-center lg:justify-start">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-[#E3242B] opacity-40 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 tracking-wider">
                          Pelajari Selengkapnya <ArrowUpRight size={14} />
                        </div>
                    </div>
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* --- 3. VISUAL MOCKUP (ANIMATED DELAY 0.4) --- */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
             <ScrollReveal delay={0.4} direction="left">
              <div className="relative w-full max-w-[450px]">
                  <div className="absolute -inset-4 bg-[#E3242B]/5 blur-[80px] rounded-full"></div>
                  
                  <div className="relative bg-[#111827] rounded-[3.5rem] p-6 md:p-8 border border-white/10 shadow-2xl overflow-hidden group text-left">
                      <div className="flex items-center justify-between mb-8">
                          <div className="flex gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                              <div className="w-2 h-2 rounded-full bg-emerald-500/40"></div>
                          </div>
                          <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">Antarmuka Sistem</span>
                      </div>

                      <img 
                        src="/img/DDPApps.png" 
                        alt="Pratinjau Antarmuka Ekosistem Aplikasi" 
                        className="w-full h-auto drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-[2000ms]" 
                      />

                      {/* Floating Info Box */}
                      <div className="mt-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl flex justify-between items-center">
                          <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-[#E3242B] rounded-xl flex items-center justify-center text-white">
                                  <LayoutGrid size={18} />
                              </div>
                              <div className="text-left">
                                  <p className="text-[8px] font-bold text-gray-500 tracking-widest leading-none uppercase">Status Layanan</p>
                                  <p className="text-[11px] font-bold text-white mt-1.5">Sistem Aktif</p>
                              </div>
                          </div>
                          {/* Indikator sistem aktif */}
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]"></div>
                      </div>
                  </div>
              </div>
             </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};