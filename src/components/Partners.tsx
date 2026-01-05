import React, { useState, useEffect } from 'react';
import { api, getStorageUrl } from '../api'; 
import { Building2, GraduationCap, ShieldCheck, CheckCircle, MessageCircle } from 'lucide-react';

export const Partners = () => {
  const [activeTab, setActiveTab] = useState('pemerintah');
  const [allMitra, setAllMitra] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sinkronisasi data mitra dari database
    api.get('/public/mitra')
      .then((res: any) => {
        setAllMitra(res.data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error("Gagal memuat data mitra:", err);
        setLoading(false);
      });
  }, []);

  // --- KONFIGURASI WHATSAPP DIRECT ---
  const handleDirectWhatsApp = () => {
    const phoneNumber = "6281356566546";
    const message = encodeURIComponent("Halo Admin DDP, saya tertarik untuk mengetahui lebih lanjut mengenai inisiasi kerjasama dan implementasi Data Desa Presisi.");
    const waLink = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Langsung buka WhatsApp di tab baru
    window.open(waLink, '_blank');
  };

  const filteredList = allMitra.filter(mitra => mitra.kategori === activeTab);

  const partnerTabs = [
    { id: 'pemerintah', label: 'Instansi Pemerintah', icon: Building2 },
    { id: 'akademisi', label: 'Perguruan Tinggi', icon: GraduationCap }
  ];

  return (
    <section id="partners" className="py-24 bg-white px-6 lg:px-24 relative selection:bg-[#E3242B] selection:text-white">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- 1. HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16 pb-10 border-b border-gray-100">
          <div className="space-y-3 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
               <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.3em]">Official Networking</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#111827] tracking-tighter uppercase">
              Jejaring <span className="text-[#E3242B]">Kerjasama.</span>
            </h2>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest max-w-md leading-relaxed">
              Bekerja bersama membangun kedaulatan data desa di seluruh Indonesia.
            </p>
          </div>
          
          <div className="flex p-1 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner overflow-x-auto no-scrollbar">
            {partnerTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 shrink-0 ${
                  activeTab === tab.id 
                  ? 'bg-white text-[#E3242B] shadow-md' 
                  : 'text-gray-400 hover:text-[#111827]'
                }`}
              >
                <tab.icon size={14} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- 2. LOGO GRID --- */}
        <div className="min-h-[300px]">
          {loading ? (
             <div className="flex flex-col justify-center items-center h-40 space-y-3">
                <div className="w-8 h-8 border-3 border-[#E3242B] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Memuat Daftar Mitra...</p>
             </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredList.map((mitra, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-50 p-6 rounded-[2rem] flex flex-col items-center justify-center h-40 group hover:border-[#E3242B]/30 hover:shadow-xl transition-all duration-500"
                >
                  <img 
                    src={getStorageUrl(mitra.gambar)} 
                    alt={mitra.nama_mitra}
                    className="max-h-16 max-w-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="mt-4 text-center">
                      <p className="text-[8px] font-black text-gray-300 group-hover:text-[#111827] uppercase leading-tight line-clamp-2 px-1 tracking-tighter">
                         {mitra.nama_mitra}
                      </p>
                  </div>
                </div>
              ))}

              <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center p-6 text-center group hover:bg-white transition-all duration-500">
                 <CheckCircle size={20} className="text-[#E3242B] mb-2 opacity-30 group-hover:opacity-100 transition-opacity" />
                 <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">
                    Data <br /> <span className="text-[#111827]">Terpercaya</span>
                 </p>
              </div>
            </div>
          )}
        </div>

        {/* --- 3. CALL TO ACTION (WHATSAPP DIRECT) --- */}
        <div className="mt-20 p-8 md:p-12 bg-[#111827] rounded-[3.5rem] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3242B] opacity-10 blur-[100px]"></div>

            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                    <ShieldCheck className="text-[#E3242B]" size={28} />
                </div>
                <div className="space-y-1">
                    <h4 className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter">
                        Wujudkan Satu Data Indonesia.
                    </h4>
                    <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                        Telah dipercaya oleh <span className="text-white">{allMitra.length}+ Instansi Pemerintah & Universitas</span>
                    </p>
                </div>
            </div>

            {/* TOMBOL DIRECT WHATSAPP */}
            <button 
                onClick={handleDirectWhatsApp}
                className="group relative z-10 px-8 py-5 bg-[#E3242B] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-white hover:text-[#111827] transition-all duration-500 shadow-2xl shadow-red-900/50 flex items-center gap-3 active:scale-95"
            >
                Mari Bekerja Sama <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
            </button>
        </div>

      </div>
    </section>
  );
};