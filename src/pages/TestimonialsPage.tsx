import React, { useState, useEffect } from 'react';
import { 
  Quote, Star, ChevronLeft, ChevronRight, 
  MonitorPlay, MessageSquare, Zap, Hash, ArrowDown
} from 'lucide-react';
import { api, getStorageUrl } from '../api';

export const TestimonialsPage = () => {
  // --- STATE MANAGEMENT ---
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/public/testimoni/all?page=${page}`);
        setItems(res.data.data || []);
        setLastPage(res.data.last_page || 1);
      } catch (error) {
        console.error("Gagal sinkronisasi testimoni");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="bg-[#FDFDFD] min-h-screen selection:bg-[#E3242B] selection:text-white font-sans text-left">
      
      {/* --- 1. INNOVATIVE "SOVEREIGN" HERO HEADER --- */}
      <section className="relative pt-32 pb-44 md:pt-64 md:pb-64 bg-[#111827] overflow-hidden rounded-b-[4rem] md:rounded-b-[6rem]">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("/img/pattern.png")', backgroundSize: '120px' }}></div>
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-br from-[#E3242B]/20 to-transparent blur-[150px] rounded-full -translate-y-1/3 translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
              <div className="flex items-center gap-4">
                {/* Penyelarasan Badge: font-bold, tracking-widest */}
                <div className="px-5 py-2 bg-[#E3242B] text-white text-[10px] font-bold uppercase tracking-widest rounded-tr-2xl rounded-bl-2xl shadow-xl shadow-red-900/40">
                  Apresiasi Publik
                </div>
                <div className="h-px w-16 bg-white/20"></div>
              </div>
              
              <div className="relative space-y-2">
                  <h2 className="absolute -top-16 left-0 text-white/[0.02] text-[10rem] font-black uppercase tracking-tighter pointer-events-none select-none hidden lg:block">
                    PRESISI
                  </h2>
                  <h1 className="text-5xl md:text-[100px] font-black text-white uppercase tracking-tighter leading-none relative z-10">
                    Suara <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3242B] to-[#ff4d4d]">
                        Tokoh
                    </span>
                  </h1>
              </div>

              {/* Penyelarasan Deskripsi: font-medium, leading-relaxed */}
              <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed max-w-xl border-l-4 border-[#E3242B] pl-8">
                 Refleksi mendalam dan apresiasi otentik dari para pemangku kepentingan terhadap implementasi nyata metodologi Data Desa Presisi di Indonesia.
              </p>
            </div>

            <div className="lg:col-span-4 hidden lg:flex justify-end animate-in fade-in slide-in-from-right-10 duration-1000 delay-500">
                <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] space-y-6 shadow-2xl">
                    <div className="flex items-center justify-between text-white">
                        <MessageSquare size={24} className="text-[#E3242B]" />
                        <span className="text-4xl font-black italic tracking-tighter">100%</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">
                        Apresiasi Berbasis <br /> Dampak Lapangan
                    </p>
                </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
            <ArrowDown size={14} className="text-white animate-bounce" />
        </div>
      </section>

      {/* --- 2. COMPACT THEATRE SECTION (VIDEO) --- */}
      <section className="py-24 px-6 bg-white relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center text-left">
            <div className="lg:col-span-4 space-y-8 animate-in fade-in duration-1000">
                <div className="space-y-4">
                    <span className="text-[11px] font-bold text-[#E3242B] uppercase tracking-widest flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#E3242B] animate-pulse"></div> Featured Release
                    </span>
                    <h2 className="text-3xl font-black text-[#111827] uppercase tracking-tighter leading-tight">
                        Dokumentasi <br /> Transformasi Digital
                    </h2>
                </div>
                <p className="text-gray-500 font-medium text-sm leading-relaxed text-left md:text-justify">
                    Melihat lebih dekat bagaimana metodologi DDP mengubah tata kelola data pembangunan menjadi lebih akurat, inklusif, dan partisipatif.
                </p>
                <div className="flex items-center gap-4 text-[#111827]">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shadow-sm">
                        <MonitorPlay size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">DDP TV Official Production</span>
                </div>
            </div>

            {/* Video Link Tetap Dipertahankan */}
            <div className="lg:col-span-8 animate-in fade-in zoom-in-95 duration-1000">
                <div className="relative group aspect-video w-full rounded-[4rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.12)] border-[12px] border-gray-50 bg-[#111827]">
                    <iframe 
                        width="100%" height="100%" 
                        src="https://www.youtube.com/embed/gPkcKEiCYSo" 
                        title="YouTube Video" frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                        className="grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 opacity-90 group-hover:opacity-100"
                    ></iframe>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. DYNAMIC MOSAIC GRID --- */}
      <section className="py-32 px-6 bg-[#F9FAFB] rounded-[4rem] md:rounded-[6rem] relative">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="py-40 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Menghimpun Suara...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in duration-1000 delay-300">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-10 rounded-[3.5rem] shadow-2xl transition-all duration-700 flex flex-col group border-b-8 border-b-transparent hover:border-b-[#E3242B] text-left">
                  
                  <div className="flex justify-between items-center mb-8">
                     <div className="flex gap-1">
                        {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-[#E3242B] text-[#E3242B]" />)}
                     </div>
                     <Quote size={28} className="text-gray-100 group-hover:text-[#E3242B]/20 transition-colors" />
                  </div>
                  
                  {/* Isi Testimoni: font-medium, leading-relaxed, normal case */}
                  <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed text-left mb-10">
                     "{item.isi_testimoni || item.isi}"
                  </p>

                  <div className="mt-auto space-y-8">
                    <div className="bg-gray-50 p-6 rounded-[2rem] border-l-4 border-[#E3242B]">
                        <p className="text-[10px] font-bold text-[#111827] uppercase tracking-widest leading-tight line-clamp-2">
                           {item.jabatan}
                        </p>
                    </div>

                    <div className="pt-8 border-t border-gray-50 flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0 bg-gray-50">
                          <img src={item.gambar_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.nama_tokoh || item.nama} />
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="font-black text-[#111827] text-sm uppercase truncate tracking-widest">{item.nama_tokoh || item.nama}</h4>
                          <div className="flex items-center gap-2 mt-1 opacity-40">
                             <div className="w-3 h-[1px] bg-[#111827]"></div>
                             <p className="text-[9px] font-bold text-[#111827] uppercase tracking-widest">{item.tanggal}</p>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- 4. MINIMALIST PAGINATION --- */}
          {lastPage > 1 && (
            <div className="mt-40 flex justify-center items-center gap-12 animate-in fade-in duration-1000">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(p => p - 1)} 
                className="group flex items-center gap-4 font-bold text-[10px] uppercase tracking-widest text-[#111827] disabled:opacity-10 hover:text-[#E3242B] transition-all"
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Prev
              </button>
              
              <div className="hidden md:flex items-center gap-6">
                <span className="text-sm font-black text-[#111827] tracking-tighter">{page.toString().padStart(2, '0')}</span>
                <div className="h-px w-16 bg-gray-200"></div>
                <span className="text-sm font-black text-gray-300 tracking-tighter">{lastPage.toString().padStart(2, '0')}</span>
              </div>

              <button 
                disabled={page === lastPage} 
                onClick={() => setPage(p => p + 1)} 
                className="group flex items-center gap-4 font-bold text-[10px] uppercase tracking-widest text-[#111827] disabled:opacity-10 hover:text-[#E3242B] transition-all"
              >
                Next <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 flex flex-col items-center gap-6 bg-white border-t border-gray-50">
           <div className="h-px w-32 bg-gray-200"></div>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Laboratory Data Desa Presisi IPB University</p>
      </footer>

    </div>
  );
};
