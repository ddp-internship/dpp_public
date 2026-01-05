import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  BookOpen, Search, X, Send, ChevronLeft, 
  ChevronRight, ShieldCheck, Book, FileText, 
  Info, Clock, ArrowDown, Hash, Zap
} from 'lucide-react';
import { api, getStorageUrl } from '../api';

export const MonografiPage = () => {
  // --- STATE MANAGEMENT ---
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // State Verifikasi & Detail
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [visitor, setVisitor] = useState({ email: '', nama: '', instansi: '', keperluan: '' });

  // --- FETCH DATA ---
  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/public/monografi/all?page=${currentPage}&search=${search}`);
      setItems(res.data.data || []);
      setLastPage(res.data.last_page || 1);
    } catch (error) {
      console.error("Gagal sinkronisasi katalog");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData();
  };

  const handleOpenGate = (item: any) => {
    setSelectedBook(item);
    setShowModal(true);
  };

  const handleProcessAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/public/monografi/download', {
        monografi_id: selectedBook.id,
        ...visitor
      });
      window.open(selectedBook.link, '_blank');
      setShowModal(false);
      setVisitor({ email: '', nama: '', instansi: '', keperluan: '' });
    } catch (error) {
      alert("Mohon lengkapi formulir verifikasi.");
    }
  };

  // Kunci scroll body saat modal aktif
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  return (
    <div className="bg-[#FDFDFD] min-h-screen selection:bg-[#E3242B] selection:text-white font-sans text-left">
      
      {/* --- 1. INNOVATIVE "SOVEREIGN" HERO (ANIMATED & SPACIOUS) --- */}
      <section className="relative pt-32 pb-44 md:pt-64 md:pb-64 bg-[#111827] overflow-hidden rounded-b-[4rem] md:rounded-b-[6rem]">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("/img/pattern.png")', backgroundSize: '120px' }}></div>
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-br from-[#E3242B]/20 to-transparent blur-[180px] rounded-full -translate-y-1/3 translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
              <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#E3242B] animate-pulse"></div>
                 <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">Digital Academic Repository</span>
              </div>
              
              <div className="relative">
                  {/* Watermark Background */}
                  <h2 className="absolute -top-16 left-0 text-white/[0.02] text-[8rem] md:text-[12rem] font-black uppercase tracking-tighter pointer-events-none select-none hidden lg:block">
                    REPOS
                  </h2>
                  <h1 className="text-5xl md:text-[100px] font-black text-white uppercase tracking-tighter leading-[0.85] relative z-10">
                    Katalog <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3242B] to-[#ff4d4d]">
                        Monografi.
                    </span>
                  </h1>
              </div>

              <p className="text-gray-400 font-bold uppercase text-[10px] md:text-xs tracking-[0.25em] leading-loose max-w-xl border-l-4 border-[#E3242B] pl-8">
                 Akses pusat data profil desa yang presisi, akurat, dan telah melalui verifikasi metodologis Laboratorium DDP IPB University.
              </p>
            </div>

            {/* Sisi Kanan: Search & Stats Insight */}
            <div className="lg:col-span-4 space-y-6 animate-in fade-in slide-in-from-right-10 duration-1000 delay-500">
                <form onSubmit={handleSearchSubmit} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#E3242B] to-red-900 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-2 overflow-hidden">
                        <input 
                            type="text" 
                            placeholder="CARI WILAYAH..." 
                            className="flex-1 bg-transparent px-6 py-4 text-white font-black text-[10px] tracking-widest outline-none placeholder:text-gray-600"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="w-14 h-14 bg-[#E3242B] text-white rounded-3xl flex items-center justify-center hover:bg-white hover:text-[#111827] transition-all transform active:scale-90 shadow-xl">
                            <Search size={20} />
                        </button>
                    </div>
                </form>

                <div className="p-8 bg-white/5 backdrop-blur-md border border-white/5 rounded-[3rem] space-y-4">
                    <div className="flex items-center justify-between text-white">
                        <Hash size={20} className="text-[#E3242B]" />
                        <span className="text-3xl font-black italic tracking-tighter">Live</span>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">
                        Database Sinkron <br /> Secara Real-time
                    </p>
                </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
            <ArrowDown size={14} className="text-white animate-bounce" />
        </div>
      </section>

      {/* --- 2. THE CATALOG COLLECTION --- */}
      <section className="py-24 px-6 bg-white relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="py-40 text-center space-y-4">
               <div className="w-12 h-12 border-4 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto"></div>
               <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">Synchronizing Repository...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 md:gap-x-10 gap-y-16 animate-in fade-in duration-1000">
                {items.map((item) => (
                  <div key={item.id} className="group cursor-pointer" onClick={() => handleOpenGate(item)}>
                    <div className="relative aspect-[3/4.2] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white transition-all duration-700 group-hover:shadow-[0_30px_60px_rgba(227,36,43,0.15)] group-hover:-translate-y-3 bg-gray-50">
                       <img src={getStorageUrl(item.gambar)} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt={item.desa} />
                       <div className="absolute inset-0 bg-[#111827]/70 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[3px] flex items-center justify-center">
                            <div className="bg-[#E3242B] p-4 rounded-2xl text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                                <BookOpen size={24} />
                            </div>
                       </div>
                    </div>
                    <div className="mt-8 space-y-2 px-2 text-center md:text-left">
                       <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                           <Zap size={10} className="text-[#E3242B] fill-[#E3242B]" />
                           <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Digital Archive {item.tahun}</span>
                       </div>
                       <h4 className="font-black text-sm text-[#111827] uppercase tracking-tighter leading-tight line-clamp-2 group-hover:text-[#E3242B] transition-colors">{item.desa}</h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              {lastPage > 1 && (
                <div className="mt-40 flex justify-center items-center gap-4">
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-14 h-14 rounded-3xl border border-gray-100 flex items-center justify-center text-[#111827] hover:bg-[#111827] hover:text-white disabled:opacity-20 transition-all shadow-sm bg-white"><ChevronLeft size={24} /></button>
                  <div className="flex items-center gap-4 font-black text-[10px] text-[#111827]">
                      <span className="bg-[#111827] text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-lg">{currentPage}</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-400">{lastPage}</span>
                  </div>
                  <button disabled={currentPage === lastPage} onClick={() => setCurrentPage(p => p + 1)} className="w-14 h-14 rounded-3xl border border-gray-100 flex items-center justify-center text-[#111827] hover:bg-[#111827] hover:text-white disabled:opacity-20 transition-all shadow-sm bg-white"><ChevronRight size={24} /></button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* --- 3. KOMPREHENSIF LIGHTBOX (SCROLL FIXED) --- */}
      {showModal && createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-12 text-left">
          <div className="absolute inset-0 bg-[#0a0f1a]/98 backdrop-blur-3xl animate-fade-in duration-700" onClick={() => setShowModal(false)}></div>
          
          <div className="relative bg-white w-full max-w-7xl h-full max-h-[90vh] md:max-h-[85vh] rounded-[3.5rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.5)] flex flex-col md:flex-row animate-in zoom-in-95 duration-500 border border-white/10">
            
            {/* SISI KIRI: RINGKASAN DATA (TRUE SCROLLABLE AREA) */}
            <div className="h-[50%] lg:h-full lg:w-3/5 bg-[#F9FAFB] flex flex-col overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-100">
                {/* Fixed Summary Header */}
                <div className="p-10 pb-6 flex justify-between items-center border-b border-gray-100 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#E3242B] animate-ping"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Metadata Analysis</span>
                    </div>
                </div>

                {/* Scrollable Summary Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-10 lg:p-16 space-y-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[#E3242B]">
                            <Book size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Profil Monografi Desa</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-[#111827] uppercase tracking-tighter leading-[0.9]">
                            {selectedBook?.desa}
                        </h2>
                        <div className="h-1.5 w-16 bg-[#E3242B] rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 border-y border-gray-200 py-10">
                        {[
                          { l: 'Kecamatan', v: selectedBook?.kecamatan },
                          { l: 'Kabupaten/Kota', v: selectedBook?.kota },
                          { l: 'Provinsi', v: selectedBook?.provinsi },
                          { l: 'Tahun Terbit', v: selectedBook?.tahun }
                        ].map((info, idx) => (
                            <div key={idx} className="space-y-1">
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{info.l}</p>
                                <p className="text-xs md:text-sm font-black text-[#111827] uppercase tracking-tight">{info.v || '-'}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6 pb-10">
                        <div className="flex items-center gap-3">
                            <FileText size={18} className="text-[#E3242B]" />
                            <h4 className="font-black text-[#111827] uppercase tracking-widest text-xs">Abstrak & Ringkasan</h4>
                        </div>
                        <p className="text-gray-600 font-bold text-xs md:text-sm leading-[2.4] uppercase tracking-[0.15em] text-justify whitespace-pre-line">
                            {selectedBook?.ringkasan || 'Informasi ringkasan profil belum diunggah untuk wilayah ini.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* SISI KANAN: FORM VERIFIKASI (FIXED GATE) */}
            <div className="h-[50%] lg:h-full lg:w-2/5 p-10 lg:p-14 flex flex-col justify-center bg-white relative overflow-y-auto">
                <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 p-3 bg-gray-50 text-gray-400 hover:text-[#E3242B] rounded-full transition-all"><X size={28}/></button>
                
                <div className="mb-10 space-y-2">
                   <div className="flex items-center gap-2 text-[#E3242B]">
                      <ShieldCheck size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Authorization Access</span>
                   </div>
                   <h3 className="font-black text-2xl text-[#111827] uppercase tracking-tighter">Form Verifikasi</h3>
                   <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Sensus Digital Lab DDP IPB University.</p>
                </div>

                <form onSubmit={handleProcessAccess} className="space-y-5">
                    {[
                      { l: 'Nama Lengkap *', k: 'nama', t: 'text' },
                      { l: 'E-mail Institusi *', k: 'email', t: 'email' },
                      { l: 'Lembaga / Instansi *', k: 'instansi', t: 'text' }
                    ].map((f, i) => (
                        <div key={i} className="space-y-1">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">{f.l}</label>
                            <input type={f.t} required className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-[#111827] outline-none focus:ring-4 focus:ring-red-50 transition-all" 
                            onChange={e => setVisitor({...visitor, [f.k]: e.target.value})} />
                        </div>
                    ))}
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Tujuan Akses Data *</label>
                        <textarea required className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-[#111827] outline-none focus:ring-4 focus:ring-red-50 h-24 resize-none transition-all" 
                        onChange={e => setVisitor({...visitor, keperluan: e.target.value})} />
                    </div>
                    
                    <button type="submit" className="w-full py-5 bg-[#E3242B] text-white font-black rounded-2xl uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-red-900/40 hover:bg-[#111827] transition-all transform active:scale-95 group">
                        Buka Dokumen Penuh <Send size={16} className="inline ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </form>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* FOOTER */}
      <div className="py-24 flex flex-col items-center gap-6 bg-white border-t border-gray-50">
           <div className="h-px w-32 bg-gray-200"></div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[1em] text-center">Laboratory Data Desa Presisi IPB</p>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E3242B; border-radius: 10px; }
      `}</style>
    </div>
  );
};