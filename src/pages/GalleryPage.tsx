import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Camera, Maximize2, ChevronLeft, 
  ChevronRight, Calendar, Info, Clock, 
  Download, ShieldCheck, ArrowDown, Hash
} from 'lucide-react';
import { api, getStorageUrl } from '../api';

export const GalleryPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/public/galeri/all?page=${page}`);
        setItems(res.data.data || []);
        setLastPage(res.data.last_page || 1);
      } catch (error) { console.error("Gagal sinkronisasi"); }
      finally { setLoading(false); }
    };
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  useEffect(() => {
    document.body.style.overflow = selectedImg ? 'hidden' : 'auto';
  }, [selectedImg]);

  return (
    <div className="bg-[#FDFDFD] min-h-screen selection:bg-[#E3242B] selection:text-white font-sans text-left">
      
      {/* --- 1. THE INNOVATIVE "SOVEREIGN" HERO HEADER --- */}
      <section className="relative pt-64 pb-52 bg-[#111827] overflow-hidden rounded-b-[6rem]">
        
        {/* Dekorasi Background Mewah */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("/img/pattern.png")', backgroundSize: '120px' }}></div>
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-br from-[#E3242B]/20 to-transparent blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
        
        {/* Elemen Garis Geometris Khas Instansi */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-[#E3242B]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-12">
              {/* Badge Dinamis */}
              <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-10 duration-1000">
                <div className="px-5 py-2 bg-[#E3242B] text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-tr-2xl rounded-bl-2xl shadow-lg shadow-red-900/40">
                  Galeri Dokumentasi
                </div>
                <div className="h-px w-20 bg-white/20"></div>
              </div>
              
              {/* JUDUL INOVATIF: Perpaduan Solid & Outline */}
              <div className="relative space-y-2 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
                  {/* Judul Lapis 1 (Besar & Transparan/Outline) */}
                  <h2 className="absolute -top-16 left-0 text-white/[0.03] text-[10rem] font-black uppercase tracking-tighter pointer-events-none select-none hidden lg:block">
                    PRESISI
                  </h2>
                  
                  {/* Judul Lapis 2 (Utama) */}
                  <h1 className="text-7xl md:text-[110px] font-black text-white uppercase tracking-tighter leading-[0.8] relative z-10">
                    Arsip <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3242B] to-[#ff4d4d]">
                        Visual
                    </span>
                  </h1>
              </div>

              {/* Deskripsi dengan Border Kiri */}
              <p className="text-gray-400 font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] leading-loose max-w-xl border-l-4 border-[#E3242B] pl-8 animate-in fade-in duration-1000 delay-500">
                 Mendokumentasikan fakta lapangan dan transformasi digital melalui lensa presisi untuk kedaulatan data nasional.
              </p>
            </div>

            {/* Sisi Kanan: Statistik Ringkas (Inovatif) */}
            <div className="lg:col-span-4 hidden lg:flex flex-col gap-6 animate-in fade-in slide-in-from-right-10 duration-1000 delay-700">
                <div className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between text-white">
                        <Hash size={24} className="text-[#E3242B]" />
                        <span className="text-4xl font-black italic tracking-tighter">100+</span>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">
                        Dokumentasi <br /> Foto Terverifikasi
                    </p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THE GALLERY COLLECTION --- */}
      <section className="py-32 px-6 bg-white relative -mt-16 z-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="py-40 text-center space-y-4">
               <div className="w-12 h-12 border-4 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto"></div>
               <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">Synchronizing Archive...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12 animate-in fade-in duration-1000">
                {items.map((img) => (
                  <div key={img.id} className="group cursor-pointer space-y-6" onClick={() => setSelectedImg(img)}>
                    <div className="relative aspect-[4/5.5] rounded-[2.5rem] overflow-hidden bg-gray-100 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 group-hover:-translate-y-3">
                      <img src={img.gambar_url} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt={img.nama_kegiatan} />
                      <div className="absolute inset-0 bg-[#111827]/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center">
                         <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#111827] shadow-2xl scale-75 group-hover:scale-100 transition-all duration-500">
                            <Maximize2 size={20} />
                         </div>
                      </div>
                    </div>
                    <div className="px-2 space-y-2">
                       <div className="flex items-center gap-3">
                          <span className="text-[8px] font-black text-[#E3242B] uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded">Verified</span>
                          <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{img.tanggal}</span>
                       </div>
                       <h4 className="font-black text-sm text-[#111827] uppercase tracking-tighter leading-tight group-hover:text-[#E3242B] transition-colors line-clamp-2">{img.nama_kegiatan}</h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATION */}
              {lastPage > 1 && (
                <div className="mt-40 flex justify-center items-center gap-6">
                  <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="w-14 h-14 rounded-3xl border border-gray-100 flex items-center justify-center text-[#111827] hover:bg-[#111827] hover:text-white disabled:opacity-20 transition-all bg-white shadow-sm"><ChevronLeft size={24} /></button>
                  <div className="flex items-center gap-4 font-black text-[10px] text-[#111827]">
                      <span className="bg-[#111827] text-white w-10 h-10 flex items-center justify-center rounded-xl">{page}</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-gray-400">{lastPage}</span>
                  </div>
                  <button disabled={page === lastPage} onClick={() => setPage(p => p + 1)} className="w-14 h-14 rounded-3xl border border-gray-100 flex items-center justify-center text-[#111827] hover:bg-[#111827] hover:text-white disabled:opacity-20 transition-all bg-white shadow-sm"><ChevronRight size={24} /></button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* --- 3. IMMERSIVE LIGHTBOX (FINAL FIXED SCROLL) --- */}
      {selectedImg && createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-[#0a0f1a]/98 backdrop-blur-3xl animate-fade-in duration-700" onClick={() => setSelectedImg(null)}></div>
          
          {/* Kontainer Utama Modal: Menggunakan h-[85vh] agar selalu ada sisa ruang di layar */}
          <div className="relative bg-white w-full max-w-7xl h-[85vh] rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.5)] flex flex-col md:flex-row animate-in zoom-in-95 duration-500 border border-white/10">
            
            {/* SISI KIRI: GAMBAR (STATIS) */}
            <div className="h-[40%] md:h-full md:flex-1 bg-[#111827] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-gray-100 relative">
                <img src={selectedImg.gambar_url} className="w-full h-full object-cover" alt="Full" />
                <div className="absolute top-8 left-8">
                    <div className="px-5 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Camera size={14} className="text-[#E3242B]" /> Verified Photo
                    </div>
                </div>
            </div>

            {/* SISI KANAN: PANEL INFO (SCROLLABLE AREA) */}
            <div className="h-[60%] md:h-full md:w-[450px] bg-white flex flex-col overflow-hidden">
                {/* Header Panel (Tetap) */}
                <div className="p-10 pb-6 flex justify-between items-center border-b border-gray-50 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#E3242B] animate-ping"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Metadata</span>
                    </div>
                    <button onClick={() => setSelectedImg(null)} className="p-3 text-gray-300 hover:text-[#E3242B] hover:bg-red-50 rounded-full transition-all"><X size={32}/></button>
                </div>

                {/* Konten (SCROLLABLE AREA - MENGGUNAKAN FLEX-1) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-10 md:p-12 space-y-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-[#E3242B]">
                            <Clock size={14} />
                            <span className="text-[11px] font-black uppercase tracking-[0.3em]">{selectedImg.tanggal}</span>
                        </div>
                        <h2 className="text-4xl font-black text-[#111827] uppercase tracking-tighter leading-[0.9]">
                            {selectedImg.nama_kegiatan}
                        </h2>
                        <div className="h-1.5 w-16 bg-[#E3242B] rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-600 font-bold text-xs md:text-sm leading-[2.4] uppercase tracking-[0.15em] text-justify">
                            {selectedImg.deskripsi}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100 space-y-6 shadow-inner">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-[11px] font-black text-emerald-800 uppercase tracking-widest">Verified DDP System</span>
                        </div>
                        <p className="text-[9px] font-bold text-gray-400 leading-relaxed uppercase">
                            Data dokumentasi ini telah melalui proses verifikasi laboratorium Data Desa Presisi IPB University.
                        </p>
                    </div>
                </div>

                {/* Footer Panel (Tetap) */}
                <div className="p-10 border-t border-gray-50 shrink-0 bg-gray-50/50">
                    <button 
                        onClick={() => window.open(getStorageUrl(selectedImg.gambar), '_blank')}
                        className="w-full py-6 bg-[#111827] text-white font-black rounded-[2rem] flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-[#E3242B] transition-all transform active:scale-95 group"
                    >
                        Lihat Resolusi Penuh <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* FOOTER BRANDING */}
      <div className="py-24 flex flex-col items-center gap-6 bg-white border-t border-gray-50">
           <div className="h-px w-32 bg-gray-100"></div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[1em] text-center">Laboratory Data Desa Presisi IPB</p>
      </div>
    </div>
  );
};