import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { 
  X, ChevronLeft, ChevronRight, ShieldCheck, Info, 
  Layers, Bookmark, GraduationCap, ExternalLink,
  Book, FileText, ArrowDown, Zap
} from 'lucide-react';
import { api, getStorageUrl } from '../api';

export const BukuJurnalPage = () => {
  // --- STATE MANAGEMENT ---
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'buku' | 'jurnal'>('buku');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selected, setSelected] = useState<any>(null);

  const location = useLocation();

  // --- SINKRONISASI TAB DARI NAVBAR ---
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
      setPage(1); 
    }
  }, [location.state]);

  // --- FETCH DATA (SINKRON TABS & PAGINATION) ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/public/${activeTab}/all?page=${page}`);
        setItems(res.data.data || []);
        setLastPage(res.data.last_page || 1);
      } catch (error) {
        console.error("Gagal sinkronisasi pustaka");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, activeTab]);

  // Kunci scroll body saat modal aktif
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : 'auto';
  }, [selected]);

  return (
    <div className="bg-[#FDFDFD] min-h-screen selection:bg-[#E3242B] selection:text-white font-sans text-left">
      
      {/* --- 1. INNOVATIVE "SOVEREIGN" HERO HEADER (SEIRAMA) --- */}
      <section className="relative pt-32 pb-24 md:pt-52 md:pb-44 bg-[#111827] overflow-hidden rounded-b-[4rem] md:rounded-b-[6rem]">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("/img/pattern.png")', backgroundSize: '120px' }}></div>
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-br from-[#E3242B]/10 to-transparent blur-[180px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12">
            
            <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
              <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                 <GraduationCap size={14} className="text-[#E3242B]" />
                 <span className="text-[9px] md:text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Official Academic Repository</span>
              </div>
              
              <div className="relative">
                  {/* Watermark Background - Inovasi Seirama */}
                  <h2 className="absolute -top-16 left-0 text-white/[0.02] text-[8rem] md:text-[12rem] font-black uppercase tracking-tighter pointer-events-none select-none hidden lg:block">
                    LIBRARY
                  </h2>
                  <h1 className="text-5xl md:text-[100px] font-black text-white uppercase tracking-tighter leading-[0.85] relative z-10">
                    Pustaka <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3242B] to-[#ff4d4d]">
                        Akademik.
                    </span>
                  </h1>
              </div>

              <p className="text-gray-400 font-bold uppercase text-[9px] md:text-[11px] tracking-[0.25em] leading-loose max-w-xl border-l-4 border-[#E3242B] pl-6 md:pl-8">
                 Pusat arsip digital publikasi ilmiah, jurnal riset strategis, dan buku monografi presisi Laboratory DDP IPB University.
              </p>
            </div>

            {/* TAB SWITCHER (Premium Alignment) */}
            <div className="flex bg-white/5 p-1.5 rounded-[2.5rem] border border-white/10 backdrop-blur-md shadow-2xl animate-in fade-in zoom-in-95 duration-1000 delay-500">
                <button 
                  onClick={() => { setActiveTab('buku'); setPage(1); }}
                  className={`px-8 md:px-12 py-4 md:py-5 rounded-[2rem] font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === 'buku' ? 'bg-[#E3242B] text-white shadow-xl scale-105' : 'text-gray-500 hover:text-white'}`}
                >
                  Katalog Buku
                </button>
                <button 
                  onClick={() => { setActiveTab('jurnal'); setPage(1); }}
                  className={`px-8 md:px-12 py-4 md:py-5 rounded-[2rem] font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === 'jurnal' ? 'bg-[#E3242B] text-white shadow-xl scale-105' : 'text-gray-500 hover:text-white'}`}
                >
                  Jurnal Ilmiah
                </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
            <ArrowDown size={14} className="text-white animate-bounce" />
        </div>
      </section>

      {/* --- 2. COLLECTION GRID --- */}
      <section className="py-24 px-6 bg-white relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="py-40 text-center space-y-4">
                <div className="w-10 h-10 border-4 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Membuka Brankas Pustaka...</p>
            </div>
          ) : (
            <>
              {items.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-16 animate-in fade-in duration-1000">
                  {items.map((item) => (
                    <div key={item.id} className="group cursor-pointer" onClick={() => setSelected(item)}>
                      <div className="relative aspect-[3/4.5] rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(227,36,43,0.15)] group-hover:-translate-y-3">
                         <img src={item.gambar_url} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt="Cover" />
                         <div className="absolute inset-0 bg-[#111827]/70 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[3px] flex items-center justify-center">
                             <div className="bg-[#E3242B] p-4 rounded-2xl text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                                <Bookmark size={24} />
                             </div>
                         </div>
                      </div>

                      <div className="mt-8 space-y-2 px-1">
                         <div className="flex items-center gap-2 mb-1">
                            <Zap size={12} className="text-[#E3242B] fill-[#E3242B]" />
                            <span className="text-[8px] font-black text-[#E3242B] uppercase tracking-widest">{activeTab === 'buku' ? 'Official Textbook' : 'Scientific Research'}</span>
                         </div>
                         <h4 className="font-black text-sm md:text-lg text-[#111827] uppercase tracking-tighter leading-tight line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] group-hover:text-[#E3242B] transition-colors">
                            {activeTab === 'buku' ? (item.judul_buku || item.judul) : (item.judul_jurnal || item.judul)}
                         </h4>
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate">{item.penulis || 'Laboratory DDP IPB'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-40 text-center opacity-30 flex flex-col items-center gap-6">
                   <Layers size={64} />
                   <p className="font-black uppercase tracking-[0.3em] text-xs">Koleksi Belum Tersedia</p>
                </div>
              )}

              {/* PAGINATION (TESLA STYLE) */}
              {lastPage > 1 && (
                <div className="mt-40 flex justify-center items-center gap-6">
                  <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="w-14 h-14 rounded-3xl border border-gray-100 flex items-center justify-center text-[#111827] hover:bg-[#111827] hover:text-white disabled:opacity-20 transition-all shadow-sm bg-white"><ChevronLeft size={24}/></button>
                  <div className="flex items-center gap-4 font-black text-[10px] text-[#111827]">
                      <span className="bg-[#111827] text-white w-10 h-10 flex items-center justify-center rounded-xl">{page}</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-400">{lastPage}</span>
                  </div>
                  <button disabled={page === lastPage} onClick={() => setPage(p => p + 1)} className="w-14 h-14 rounded-3xl border border-gray-100 flex items-center justify-center text-[#111827] hover:bg-[#111827] hover:text-white disabled:opacity-20 transition-all shadow-sm bg-white"><ChevronRight size={24}/></button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* --- 3. PREMIUM READER MODAL (UNIFIED STYLE - FIXED SCROLL) --- */}
      {selected && createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-12 text-left">
          <div className="absolute inset-0 bg-[#0a0f1a]/98 backdrop-blur-3xl animate-fade-in duration-700" onClick={() => setSelected(null)}></div>
          
          <div className="relative bg-white w-full max-w-7xl h-full max-h-[90vh] md:max-h-[85vh] rounded-[3.5rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.5)] flex flex-col md:flex-row animate-in zoom-in-95 duration-500 border border-white/10">
            
            {/* LEFT: IMAGE SIDEBAR (STATIC DESKTOP | TOP MOBILE) */}
            <div className="h-[40%] md:h-full md:w-[35%] bg-[#111827] flex flex-col justify-between p-10 md:p-14 relative overflow-hidden border-b md:border-b-0 md:border-r border-gray-100 shrink-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3242B] opacity-5 blur-[100px]"></div>
                <div className="z-10 space-y-12">
                    <button onClick={() => setSelected(null)} className="flex items-center gap-4 text-gray-500 hover:text-white transition-colors font-black text-[10px] uppercase tracking-[0.3em] group">
                       <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#E3242B] transition-all"><X size={20}/></div> Tutup Jendela
                    </button>
                    <div className="aspect-[3/4.5] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-gray-900">
                        <img src={selected.gambar_url} className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-[1500ms]" alt="Visual" />
                    </div>
                </div>
                <div className="z-10 opacity-20 text-left"><p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.8em]">Lab DDP IPB</p></div>
            </div>

            {/* RIGHT: CONTENT AREA (TRUE SCROLLABLE) */}
            <div className="h-[60%] md:h-full md:flex-1 bg-white flex flex-col overflow-hidden">
                {/* Header (Static) */}
                <div className="p-10 md:px-16 md:pt-16 md:pb-8 border-b border-gray-50 shrink-0">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 rounded-full bg-[#E3242B] animate-ping"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Official Academic Resource</span>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-4xl font-black text-[#111827] uppercase tracking-tighter leading-[0.95]">
                            {activeTab === 'buku' ? (selected.judul_buku || selected.judul) : (selected.judul_jurnal || selected.judul)}
                        </h2>
                    </div>
                </div>

                {/* Content Area (SCROLLABLE) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-10 md:px-16 md:py-12 space-y-12 text-left">
                    <div className="space-y-6 text-[#111827] border-b border-gray-50 pb-10">
                        <div className="flex justify-between items-center gap-6">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest shrink-0">Redaksi / Penulis</span>
                            <span className="text-xs font-black uppercase tracking-tight text-right">{selected.penulis}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Tahun Terbit</span>
                            <span className="text-xs font-black text-[#E3242B] uppercase tracking-tight">{selected.tahun || '2025'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Verifikasi Status</span>
                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2"><ShieldCheck size={14}/> Verified Publication</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <FileText size={16} className="text-[#E3242B]" />
                            <span className="text-[9px] font-black text-[#111827] uppercase tracking-widest">Keterangan Dokumen</span>
                        </div>
                        <p className="text-gray-600 font-bold text-xs md:text-sm leading-[2.4] uppercase tracking-[0.15em] text-justify whitespace-pre-line">
                            {selected.keterangan || selected.deskripsi || "Publikasi akademik resmi ini terdokumentasi dalam sistem repositori Laboratorium Data Desa Presisi IPB University dan dapat diakses secara digital."}
                        </p>
                    </div>
                </div>

                {/* Footer (Static) */}
                <div className="p-10 border-t border-gray-50 shrink-0 bg-gray-50/50">
                    <a 
                      href={activeTab === 'buku' ? (selected.link || selected.link_drive) : selected.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-full py-6 bg-[#111827] text-white font-black rounded-[2rem] flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-[#E3242B] transition-all transform active:scale-95 group"
                    >
                        AKSES DOKUMEN PENUH <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* FOOTER BRANDING */}
      <div className="py-24 flex flex-col items-center gap-6 bg-white border-t border-gray-50">
           <div className="h-px w-32 bg-gray-200"></div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[1em] text-center">Laboratory DDP IPB University</p>
      </div>

    </div>
  );
};