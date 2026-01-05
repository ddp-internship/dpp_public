import React, { useState } from 'react';
import { MessageCircle, X, Mail, MapPin, Send } from 'lucide-react';

export const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contact = {
    wa: "https://wa.me/6281356566546?text=Halo%20Admin%20DDP%2C%20saya%20ingin%20berkonsultasi.",
    email: "abdullahhayad@gmail.com",
    maps: "https://maps.app.goo.gl/TveY62LFYEcxUGLG8"
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4">
      {/* --- MENU OPTIONS (Hanya muncul jika saklar aktif) --- */}
      {isOpen && (
        <div className="flex flex-col gap-3 mb-2 animate-in slide-in-from-bottom-5 duration-300">
          {/* Email */}
          <a href={`mailto:${contact.email}`} className="flex items-center gap-4 group">
            <span className="bg-white px-4 py-2 rounded-xl shadow-xl text-[10px] font-black text-[#111827] uppercase tracking-widest border border-gray-100 opacity-0 group-hover:opacity-100 transition-all">E-mail</span>
            <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-4 border-white">
              <Mail size={20} />
            </div>
          </a>
          {/* Maps */}
          <a href={contact.maps} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
            <span className="bg-white px-4 py-2 rounded-xl shadow-xl text-[10px] font-black text-[#111827] uppercase tracking-widest border border-gray-100 opacity-0 group-hover:opacity-100 transition-all">Lokasi</span>
            <div className="w-12 h-12 bg-[#E3242B] text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-4 border-white">
              <MapPin size={20} />
            </div>
          </a>
          {/* WhatsApp */}
          <a href={contact.wa} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
            <span className="bg-white px-4 py-2 rounded-xl shadow-xl text-[10px] font-black text-[#111827] uppercase tracking-widest border border-gray-100 opacity-0 group-hover:opacity-100 transition-all">WhatsApp</span>
            <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all border-4 border-white">
              <MessageCircle size={20} />
            </div>
          </a>
        </div>
      )}

      {/* --- MAIN FLOATING BUTTON (THE TRIGGER) --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(227,36,43,0.3)] transition-all duration-500 transform active:scale-90 border-4 border-white ${isOpen ? 'bg-[#111827] rotate-90' : 'bg-[#E3242B]'}`}
      >
        {isOpen ? <X className="text-white" size={28} /> : <MessageCircle className="text-white animate-pulse" size={32} />}
      </button>

      {/* Badge Info Kecil */}
      {!isOpen && (
        <div className="absolute -top-2 -left-2 bg-[#111827] text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter shadow-lg border border-white/10">
            Help Center
        </div>
      )}
    </div>
  );
};