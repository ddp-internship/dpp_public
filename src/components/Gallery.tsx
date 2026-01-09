import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { 
  Camera, X, Maximize2, FileCheck, Calendar, 
  FileText, ArrowUpRight, Zap, ShieldCheck, Clock 
} from 'lucide-react';
import { api, getStorageUrl } from '../api';

export const Gallery = () => {
  // --- STATE MANAGEMENT ---
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImgObj, setSelectedImgObj] = useState<any | null>(null);

  // --- FETCH DATA (11 FOTO TERBARU) ---
  useEffect(() => {
    api.get('/public/galeri')
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Lock scroll saat modal aktif
  useEffect(() => {
    document.body.style.overflow = selectedImgObj ? 'hidden' : 'auto';
  }, [selectedImgObj]);

  if (loading) return (
    <div className="py-40 text-center space-y-3">
      <div className="w-8 h-8 border-3 border-[#E3242B] border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Sinkronisasi Galeri...</p>
    </div>
  );

  if (items.length === 0) return null;

  return (
    <section id="gallery" className="py-24 bg-white px-6 lg:px-24 relative overflow-hidden selection:bg-[#E3242B] selection:text-white">
      
      {/* --- INOVASI: WATERMARK BACKGROUND (SERAGAM DENGAN NEWS) --- */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-gray-50 text-[12rem] font-black uppercase tracking-tighter pointer-events-none select-none opacity-40">
        Archive
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. HEADER (PENYERAGAMAN TOTAL DENGAN MODUL LAIN) --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
               <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.3em]">Arsip Lapangan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter uppercase leading-none">
              Jejak <span className="text-[#E3242B]">Bakti</span>
            </h2>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest max-w-md leading-relaxed">
              Arsip visual transformasi digital dan pengabdian data desa presisi di lapangan.
            </p>
          </div>
          
          <Link 
            to="/gallery" 
            className="group flex items-center gap-3 px-8 py-4 bg-[#111827] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#E3242B] transition-all duration-500 shadow-xl shadow-navy/20 active:scale-95"
          >
            Lihat Galeri Lengkap <Maximize2 size={14} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        {/* --- 2. BENTO GRID (KONSISTEN) --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[220px] md:auto-rows-[280px] animate-in fade-in duration-1000 delay-300">
          {items.map((img, index) => (
            <div 
              key={img.id}
              onClick={() => setSelectedImgObj(img)}
              className={`group relative overflow-hidden rounded-[3rem] border-4 border-white shadow-xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-700 cursor-pointer
                ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''} 
                ${index === 1 ? 'md:col-span-2' : ''}
                ${index === 5 ? 'md:row-span-2' : ''}
              `}
            >
              <img 
                src={img.gambar_url} 
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                alt={img.nama_kegiatan}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end text-left">
                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 space-y-2">
                    <div className="flex items-center gap-2 text-[#E3242B]">
                        <Zap size={10} className="fill-[#E3242B]" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/70">Terverifikasi</span>
                    </div>
                    <h4 className="text-white font-black uppercase text-sm leading-tight tracking-tighter line-clamp-1">{img.nama_kegiatan}</h4>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 3. THE IMMERSIVE LIGHTBOX (DESKTOP: SOVEREIGN | MOBILE: NEWS STYLE) --- */}
      {selectedImgObj && createPortal(
        <div className="fixed inset-0 z-[100000] flex items-center justify-center md:p-12">
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#0a0f1a]/98 backdrop-blur-3xl animate-fade-in duration-500" onClick={() => setSelectedImgObj(null)}></div>
          
          {/* Modal Container */}
          <div className="relative bg-white w-full h-full md:max-w-7xl md:h-[85vh] md:rounded-[4rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10 animate-in zoom-in-95 duration-500">
            
            {/* Header Mobile (Tempo/News Style): Bar Atas Statis */}
            <div className="md:hidden flex items-center justify-between px-6 py-5 bg-white border-b sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#E3242B] animate-pulse"></div>
                    <span className="text-[10px] font-black text-[#111827] uppercase tracking-[0.2em]">Verified Doc</span>
                </div>
                <button onClick={() => setSelectedImgObj(null)} className="p-2 bg-gray-100 rounded-full text-[#111827]"><X size={20}/></button>
            </div>

            {/* SISI KIRI: IMAGE SIDEBAR (Desktop Only - Sovereign Style) */}
            <div className="hidden md:flex md:w-[35%] bg-[#111827] flex-col p-16 justify-between relative shrink-0 border-r border-white/5 overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#E3242B] opacity-5 blur-[100px]"></div>
                <div className="z-10 space-y-12">
                    <button onClick={() => setSelectedImgObj(null)} className="flex items-center gap-4 text-gray-500 hover:text-white transition-all font-black text-[11px] uppercase tracking-[0.3em] group">
                       <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-[#E3242B] transition-all"><X size={24}/></div> Tutup Arsip
                    </button>
                    <div className="aspect-[4/5] w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-gray-900">
                        <img src={selectedImgObj.gambar_url} className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-[1500ms]" alt="Visual" />
                    </div>
                </div>
                <div className="z-10 opacity-20"><p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.8em]">Lab DDP IPB</p></div>
            </div>

            {/* SISI KANAN: CONTENT AREA (FOKUS BACA - MOBILE FRIENDLY) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white flex flex-col h-full text-left">
                
                {/* Visual Cover di Paling Atas (Mobile Only - Kompas Style) */}
                <div className="w-full aspect-video md:hidden shrink-0">
                    <img src={selectedImgObj.gambar_url} className="w-full h-full object-cover" alt="Hero" />
                </div>

                {/* Body Konten */}
                <div className="px-6 md:px-24 py-10 md:py-20 space-y-10">
                    {/* Metadata Artikel */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-[#E3242B]">
                            <Clock size={14} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">{selectedImgObj.tanggal}</span>
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl font-black text-[#111827] uppercase tracking-tighter leading-[1.05]">
                            {selectedImgObj.nama_kegiatan}
                        </h2>
                        <div className="h-1.5 w-20 bg-[#E3242B] rounded-full"></div>
                    </div>

                    {/* TEKS DESKRIPSI: PRIORITAS UTAMA (MEDIA STYLE) */}
                    <div className="text-gray-600 font-bold text-sm md:text-base leading-[2.2] md:leading-[2.4] uppercase tracking-[0.15em] text-justify whitespace-pre-line">
                        {selectedImgObj.deskripsi}
                    </div>

                    {/* Footer Verifikasi */}
                    <div className="pt-16 border-t border-gray-100 space-y-6">
                        <div className="flex items-center gap-4">
                            <ShieldCheck size={28} className="text-emerald-500" />
                            <div className="space-y-1">
                                <span className="text-[11px] font-black text-[#111827] uppercase tracking-widest block">Official Lab DDP IPB Verified</span>
                                <p className="text-[9px] font-bold text-gray-400 uppercase leading-relaxed max-w-md">Dokumentasi ini telah melalui proses verifikasi dan tercatat dalam sistem repositori resmi IPB University.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Modal Statis */}
                <div className="px-6 md:px-24 py-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between mt-auto shrink-0">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Visual Archive Repository Center</p>
                </div>
            </div>

          </div>
        </div>,
        document.body
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E3242B; border-radius: 10px; }
      `}</style>
    </section>
  );
};