import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, ChevronLeft, ChevronRight, Download, Send, 
  ShieldCheck, Zap, Image as ImageIcon, ArrowUpRight,
  BarChart3, Clock, Info, ArrowDown, Maximize2
} from 'lucide-react';
import { api, getStorageUrl } from '../api';

export const InfografisPage = () => {
  // --- STATE MANAGEMENT ---
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // State Slideshow & Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0); 
  const [visitor, setVisitor] = useState({ email: '', nama: '', instansi: '', keperluan: '' });
  const [isDownloading, setIsDownloading] = useState(false);

  // --- MODAL & SLIDESHOW HANDLERS ---
  const handleOpenGate = (item: any) => {
    setSelectedItem(item);
    setCurrentSlide(0);
    setShowModal(true);
  };

  const handlePrev = () => {
    setCurrentSlide(prev => prev === 0 ? selectedItem.gambar.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentSlide(prev => prev === selectedItem.gambar.length - 1 ? 0 : prev + 1);
  };

  const handleDownloadProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDownloading(true);
    try {
      await api.post('/public/infografis/download', {
        ...visitor,
        infografis_id: selectedItem.id
      });
      setShowModal(false);
      setVisitor({ email: '', nama: '', instansi: '', keperluan: '' });
    } catch (error) {
      console.error("Download gagal:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/public/infografis/all?page=${page}`);
        setItems(res.data.data || []);
        setLastPage(res.data.last_page || 1);
      } catch (error) {
        console.error("Gagal sinkronisasi data visual");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // Kunci scroll body saat modal aktif
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto"></div>
        {/* Penyelarasan font loading */}
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Synchronizing Analytics...</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FDFDFD] min-h-screen selection:bg-[#E3242B] selection:text-white font-sans text-center">
      
      {/* --- 1. CENTERED "SOVEREIGN" HERO --- */}
      <section className="relative pt-48 pb-32 md:pt-64 md:pb-64 bg-[#111827] overflow-hidden rounded-b-[4rem] md:rounded-b-[6rem]">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("/img/pattern.png")', backgroundSize: '120px' }}></div>
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-br from-[#E3242B]/20 to-transparent blur-[180px] rounded-full -translate-y-1/3 translate-x-1/4"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <div className="inline-flex items-center gap-4 px-5 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mx-auto">
               <BarChart3 size={14} className="text-[#E3242B]" />
               {/* Penyelarasan Label Hero */}
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Arsip Analitik Visual</span>
            </div>
            
            <div className="relative">
                <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.02] text-[6rem] md:text-[12rem] font-black uppercase tracking-tighter pointer-events-none select-none hidden lg:block w-full">
                  presisi
                </h2>
                {/* Penyelarasan Judul Hero */}
                <h1 className="text-5xl md:text-[90px] font-black text-white uppercase tracking-tighter leading-none relative z-10">
                  Sajian <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3242B] to-[#ff4d4d]">
                      Infografis
                  </span>
                </h1>
            </div>

            {/* Penyelarasan Deskripsi Hero */}
            <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed max-w-2xl mx-auto border-y border-white/5 py-8">
               Interpretasi visual data desa presisi yang menyederhanakan kompleksitas menjadi informasi strategis untuk pembangunan nasional.
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
            <ArrowDown size={14} className="text-white animate-bounce" />
        </div>
      </section>

      {/* --- 2. REFINED COMPACT GRID --- */}
      <section className="py-24 px-6 bg-white relative -mt-16 z-20">
        <div className="max-w-6xl mx-auto">
          {items.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 animate-in fade-in duration-1000">
              {items.map((item) => (
                <div 
                    key={item.id} 
                    className="group cursor-pointer bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col h-full text-center"
                    onClick={() => handleOpenGate(item)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 border-b border-gray-50">
                    <img src={Array.isArray(item.gambar_urls) ? item.gambar_urls[0] : item.gambar_urls} className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" alt={item.judul} />
                    <div className="absolute inset-0 bg-[#111827]/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[1px]">
                        <div className="bg-white text-[#111827] w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-all duration-500">
                           <Maximize2 size={20}/>
                        </div>
                    </div>
                    {/* Penyelarasan Slide Indicator */}
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[8px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-widest">
                       {Array.isArray(item.gambar) ? item.gambar.length : 1} Slides
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-4 flex-grow flex flex-col items-center">
                      {/* Penyelarasan Kategori */}
                      <span className="text-[8px] font-bold text-[#E3242B] uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
                        {item.kategori || 'Analitik'}
                      </span>
                      {/* Penyelarasan Judul Item */}
                      <h4 className="font-black text-sm md:text-base text-[#111827] uppercase tracking-tighter leading-tight line-clamp-2 group-hover:text-[#E3242B] transition-colors">
                          {item.judul}
                      </h4>
                      <div className="flex items-center flex-col gap-3">
                         <div className="h-0.5 w-8 bg-gray-100 rounded-full group-hover:w-12 group-hover:bg-[#E3242B] transition-all duration-500"></div>
                         {/* Penyelarasan Metadata */}
                         <div className="flex items-center gap-2">
                            <Zap size={10} className="text-gray-300 fill-gray-300" />
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">DDP Visual Lab</span>
                         </div>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-40 opacity-20">
                <BarChart3 size={64} className="mx-auto mb-4" />
                <p className="font-bold uppercase tracking-widest text-[10px]">Katalog Belum Tersedia</p>
            </div>
          )}

          {/* PAGINATION */}
          {lastPage > 1 && (
            <div className="mt-24 flex justify-center items-center gap-4 border-t border-gray-50 pt-12">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-[#111827] hover:bg-[#111827] hover:text-white disabled:opacity-20 transition-all shadow-sm bg-white"><ChevronLeft size={20}/></button>
              {/* Penyelarasan Font Pagination */}
              <div className="flex items-center gap-4 font-black text-[10px] text-[#111827] tracking-widest">
                  <span className="bg-[#111827] text-white w-8 h-8 flex items-center justify-center rounded-lg">{page}</span>
                  <span className="text-gray-300">/</span>
                  <span className="text-gray-400">{lastPage}</span>
              </div>
              <button disabled={page === lastPage} onClick={() => setPage(p => p + 1)} className="w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center text-[#111827] hover:bg-[#111827] hover:text-white disabled:opacity-20 transition-all shadow-sm bg-white"><ChevronRight size={20}/></button>
            </div>
          )}
        </div>
      </section>

      {/* --- 3. THE IMMERSIVE MODAL --- */}
      {showModal && createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-12 text-left">
          <div className="absolute inset-0 bg-[#0B1120]/98 backdrop-blur-3xl animate-fade-in duration-700" onClick={() => setShowModal(false)}></div>
          
          <div className="relative bg-white w-full max-w-7xl h-full max-h-[90vh] md:max-h-[85vh] rounded-[3.5rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.5)] flex flex-col md:flex-row animate-in zoom-in-95 duration-500 border border-white/10">
            
            {/* LEFT: SLIDESHOW */}
            <div className="h-[45%] md:h-full md:flex-1 bg-[#0a0f1a] relative flex items-center justify-center group/slider overflow-hidden border-b md:border-b-0 md:border-r border-gray-100">
               <img 
                  key={currentSlide}
                  src={selectedItem?.gambar_urls[currentSlide]} 
                  className="max-w-[95%] max-h-[95%] object-contain animate-in fade-in slide-in-from-right-4 duration-700" 
                  alt="Slide" 
               />
               <button onClick={handlePrev} className="absolute left-6 p-4 bg-white/5 hover:bg-[#E3242B] rounded-2xl text-white transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover/slider:opacity-100"><ChevronLeft size={24} /></button>
               <button onClick={handleNext} className="absolute right-6 p-4 bg-white/5 hover:bg-[#E3242B] rounded-2xl text-white transition-all backdrop-blur-md border border-white/10 opacity-0 group-hover/slider:opacity-100"><ChevronRight size={24} /></button>
               {/* Penyelarasan Slide Counter */}
               <div className="absolute bottom-8 bg-[#E3242B] px-6 py-2 rounded-full text-white font-bold text-[9px] uppercase tracking-widest shadow-2xl">
                  Slide {currentSlide + 1} / {selectedItem.gambar.length}
               </div>
            </div>

            {/* RIGHT: INFO & FORM */}
            <div className="h-[55%] md:h-full md:w-[450px] bg-white flex flex-col overflow-hidden">
                <div className="p-8 pb-4 flex justify-between items-center border-b border-gray-50 shrink-0">
                    <div className="flex items-center gap-2">
                        <Zap size={16} className="text-[#E3242B] fill-[#E3242B]" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Metadata Gate</span>
                    </div>
                    <button onClick={() => setShowModal(false)} className="p-2 text-gray-300 hover:text-[#E3242B] hover:bg-red-50 rounded-full transition-all"><X size={24}/></button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-10 space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black text-[#111827] uppercase tracking-tighter leading-tight">{selectedItem?.judul}</h2>
                        <div className="h-1.5 w-12 bg-[#E3242B] rounded-full"></div>
                        {/* Penyelarasan Keterangan */}
                        <p className="text-gray-500 font-medium text-sm leading-relaxed text-justify">
                            {selectedItem?.keterangan || "Analisis visual terpadu berbasis data presisi laboratorium IPB University."}
                        </p>
                    </div>

                    <div className="space-y-8 pt-8 border-t border-gray-100">
                        <div className="space-y-2 text-center">
                            <ShieldCheck size={28} className="text-emerald-500 mx-auto" />
                            <h3 className="font-bold text-[#111827] uppercase tracking-widest text-[10px]">Verifikasi Akses</h3>
                        </div>

                        <form onSubmit={handleDownloadProcess} className="space-y-5">
                            {[
                                { label: 'Nama Lengkap *', key: 'nama', type: 'text' },
                                { label: 'E-mail Aktif *', key: 'email', type: 'email' },
                                { label: 'Asal Instansi *', key: 'instansi', type: 'text' }
                            ].map((f, i) => (
                                <div key={i} className="space-y-1.5">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">{f.label}</label>
                                    <input required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-red-50 text-sm font-bold text-[#111827] tracking-tight outline-none transition-all" 
                                    onChange={e => setVisitor({...visitor, [f.key]: e.target.value})} />
                                </div>
                            ))}
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Tujuan Penggunaan *</label>
                                <textarea required className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-red-50 h-24 resize-none text-sm font-bold text-[#111827] tracking-tight outline-none transition-all" 
                                onChange={e => setVisitor({...visitor, keperluan: e.target.value})} />
                            </div>
                            {/* Penyelarasan Button Request */}
                            <button type="submit" disabled={isDownloading} className="w-full py-5 bg-[#E3242B] text-white font-bold rounded-2xl uppercase tracking-widest text-[10px] shadow-xl hover:bg-[#111827] transition-all transform active:scale-95 group">
                                {isDownloading ? 'Memproses...' : 'Request Download ZIP'} <Download size={16} className="inline ml-2 group-hover:translate-y-0.5 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="p-8 border-t border-gray-50 shrink-0 bg-gray-50/50 text-center">
                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Official Lab DDP IPB University Release</p>
                </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* FOOTER */}
      <footer className="py-24 flex flex-col items-center gap-6 bg-white border-t border-gray-50">
           <div className="h-px w-32 bg-gray-200"></div>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Laboratory Data Desa Presisi IPB University</p>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E3242B; border-radius: 10px; }
      `}</style>
    </div>
  );
};
