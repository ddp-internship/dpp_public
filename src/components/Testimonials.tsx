import React, { useEffect, useState } from 'react';
import { Quote, Star, ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { ScrollReveal } from './ScrollReveal'; 

export const Testimonials = () => {
  const [items, setItems] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featuredRes, countRes] = await Promise.all([
          api.get('/public/testimoni/featured'),
          api.get('/public/testimoni/count')
        ]);
        // Menampilkan maksimal 5 sesuai instruksi terbaru
        setItems(featuredRes.data.slice(0, 5));
        setTotalCount(countRes.data.total);
      } catch (error) {
        console.error("Gagal memuat data testimoni");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="py-40 text-center space-y-3">
      <div className="w-8 h-8 border-3 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Menyiapkan ulasan terbaik...</p>
    </div>
  );

  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-white px-6 lg:px-24 relative overflow-hidden selection:bg-[#E3242B] selection:text-white">
      
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[120px] -z-0 opacity-40 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. HEADER --- */}
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-20 pb-10 border-b border-gray-100">
            <div className="space-y-3 text-center lg:text-left">
              <span className="text-[11px] font-bold text-[#E3242B] tracking-widest uppercase">Apresiasi Stakeholder</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter leading-none uppercase">
                Testimoni <span className="text-[#E3242B]">Tokoh Bangsa</span>
              </h2>
              <p className="text-gray-500 font-medium text-sm max-w-md leading-relaxed">
                Telah dihimpun <span className="text-[#111827] font-bold">{totalCount} testimoni</span> resmi dari berbagai penjuru negeri untuk Satu Data Indonesia.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* --- 2. MODERN GRID CEO STYLE (Tampil 5 Card) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.1}>
              <div className="group bg-white h-full p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(227,36,43,0.08)] hover:border-[#E3242B]/20 transition-all duration-700 flex flex-col justify-between relative overflow-hidden">
                
                <div className="absolute top-0 left-0 w-2 h-full bg-gray-50 group-hover:bg-[#E3242B] transition-colors duration-700"></div>

                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <Quote size={32} className="text-[#E3242B]/10 group-hover:text-[#E3242B]/20 transition-colors" />
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-[#E3242B] text-[#E3242B]" />)}
                    </div>
                  </div>

                  <p className="text-[#111827] font-bold text-sm md:text-base leading-relaxed tracking-tight line-clamp-6 italic">
                    "{item.isi}"
                  </p>

                  <div className="pt-4">
                    <div className="inline-block px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100 group-hover:bg-red-50 group-hover:border-red-100 transition-colors">
                      <p className="text-[9px] font-black text-[#111827] uppercase tracking-widest leading-none">
                        {item.jabatan}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md border-2 border-white shrink-0 bg-gray-50 transition-transform duration-500 group-hover:scale-110">
                    <img src={item.gambar_url} className="w-full h-full object-cover" alt={item.nama} />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-black text-[#111827] text-[13px] tracking-tight uppercase leading-none">{item.nama}</h4>
                    <div className="flex items-center gap-1.5 mt-1.5 text-gray-400">
                       <Calendar size={10} />
                       <p className="text-[9px] font-bold uppercase tracking-widest leading-none">{item.tanggal}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* --- 3. CALL TO ACTION --- */}
        <ScrollReveal delay={0.4}>
          <div className="mt-20 p-10 md:p-14 bg-[#111827] rounded-[3.5rem] flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3242B] opacity-10 blur-[100px]"></div>

              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                      <MessageSquare className="text-[#E3242B]" size={28} />
                  </div>
                  <div className="space-y-1">
                      <h4 className="text-white text-xl md:text-2xl font-black tracking-tighter uppercase">
                          Portal Aspirasi Tokoh
                      </h4>
                      <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                          Kumpulan testimoni otentik dari seluruh wilayah dampingan DDP.
                      </p>
                  </div>
              </div>

              <Link 
                  to="/testimoni" 
                  className="group relative z-10 px-10 py-5 bg-[#E3242B] text-white text-xs font-bold tracking-wide rounded-2xl hover:bg-white hover:text-[#111827] transition-all duration-500 shadow-xl flex items-center gap-3 active:scale-95 shrink-0 uppercase"
              >
                  Lihat Seluruh Testimoni <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};