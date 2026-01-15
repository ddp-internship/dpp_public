import React, { useEffect, useState, useRef } from 'react';
import { 
  Database, Users, Map, Home, 
  Building2, Users2, ChevronLeft, ChevronRight,
  TrendingUp, PieChart, Activity, ShieldCheck, 
  BarChart3, Info, Mars, Venus, RefreshCcw, 
  Award, CheckCircle2
} from 'lucide-react';
import { api } from '../api';

// --- Animated Counter (Sesuai SOP) ---
const Counter = ({ value, duration = 2500 }: { value: any, duration?: number }) => {
  const [count, setCount] = useState(0);
  const target = Number(value) || 0;

  useEffect(() => {
    let start = 0;
    if (target === 0) {
      setCount(0);
      return;
    }
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString('id-ID')}</span>;
};

// --- Config Data ---
const statsConfig = [
  { label: 'Desa', key: 'desa', icon: Map },
  { label: 'Dusun', key: 'dusun', icon: Database },
  { label: 'Kelurahan', key: 'kelurahan', icon: Building2 },
  { label: 'RW', key: 'rw', icon: Home },
  { label: 'Keluarga', key: 'kk', icon: Users },
  { label: 'Jiwa', key: 'jiwa', icon: Users2 },
];

export const Statistics = () => {
  const [dbData, setDbData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SOP: Sinkronisasi data capaian dari backend
    api.get('/public/capaian')
      .then(res => {
        if (res.data.length > 0) setDbData(res.data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // --- Auto Scroll & Pop-Up Tengah ---
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % statsConfig.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = 320 + 24; 
      scrollRef.current.scrollTo({
        left: activeIndex * cardWidth - (scrollRef.current.clientWidth / 2) + (cardWidth / 2),
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveIndex((prev) => (prev - 1 + statsConfig.length) % statsConfig.length);
    } else {
      setActiveIndex((prev) => (prev + 1) % statsConfig.length);
    }
  };

  const totalWilayah = (Number(dbData?.desa) || 0) + (Number(dbData?.kelurahan) || 0);
  const totalJiwa = dbData ? Number(dbData.jiwa) : 0;
  const jmlLaki = dbData ? Number(dbData.laki) : 0;
  const jmlPerempuan = dbData ? Number(dbData.perempuan) : 0;
  const persenLaki = totalJiwa > 0 ? (jmlLaki / totalJiwa) * 100 : 0;
  const persenPerempuan = totalJiwa > 0 ? (jmlPerempuan / totalJiwa) * 100 : 0;

  if (loading) return (
    <div className="py-40 text-center space-y-3">
      <div className="w-8 h-8 border-3 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Sinkronisasi Capaian...</p>
    </div>
  );

  return (
    <section id="statistics" className="py-24 bg-white px-6 lg:px-24 relative overflow-hidden selection:bg-[#E3242B] selection:text-white">
      
      {/* CSS FIX: Menggunakan dangerouslySetInnerHTML agar tidak Blank */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:60px_60px] opacity-[0.15]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
               <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.3em]">Analitik Data</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter uppercase leading-none">
              Capaian <span className="text-[#E3242B]">Pendataan</span>
            </h2>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest max-w-md leading-relaxed">
              Bekerja sama dengan masyarakat di <span className="text-[#111827] font-black">{totalWilayah}</span> Desa & Kelurahan seluruh Indonesia.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 shadow-inner">
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-xl bg-white hover:bg-[#111827] hover:text-white transition-all shadow-sm flex items-center justify-center">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-xl bg-[#E3242B] text-white shadow-xl shadow-red-900/30 hover:scale-105 transition-all flex items-center justify-center">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- 2. STATS SLIDER --- */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden gap-6 pb-24 no-scrollbar pt-10"
        >
          {statsConfig.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div 
                key={index}
                className={`min-w-[280px] md:min-w-[320px] bg-white p-12 rounded-[2.5rem] border transition-all duration-700 flex flex-col items-center text-center relative overflow-hidden
                  ${isActive 
                    ? 'scale-110 z-20 border-[#E3242B] shadow-[0_40px_80px_rgba(227,36,43,0.15)] opacity-100' 
                    : 'scale-90 opacity-40 border-gray-50 blur-[1px]'
                  }`}
              >
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500
                  ${isActive ? 'bg-[#E3242B] text-white' : 'bg-gray-50 text-gray-400'}`}>
                  <item.icon size={36} />
                </div>

                <div className="space-y-1 relative z-10">
                  <h3 className={`text-6xl font-black tracking-tighter transition-colors duration-500
                    ${isActive ? 'text-[#E3242B]' : 'text-[#111827]'}`}>
                    <Counter value={dbData ? dbData[item.key] : 0} />
                  </h3>
                  <p className={`text-[12px] font-black uppercase tracking-[0.5em] mt-2 
                    ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>{item.label}</p>
                </div>

                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#E3242B] animate-in fade-in duration-1000"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* --- 3. DEMOGRAPHIC & TRUSTED SHIELD --- */}
        <div className="grid lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-9 bg-[#111827] rounded-[3.5rem] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E3242B] opacity-[0.03] blur-[120px] rounded-full"></div>
                
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-10">
                        <div className="space-y-3">
                            <h4 className="font-black text-2xl uppercase tracking-tighter">Rasio Demografi</h4>
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Distribusi Gender Seluruh Wilayah</p>
                        </div>
                        
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3 text-blue-400">
                                        <div className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center"><Mars size={14} /></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Laki-Laki</span>
                                    </div>
                                    <span className="text-xl font-black">{jmlLaki.toLocaleString('id-ID')} <span className="text-[10px] opacity-30 font-medium">JIWA</span></span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]" style={{ width: `${persenLaki}%` }}></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3 text-pink-400">
                                        <div className="w-8 h-8 rounded-lg bg-pink-400/10 flex items-center justify-center"><Venus size={14} /></div>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Perempuan</span>
                                    </div>
                                    <span className="text-xl font-black">{jmlPerempuan.toLocaleString('id-ID')} <span className="text-[10px] opacity-30 font-medium">JIWA</span></span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)]" style={{ width: `${persenPerempuan}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center space-y-4 backdrop-blur-xl">
                        <div className="w-16 h-16 bg-[#E3242B]/10 rounded-2xl flex items-center justify-center text-[#E3242B] mb-2">
                             <BarChart3 size={32} />
                        </div>
                        <div className="space-y-1">
                            <h5 className="text-5xl font-black tracking-tighter">
                                {jmlPerempuan > 0 ? ((jmlLaki/jmlPerempuan) * 100).toFixed(1) : "0.0"}
                            </h5>
                            <p className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.4em]">Indeks Gender</p>
                        </div>
                        <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest px-4">Rasio Jenis Kelamin per 100 Perempuan</p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3 bg-gray-50 rounded-[3.5rem] p-10 flex flex-col justify-center items-center text-center border border-gray-100 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E3242B]/5 rounded-full blur-3xl"></div>
                
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-white mb-6 relative z-10 group-hover:rotate-[360deg] transition-transform duration-1000">
                    <ShieldCheck size={40} className="text-[#E3242B]" />
                </div>
                
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-center gap-1 text-[#E3242B]">
                        <CheckCircle2 size={12} />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Verified Data</span>
                    </div>
                    <h4 className="text-xl font-black text-[#111827] uppercase tracking-tighter leading-tight italic">
                        Standar <br /> Presisi
                    </h4>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
                        Metodologi Teruji <br /> Lab DDP IPB University
                    </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200 w-full">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-[8px] font-black text-[#111827] uppercase tracking-[0.3em]">Integrasi Aktif</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};