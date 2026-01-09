import { useEffect, useState, useCallback } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, ArrowRight, Zap, MessageSquare, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api, getStorageUrl } from '../api';

export const Testimonials = () => {
  // --- STATE MANAGEMENT ---
  const [items, setItems] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA (DAPATKAN 5 DATA FEATURED & TOTAL COUNT) ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const [featuredRes, countRes] = await Promise.all([
          api.get('/public/testimoni/featured'),
          api.get('/public/testimoni/count')
        ]);
        setItems(featuredRes.data);
        setTotalCount(countRes.data.total);
      } catch (error) {
        console.error("Database Connection Error");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // --- SLIDER LOGIC ---
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  // Auto Play
  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (loading) return (
    <div className="py-40 text-center space-y-3">
      <div className="w-8 h-8 border-3 border-crimson border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Sinkronisasi Testimoni...</p>
    </div>
  );

  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-[#F9FAFB] px-6 lg:px-24 relative overflow-hidden selection:bg-[#E3242B] selection:text-white">
      
      {/* --- INOVASI: WATERMARK BACKGROUND (SERAGAM) --- */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-gray-50 text-[12rem] font-black uppercase tracking-tighter pointer-events-none select-none opacity-40">
        Voice
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. HEADER (PENYERAGAMAN TOTAL DENGAN MODUL LAIN) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-20 pb-10 border-b border-gray-100">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
               <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.3em]">Ulasan Para Tokoh</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter uppercase leading-none">
              Apresiasi <span className="text-[#E3242B]">Tokoh</span>
            </h2>
            {/* COUNTER DINAMIS (RAMAH MASYARAKAT) */}
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest max-w-md leading-relaxed mt-2">
              Telah dihimpun <span className="text-[#111827] font-black">{totalCount} Testimoni</span> dari berbagai penjuru negeri untuk Satu Data Indonesia.
            </p>
          </div>

          {/* Navigation Controls (Premium Minimalism) */}
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
            <button onClick={prevSlide} className="w-12 h-12 rounded-xl bg-gray-50 hover:bg-[#111827] hover:text-white transition-all flex items-center justify-center group">
              <ChevronLeft size={22} />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 rounded-xl bg-[#E3242B] text-white shadow-xl shadow-red-900/30 hover:scale-105 transition-all flex items-center justify-center group">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* --- 2. PREMIUM STAGE SLIDER --- */}
        <div className="relative h-[550px] md:h-[600px] flex items-center justify-center">
          {items.map((item, index) => {
            let offset = index - currentIndex;
            if (offset < -1) offset += items.length;
            if (offset > 1) offset -= items.length;

            const isActive = index === currentIndex;
            const isPrev = offset === -1;
            const isNext = offset === 1;
            const isHidden = !isActive && !isPrev && !isNext;

            return (
              <div 
                key={item.id}
                className={`absolute transition-all duration-[1200ms] ease-in-out flex flex-col items-center
                  ${isActive ? 'z-30 opacity-100 translate-x-0 scale-100' : ''}
                  ${isPrev ? 'z-20 opacity-20 -translate-x-[90%] md:-translate-x-[105%] scale-75 blur-[2px]' : ''}
                  ${isNext ? 'z-20 opacity-20 translate-x-[90%] md:translate-x-[105%] scale-75 blur-[2px]' : ''}
                  ${isHidden ? 'z-10 opacity-0 scale-50' : ''}
                `}
              >
                {/* TESTIMONI CARD DESIGN */}
                <div className="bg-white w-[300px] sm:w-[380px] md:w-[500px] p-10 md:p-14 rounded-[3.5rem] border border-gray-50 shadow-[0_40px_100px_rgba(0,0,0,0.05)] flex flex-col justify-between">
                  <div className="space-y-8 text-left">
                    <div className="flex justify-between items-center">
                       <div className="flex gap-1">
                          {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-[#E3242B] text-[#E3242B]" />)}
                       </div>
                       <Quote size={32} className="text-gray-100" />
                    </div>

                    <p className="text-[#111827] font-bold text-sm leading-loose text-justify uppercase tracking-tight line-clamp-6">
                      "{item.isi}"
                    </p>

                    <div className="bg-gray-50 p-5 rounded-2xl border-l-4 border-[#E3242B]">
                        <p className="text-[10px] font-black text-[#111827] uppercase tracking-tighter leading-tight">
                           {item.jabatan}
                        </p>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-50 flex items-center gap-4 text-left">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md border-2 border-white shrink-0 bg-gray-50">
                      <img src={item.gambar_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={item.nama} />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-black text-[#111827] text-xs uppercase truncate tracking-widest">{item.nama}</h4>
                      <div className="flex items-center gap-2 mt-1 opacity-40">
                         <Calendar size={10} />
                         <p className="text-[8px] font-black text-[#111827] uppercase">{item.tanggal}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* INDICATOR LINE (Premium Progress) */}
        <div className="flex justify-center gap-2 mt-10">
            {items.map((_, i) => (
                <button 
                    key={i} 
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-16 bg-[#E3242B]' : 'w-4 bg-gray-200'}`}
                />
            ))}
        </div>

        {/* --- 3. CALL TO ACTION (KONSISTEN) --- */}
        <div className="mt-24 p-8 md:p-12 bg-[#111827] rounded-[3.5rem] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3242B] opacity-10 blur-[100px]"></div>

            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                    <MessageSquare className="text-[#E3242B]" size={28} />
                </div>
                <div className="space-y-1">
                    <h4 className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter">
                        Portal Aspirasi Tokoh
                    </h4>
                    <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                        Kumpulan testimoni otentik dari seluruh wilayah dampingan DDP.
                    </p>
                </div>
            </div>

            <Link 
                to="/testimoni" 
                className="group relative z-10 px-8 py-4 bg-[#E3242B] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-[#111827] transition-all duration-500 shadow-xl flex items-center gap-3 active:scale-95"
            >
                Lihat Seluruh Testimoni <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </section>
  );
};