import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, ArrowUpRight, FileCheck, X, Send, ShieldCheck, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api, getStorageUrl } from '../api';

export const Monografi = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Pop-up Verifikasi
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [visitor, setVisitor] = useState({ email: '', nama: '', instansi: '', keperluan: '' });

  // --- FETCH DATA ---
  useEffect(() => {
    // SOP: Sinkronisasi data monografi pilihan dari Jalur Publik
    api.get('/public/monografi/featured')
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Kunci Scroll saat Modal Aktif
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  const handleOpenForm = (item: any) => {
    setSelectedBook(item);
    setShowModal(true);
  };

console.log(items);

  const handleProcessDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/public/monografi/download', {
        monografi_id: selectedBook.id,
        ...visitor
      });
      
      window.open(selectedBook.link, '_blank');
      setShowModal(false);
      setVisitor({ email: '', nama: '', instansi: '', keperluan: '' });
      alert("Verifikasi Berhasil. Membuka dokumen digital...");
    } catch (error) {
      alert("Mohon isi formulir verifikasi dengan benar.");
    }
  };

  if (loading) return (
    <div className="py-20 text-center">
      <div className="w-8 h-8 border-3 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Sinkronisasi Katalog...</p>
    </div>
  );

  return (
    <section id="monografi" className="py-24 bg-white px-6 lg:px-24 relative overflow-hidden selection:bg-[#E3242B] selection:text-white">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[120px] -z-0 opacity-40 translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. HEADER (KONSISTEN: CENTERED ON MOBILE, LEFT ON DESKTOP) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
               <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.3em]">Repositori Digital</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter uppercase leading-none">
              Katalog <span className="text-[#E3242B]">Monografi</span>
            </h2>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest max-w-md leading-relaxed">
              Arsip data profil desa terverifikasi untuk pembangunan berbasis fakta.
            </p>
          </div>
          
          <Link to="/monografi" className="group flex items-center gap-4 bg-[#111827] text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#E3242B] transition-all shadow-xl active:scale-95">
            Lihat Semua Monografi <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        {/* --- 2. GRID 5 BUKU (UNIFORM & PREMIUM) --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
          {items.map((item) => (
            <div key={item.id} className="group cursor-pointer flex flex-col h-full" onClick={() => handleOpenForm(item)}>
              <div className="relative aspect-[3/4.2] rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-700 border-4 border-white bg-gray-50">
                <img 
                    src={item.gambar_url} 
                    alt={item.desa} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1500ms]" 
                />
                
                {/* Immersive Overlay */}
                <div className="absolute inset-0 bg-[#111827]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 backdrop-blur-[2px]">
                    <div className="w-10 h-10 bg-[#E3242B] rounded-xl flex items-center justify-center text-white mb-3 shadow-lg"><BookOpen size={20} /></div>
                    <p className="text-white font-black text-[10px] uppercase tracking-widest leading-none">Buka Dokumen</p>
                </div>
              </div>
              
              <div className="mt-6 text-center lg:text-left space-y-1 px-1">
                <h4 className="text-[#111827] font-black text-sm uppercase tracking-tighter leading-tight line-clamp-2 group-hover:text-[#E3242B] transition-colors">
                    {item.desa}
                </h4>
                <div className="flex items-center justify-center lg:justify-start gap-2 opacity-40">
                    <div className="h-px w-4 bg-[#111827]"></div>
                    <span className="text-[9px] font-black text-[#111827] uppercase tracking-widest">Tahun {item.tahun}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 3. MODAL VERIFIKASI (PREMIUM ACCESS GATE) --- */}
      {showModal && createPortal(
        <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6" style={{ zIndex: 99999 }}>
            <div className="absolute inset-0 bg-[#0B1120]/95 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setShowModal(false)}></div>
            
            <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden border border-white/20 z-[100000] animate-in zoom-in-95 duration-300">
                <div className="p-8 bg-[#F9FAFB] border-b border-gray-100 flex justify-between items-center">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[#E3242B]">
                            <ShieldCheck size={16} />
                            <h3 className="text-sm font-black uppercase tracking-widest">Verified Gate</h3>
                        </div>
                        <p className="text-[11px] font-black text-[#111827] uppercase tracking-tighter">{selectedBook?.desa}</p>
                    </div>
                    <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white rounded-full text-gray-400 hover:text-[#E3242B] transition-all shadow-sm"><X size={20}/></button>
                </div>
                
                <form onSubmit={handleProcessDownload} className="p-10 space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap *</label>
                        <input type="text" required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-red-50 text-sm font-bold text-[#111827] outline-none transition-all" 
                        onChange={(e) => setVisitor({...visitor, nama: e.target.value})} placeholder="Nama..." />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">E-mail Aktif *</label>
                        <input type="email" required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-red-50 text-sm font-bold text-[#111827] outline-none transition-all" 
                        onChange={(e) => setVisitor({...visitor, email: e.target.value})} placeholder="nama@email.com" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Asal Instansi / Lembaga *</label>
                        <input type="text" required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-red-50 text-sm font-bold text-[#111827] outline-none transition-all" 
                        onChange={(e) => setVisitor({...visitor, instansi: e.target.value})} placeholder="Pemerintah Desa / Universitas..." />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Keperluan Akses Data *</label>
                        <textarea required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-red-50 text-sm font-bold text-[#111827] outline-none h-24 resize-none transition-all" 
                        onChange={(e) => setVisitor({...visitor, keperluan: e.target.value})} placeholder="Tujuan penelitian / dinas..." />
                    </div>
                    
                    <button type="submit" className="w-full py-5 bg-[#E3242B] text-white font-black rounded-2xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-red-900/40 hover:bg-[#111827] transition-all transform active:scale-95">
                        Buka Dokumen Digital <Send size={16} />
                    </button>
                    <p className="text-center text-[8px] font-bold text-gray-400 uppercase tracking-widest">Official Lab DDP IPB University Verification</p>
                </form>
            </div>
        </div>,
        document.body
      )}
    </section>
  );
};