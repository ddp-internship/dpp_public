import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, ShieldCheck, Zap, History, 
  Target, Award, Rocket, CheckCircle2,
  Milestone, ArrowDown, MoveRight, Layers
} from 'lucide-react';
import { api, getStorageUrl } from '../api';

const timelineData = [
  { year: '2014', title: 'Periode Inisiasi', desc: 'Gagasan DDP lahir dari riset perdesaan IPB oleh Prof. Dr. Sofyan Sjaf. Muncul Sekolah Drone Desa (SDD) sebagai gerakan awal mendobrak pola pendataan konvensional.' },
  { year: '2015', title: 'Periode Eksperimen', desc: 'Eksperimen pemetaan desa menggunakan drone dilakukan intensif, melahirkan metode Drone Participatory Mapping (DPM) yang melibatkan warga secara aktif.' },
  { year: '2019', title: 'Transformasi Ilmiah', desc: 'Momentum besar dengan terbitnya buku Involusi Republik Merdesa dan peluncuran Aplikasi Merdesa untuk publikasi hasil sensus digital.' },
  { year: '2020', title: 'Periode Konsolidasi', desc: 'Metode DDP dirumuskan secara formal dan mendapat pengakuan Hak Kekayaan Intelektual (HKI) Nasional sebagai inovasi asli IPB.' },
  { year: '2021', title: 'Implementasi Luas', desc: 'Peluncuran WebGIS Merdesa AI. DDP kini diterapkan di ratusan desa seluruh Indonesia demi mewujudkan Satu Data Indonesia dari tingkat tapak.' },
];

export const AboutPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-[#FDFDFD] min-h-screen selection:bg-[#E3242B] selection:text-white font-sans text-left overflow-x-hidden">
      
      {/* --- 1. HERO: THE TYPOGRAPHIC MONOLITH (INOVASI BARU) --- */}
      <section className="relative pt-44 pb-32 md:pt-64 md:pb-52 bg-[#111827] overflow-hidden rounded-b-[4rem] md:rounded-b-[8rem]">
        {/* Bukan Grid, tapi Cahaya Vertikal & Aura (Innovation) */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#E3242B]/20 to-transparent"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#E3242B] opacity-[0.07] blur-[160px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            
            <div className="flex-1 space-y-12 animate-in fade-in slide-in-from-left-10 duration-1000">
                <div className="inline-flex items-center gap-4">
                    <div className="w-10 h-1 bg-[#E3242B]"></div>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">The Masterpiece of DDP</span>
                </div>
                
                <h1 className="text-5xl md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-4 relative">
                   Jejak <br /> 
                   <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E3242B] to-red-800">
                     Langkah.
                   </span>
                </h1>

                <div className="max-w-md space-y-6">
                    <p className="text-gray-400 font-bold uppercase text-[10px] md:text-xs tracking-[0.3em] leading-loose">
                        Kisah perjuangan panjang menghadirkan data yang memanusiakan warga desa. Dari riset akademik menjadi kedaulatan data nasional.
                    </p>
                    <div className="flex items-center gap-4 text-white">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-[#E3242B] px-4 py-1.5 rounded-full">Est. 2014</span>
                        <div className="h-px w-12 bg-white/20"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">IPB University</span>
                    </div>
                </div>
            </div>

            {/* Inovasi: Floating Geometry Visual */}
            <div className="hidden lg:block relative animate-in fade-in zoom-in-95 duration-1000 delay-300">
                <div className="w-80 h-[500px] bg-white/5 border border-white/10 rounded-[4rem] backdrop-blur-3xl p-4 transform rotate-6 translate-x-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E3242B]/20 to-transparent"></div>
                    <img src="/img/gambarberita6.jpg" className="w-full h-full object-cover rounded-[3.5rem] grayscale hover:grayscale-0 transition-all duration-1000" alt="Iconic" />
                </div>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-[#111827] border border-white/5 rounded-[2.5rem] shadow-2xl p-8 flex flex-col justify-center items-center text-center">
                    <Layers className="text-[#E3242B] mb-2" size={32} />
                    <p className="text-white font-black text-[9px] uppercase tracking-widest">Multi-Layer <br /> Methodology</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THE STORYBOARD: OVERLAPPING GRID (INOVASI TATA LETAK) --- */}
      <section className="py-32 px-6 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Visual yang Menumpuk ke Luar (Overlapping) */}
            <div className="lg:col-span-7 relative z-20">
                <div className="relative rounded-[4rem] overflow-hidden border-[12px] border-white shadow-[0_50px_100px_rgba(0,0,0,0.1)]">
                    <img src="/img/Gambar23.jpeg" className="w-full h-[550px] object-cover" alt="Detail" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60"></div>
                </div>
                {/* Floating Info Box */}
                <div className="absolute -bottom-10 -right-10 bg-[#E3242B] p-12 rounded-[3.5rem] shadow-2xl text-white hidden xl:block max-w-sm transform hover:-translate-y-2 transition-transform duration-500">
                    <ShieldCheck size={40} className="mb-6 opacity-50" />
                    <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-4">Presisi Adalah <br /> Keharusan.</h4>
                    <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed opacity-80">Data tanpa akurasi hanyalah angka yang menyesatkan pembangunan.</p>
                </div>
            </div>

            {/* Konten dengan Latar Belakang Kotak (Asymmetric) */}
            <div className="lg:col-span-5 lg:-ml-20 lg:pt-20 relative z-10">
                <div className="bg-gray-50 p-12 md:p-16 rounded-[4rem] space-y-10 border border-gray-100">
                    <div className="space-y-4">
                        <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-[0.4em]">Tentang Kami</span>
                        <h2 className="text-3xl md:text-5xl font-black text-[#111827] uppercase tracking-tighter leading-tight">
                            Membangun <br /> Dari Bawah.
                        </h2>
                    </div>
                    <div className="space-y-6 text-gray-500 font-bold text-xs md:text-sm uppercase tracking-widest leading-[2] text-justify">
                        <p>Lab Data Desa Presisi (DDP) IPB lahir dari kegelisahan akan data desa yang seringkali tidak akurat dan bias.</p>
                        <p>Kami hadir menyatukan teknologi tinggi drone spasial dengan kejujuran pengumpulan data langsung di depan pintu rumah warga.</p>
                        <p>Hasilnya? Sebuah potret nyata desa yang tak terbantahkan, siap menjadi pondasi Indonesia masa depan.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. TIMELINE: THE SHIFT-CARD ACCORDION (INOVASI) --- */}
      <section className="py-32 bg-[#F9FAFB] rounded-[5rem] md:rounded-[8rem]">
        <div className="max-w-4xl mx-auto px-6 space-y-20">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-1 bg-[#E3242B] rounded-full"></div>
            <h2 className="text-4xl md:text-6xl font-black text-[#111827] uppercase tracking-tighter">Garis Waktu.</h2>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.5em]">Evolusi Inovasi Sejak 2014</p>
          </div>

          <div className="grid gap-6">
            {timelineData.map((item, index) => (
              <div 
                key={index} 
                className={`group cursor-pointer rounded-[2.5rem] border transition-all duration-700 overflow-hidden
                  ${activeStep === index ? 'bg-[#111827] border-[#111827] shadow-2xl scale-105' : 'bg-white border-gray-100 shadow-sm'}
                `}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
                   <div className={`text-4xl md:text-5xl font-black tracking-tighter transition-colors duration-500 ${activeStep === index ? 'text-[#E3242B]' : 'text-gray-200'}`}>
                      {item.year}
                   </div>
                   <div className="space-y-3 flex-1">
                      <h4 className={`text-lg md:text-xl font-black uppercase tracking-widest ${activeStep === index ? 'text-white' : 'text-[#111827]'}`}>
                        {item.title}
                      </h4>
                      <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest leading-relaxed transition-opacity duration-500 ${activeStep === index ? 'text-gray-400 opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                        {item.desc}
                      </p>
                   </div>
                   {activeStep === index && <MoveRight className="text-[#E3242B] animate-pulse hidden md:block" size={32} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. COMMITMENT: THE DEEP FOCUS (INOVASI VISUAL) --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[800px] md:h-[650px] rounded-[5rem] overflow-hidden shadow-2xl group">
             {/* Background Image Full */}
             <img src="/img/Gambar36.jpeg" alt="Focus" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" />
             <div className="absolute inset-0 bg-[#111827]/80 backdrop-blur-[2px]"></div>

             <div className="relative z-10 h-full flex flex-col lg:flex-row items-center p-12 md:p-24 gap-16 md:gap-24">
                <div className="lg:w-1/2 space-y-10 text-center lg:text-left">
                   <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                      Janji <br /> <span className="text-[#E3242B]">Pengabdian.</span>
                   </h2>
                   <div className="h-1.5 w-24 bg-[#E3242B] mx-auto lg:mx-0 rounded-full"></div>
                </div>

                <div className="lg:w-1/2 grid gap-6">
                   {[
                     { t: 'Keadilan Sosial', d: 'Membangun keadilan melalui akurasi data yang tidak memihak kepentingan politik manapun.' },
                     { t: 'Kedaulatan Warga', d: 'Menempatkan masyarakat desa sebagai pemegang otoritas data mereka sendiri.' },
                     { t: 'Keberlanjutan', d: 'Dijalankan dengan metode yang dapat terus diperbarui oleh perangkat desa secara mandiri.' },
                   ].map((item, i) => (
                      <div key={i} className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] group hover:bg-[#E3242B] transition-all duration-500">
                         <h4 className="text-white font-black text-sm uppercase tracking-widest mb-2 group-hover:text-white">{item.t}</h4>
                         <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed group-hover:text-white/80">{item.d}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* FOOTER LOGO FEMA (SESUAI PERMINTAAN) */}
      <div className="py-24 flex flex-col items-center gap-10 bg-white">
           <div className="w-24 h-24 bg-white rounded-3xl p-4 shadow-xl border border-gray-100 flex items-center justify-center">
                <img src="/img/LogoFema.png" alt="FEMA" className="max-w-full h-auto" />
           </div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[1em] text-center ml-[1em]">IPB University</p>
      </div>

    </div>
  );
};