import { 
  Instagram, 
  Youtube, 
  MessageCircle, 
  MapPin, 
  Mail, 
  ChevronRight, 
  Facebook,
  Send
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] pt-24 pb-12 text-white relative overflow-hidden">
      {/* Dekorasi Background agar tidak mati */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E3242B]/5 blur-[120px] -mr-20 -mt-20 rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 border-b border-white/5 pb-20">
          
          {/* --- KOLOM 1: BRAND & LOGO PARTNER --- */}
          <div className="space-y-8">
            <div className="bg-white p-4 rounded-2xl w-fit shadow-xl">
              <img src="/img/logo-ddp.png" className="h-10 object-contain" alt="Logo DDP" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              Inovasi IPB University untuk menyajikan data desa yang presisi, akurat, dan aktual sebagai landasan pembangunan berbasis kebutuhan riil masyarakat.
            </p>
            
            {/* AREA LOGO PARTNER: Diberi background putih agar logo hitam terlihat jelas */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-inner border border-white/10">
               <img src="/img/LogoFema.png" className="h-8 object-contain" alt="Logo Fema" />
            </div>
          </div>

          {/* --- KOLOM 2: MOBILE APPS (LENGKAP) --- */}
          <div>
            <h4 className="text-[#E3242B] font-black text-xs uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-[#E3242B] rounded-full"></span> Aplikasi Kami
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li>
                <a href="https://webgis.desapresisi.id/account/login" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-all group">
                  <ChevronRight size={14} className="text-[#E3242B] group-hover:translate-x-1 transition-transform" /> WebGIS DDP
                </a>
              </li>
              <li>
                <a href="https://play.google.com/store/apps/details?id=id.desapresisi.merdesasensus&hl=en" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-all group">
                  <ChevronRight size={14} className="text-[#E3242B] group-hover:translate-x-1 transition-transform" /> Merdesa Sensus
                </a>
              </li>
              <li>
                <a href="https://play.google.com/store/search?q=merdesa%20maps&c=apps&hl=en" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-all group">
                  <ChevronRight size={14} className="text-[#E3242B] group-hover:translate-x-1 transition-transform" /> Merdesa Maps
                </a>
              </li>
              <li>
                <a href="https://monev.desapresisi.id/signin" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-all group">
                  <ChevronRight size={14} className="text-[#E3242B] group-hover:translate-x-1 transition-transform" /> Monev DDP
                </a>
              </li>
            </ul>
          </div>

          {/* --- KOLOM 3: PRODUCT (LENGKAP) --- */}
          <div>
            <h4 className="text-[#E3242B] font-black text-xs uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-[#E3242B] rounded-full"></span> Informasi
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-all group">
                <ChevronRight size={14} className="text-[#E3242B] group-hover:translate-x-1 transition-transform" /> Berita Terbaru
              </li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-all group">
                <ChevronRight size={14} className="text-[#E3242B] group-hover:translate-x-1 transition-transform" /> Monografi Desa
              </li>
              <li className="flex items-center gap-2 hover:text-white cursor-pointer transition-all group">
                <ChevronRight size={14} className="text-[#E3242B] group-hover:translate-x-1 transition-transform" /> Infografis DDP
              </li>
            </ul>
          </div>

          {/* --- KOLOM 4: FOLLOW US & CONTACT --- */}
          <div>
            <h4 className="text-[#E3242B] font-black text-xs uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-[#E3242B] rounded-full"></span> Hubungi Kami
            </h4>
            <div className="flex gap-4 mb-10">
              <a href="https://www.instagram.com/desapresisi.ipb" target="_blank" rel="noreferrer" className="w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-[#E4405F] hover:text-white transition-all shadow-xl group">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.youtube.com/@desapresisiipbofficial9102" target="_blank" rel="noreferrer" className="w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-[#FF0000] hover:text-white transition-all shadow-xl group">
                <Youtube size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://wa.me/6281356566546?text=Halo%20Admin%20DDP%2C%20saya%20ingin%20berkonsultasi." target="_blank" rel="noreferrer" className="w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-[#25D366] hover:text-white transition-all shadow-xl group">
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
            
            <div className="space-y-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
               <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                  <MapPin size={16} className="text-[#E3242B]" /> 
                  <span>Bogor, Jawa Barat, Indonesia</span>
               </div>
               <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                  <Mail size={16} className="text-[#E3242B]" /> 
                  <span>datadesapresisi@gmail.com</span>
               </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
          <div className="flex items-center gap-2">
            <p>© {currentYear} DATA DESA PRESISI.</p>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-[#E3242B] tracking-[0.2em]">Solusi Satu Data Indonesia!</span>
          </div>
        </div>
      </div>
    </footer>
  );
};