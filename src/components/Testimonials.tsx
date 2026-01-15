import { useEffect, useState, useCallback } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../api';

export const Testimonials = () => {
  const [items, setItems] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA ---
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
        console.error("Gagal memuat data testimoni");
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

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (loading) return (
    <div className="py-40 text-center space-y-3">
      <div className="w-8 h-8 border-3 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-[10px] font-bold text-gray-400 tracking-wider">Menyiapkan ulasan terbaik...</p>
    </div>
  );

  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-white px-6 lg:px-24 relative overflow-hidden selection:bg-[#E3242B] selection:text-white">
      
      {/* Dekorasi Latar Belakang */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[120px] -z-0 opacity-40 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. HEADER (Konsisten dengan About) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
               <span className="text-[11px] font-bold text-[#E3242B] tracking-widest uppercase">Suara Stakeholder</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter leading-none">
              Apresiasi <span className="text-[#E3242B]">Para Tokoh</span>
            </h2>
            <p className="text-gray-500 font-medium text-sm max-w-md leading-relaxed">
              Telah dihimpun <span className="text-[#111827] font-bold">{totalCount} testimoni</span> resmi dari berbagai penjuru negeri untuk Satu Data Indonesia.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
            <button onClick={prevSlide} className="w-12 h-12 rounded-xl bg-white hover:bg-[#111827] hover:text-white transition-all flex items-center justify-center border border-gray-100 shadow-sm active:scale-95">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 rounded-xl bg-[#E3242B] text-white hover:bg-[#111827] shadow-lg shadow-red-900/20 transition-all flex items-center justify-center active:scale-95">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* --- 2. PREMIUM STAGE SLIDER --- */}
        <div className="relative h-[500px] md:h-[550px] flex items-center justify-center">
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
                className={`absolute transition-all duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col items-center
                  ${isActive ? 'z-30 opacity-100 translate-x-0 scale-100' : ''}
                  ${isPrev ? 'z-20 opacity-20 -translate-x-[85%] md:-translate-x-[100%] scale-90 blur-[1px]' : ''}
                  ${isNext ? 'z-20 opacity-20 translate-x-[85%] md:translate-x-[100%] scale-90 blur-[1px]' : ''}
                  ${isHidden ? 'z-10 opacity-0 scale-50' : ''}
                `}
              >
                <div className="bg-white w-[300px] sm:w-[380px] md:w-[600px] p-10 md:p-14 rounded-[3.5rem] border border-gray-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                  <div className="space-y-8 text-left">
                    <div className="flex justify-between items-center">
                       <div className="flex gap-1.5">
                          {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-[#E3242B] text-[#E3242B]" />)}
                       </div>
                       <Quote size={40} className="text-gray-100" />
                    </div>

                    <p className="text-[#111827] font-bold text-base md:text-lg leading-relaxed text-justify tracking-tight line-clamp-6 italic">
                      "{item.isi}"
                    </p>

                    <div className="bg-gray-50 p-6 rounded-[2rem] border-l-4 md:border-l-[10px] border-[#111827]">
                        <p className="text-[11px] font-bold text-[#111827] uppercase tracking-widest leading-snug">
                           {item.jabatan}
                        </p>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-gray-100 flex items-center gap-5 text-left">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-4 border-white shrink-0 bg-gray-100">
                      <img src={item.gambar_url} className="w-full h-full object-cover grayscale-[30%]" alt={item.nama} />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-black text-[#111827] text-sm tracking-tight">{item.nama}</h4>
                      <div className="flex items-center gap-2 mt-1.5 text-gray-400">
                         <Calendar size={12} />
                         <p className="text-[10px] font-bold uppercase tracking-widest">{item.tanggal}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicator Line */}
        <div className="flex justify-center gap-3 mt-12">
            {items.map((_, i) => (
                <button 
                    key={i} 
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-12 bg-[#E3242B]' : 'w-3 bg-gray-200'}`}
                />
            ))}
        </div>

        {/* --- 3. CALL TO ACTION (UX WRITER STYLE) --- */}
        <div className="mt-24 p-10 md:p-14 bg-[#111827] rounded-[3.5rem] flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3242B] opacity-10 blur-[100px]"></div>

            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                    <MessageSquare className="text-[#E3242B]" size={28} />
                </div>
                <div className="space-y-1">
                    <h4 className="text-white text-xl md:text-2xl font-black tracking-tighter">
                        Portal Aspirasi Tokoh
                    </h4>
                    <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                        Kumpulan testimoni otentik dari seluruh wilayah dampingan DDP.
                    </p>
                </div>
            </div>

            <Link 
                to="/testimoni" 
                className="group relative z-10 px-10 py-5 bg-[#E3242B] text-white text-xs font-bold tracking-wide rounded-2xl hover:bg-white hover:text-[#111827] transition-all duration-500 shadow-xl flex items-center gap-3 active:scale-95 shrink-0"
            >
                Lihat Seluruh Testimoni <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
        </div>

      </div>
    </section>
  );
};
