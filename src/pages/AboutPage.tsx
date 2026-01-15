import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Zap, Layers, 
  MoveRight, ChevronRight, Calendar
} from 'lucide-react';

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
    <div className="bg-white min-h-screen selection:bg-[#E3242B] selection:text-white font-sans text-left overflow-x-hidden">
      
      {/* --- 1. HERO: THE TYPOGRAPHIC MONOLITH --- */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 bg-[#111827] overflow-hidden rounded-b-[3rem] md:rounded-b-[6rem]">
        {/* Dekorasi Cahaya */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#E3242B] opacity-[0.1] blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-[#E3242B]"></div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Inovasi DDP</span>
                </div>
                
                <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                   Jejak <br /> 
                   <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#E3242B] to-red-700">
                     Langkah
                   </span>
                </h1>

                <div className="max-w-md space-y-6">
                    <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed">
                      Kisah perjuangan panjang menghadirkan data yang memanusiakan warga desa. Dari riset akademik menjadi kedaulatan data nasional.
                    </p>
                    <div className="flex items-center gap-4 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-widest bg-[#E3242B] px-4 py-1.5 rounded-full">Est. 2014</span>
                        <div className="h-px w-12 bg-white/20"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 italic">IPB University</span>
                    </div>
                </div>
            </div>

            {/* Visual Frame */}
            <div className="hidden lg:block relative animate-in fade-in zoom-in-95 duration-1000 delay-300">
                <div className="w-72 h-[450px] bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-3xl p-3 transform rotate-3 relative overflow-hidden">
                    <img src="/img/gambarberita6.jpg" className="w-full h-full object-cover rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-1000" alt="Iconic" />
                </div>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-[#111827] border border-white/10 rounded-3xl shadow-2xl p-6 flex flex-col items-center text-center">
                    <Layers className="text-[#E3242B] mb-2" size={24} />
                    <span className="text-white font-bold text-[9px] uppercase tracking-widest">Metodologi <br /> Multi-Layer</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. THE STORYBOARD --- */}
      <section className="py-24 px-6 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 relative z-20">
                <div className="relative rounded-[3rem] overflow-hidden border-[10px] border-gray-50 shadow-2xl group">
                    <img src="/img/Gambar23.jpeg" className="w-full h-[500px] object-cover transition-all duration-700 group-hover:scale-105" alt="Story" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="absolute -bottom-8 -right-8 bg-[#E3242B] p-10 rounded-[2.5rem] shadow-2xl text-white hidden xl:block max-w-xs transform hover:-translate-y-2 transition-transform duration-500">
                    <ShieldCheck size={32} className="mb-4 opacity-50" />
                    <h4 className="text-xl font-black uppercase tracking-tighter leading-tight mb-3">Presisi Adalah <br /> Keharusan.</h4>
                    <p className="text-[10px] font-medium uppercase tracking-widest leading-relaxed opacity-90">Data tanpa akurasi hanyalah angka yang menyesatkan pembangunan.</p>
                </div>
            </div>

            <div className="lg:col-span-5 lg:-ml-16 relative z-10">
                <div className="bg-gray-50 p-10 md:p-14 rounded-[3rem] space-y-8 border border-gray-100">
                    <div className="space-y-3">
                        <span className="text-[10px] font-bold text-[#E3242B] uppercase tracking-widest">Tentang Kami</span>
                        <h2 className="text-3xl md:text-4xl font-black text-[#111827] uppercase tracking-tighter leading-tight">
                            Membangun <br /> Dari Bawah.
                        </h2>
                    </div>
                    <div className="space-y-6 text-gray-500 font-medium text-sm md:text-base leading-relaxed text-justify">
                        <p>Lab Data Desa Presisi (DDP) IPB lahir dari kegelisahan akan data desa yang seringkali tidak akurat dan bias.</p>
                        <p>Kami hadir menyatukan teknologi drone spasial dengan kejujuran pengumpulan data langsung di depan pintu rumah warga.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. TIMELINE: GARIS WAKTU --- */}
      <section className="py-24 bg-gray-50 rounded-[3rem] md:rounded-[5rem]">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-[3px] bg-[#E3242B] rounded-full"></div>
            <h2 className="text-3xl md:text-5xl font-black text-[#111827] uppercase tracking-tighter">Garis Waktu.</h2>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em]">Evolusi Inovasi Sejak 2014</p>
          </div>

          <div className="grid gap-5">
            {timelineData.map((item, index) => (
              <div 
                key={index} 
                className={`group cursor-pointer rounded-[2rem] border transition-all duration-500 
                  ${activeStep === index ? 'bg-[#111827] border-[#111827] shadow-xl scale-[1.02]' : 'bg-white border-gray-100'}
                `}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className="p-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                   <div className={`text-4xl font-black tracking-tighter transition-colors duration-500 ${activeStep === index ? 'text-[#E3242B]' : 'text-gray-200'}`}>
                      {item.year}
                   </div>
                   <div className="space-y-2 flex-1">
                      <h4 className={`text-lg font-bold uppercase tracking-tight ${activeStep === index ? 'text-white' : 'text-[#111827]'}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm leading-relaxed transition-all duration-500 ${activeStep === index ? 'text-gray-400 opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden font-medium'}`}>
                        {item.desc}
                      </p>
                   </div>
                   {activeStep === index && <MoveRight className="text-[#E3242B] hidden md:block" size={24} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. COMMITMENT: JANJI PENGABDIAN --- */}
      <section className="py-24 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative min-h-[600px] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl group">
             <img src="/img/Gambar36.jpeg" alt="Focus" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105" />
             <div className="absolute inset-0 bg-[#111827]/85 backdrop-blur-[1px]"></div>

             <div className="relative z-10 h-full flex flex-col lg:flex-row items-center p-10 md:p-20 gap-12">
                <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                   <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                      Janji <br /> <span className="text-[#E3242B]">Pengabdian.</span>
                   </h2>
                   <div className="h-1 w-20 bg-[#E3242B] mx-auto lg:mx-0"></div>
                   <p className="text-gray-400 font-medium text-sm md:text-base leading-relaxed max-w-sm mx-auto lg:mx-0">Mendedikasikan ilmu pengetahuan untuk kedaulatan data nasional.</p>
                </div>

                <div className="lg:w-1/2 grid gap-4 w-full">
                   {[
                     { t: 'Keadilan Sosial', d: 'Membangun keadilan melalui akurasi data yang tidak memihak.' },
                     { t: 'Kedaulatan Warga', d: 'Menempatkan masyarakat desa sebagai pemegang otoritas data.' },
                     { t: 'Keberlanjutan', d: 'Dijalankan dengan metode yang dapat terus diperbarui mandiri.' },
                   ].map((item, i) => (
                      <div key={i} className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl group hover:bg-white transition-all duration-500">
                         <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1 group-hover:text-[#E3242B]">{item.t}</h4>
                         <p className="text-gray-400 text-xs font-medium group-hover:text-gray-600">{item.d}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- 5. FOOTER LOGO --- */}
      <footer className="py-20 flex flex-col items-center gap-8 bg-white border-t border-gray-50">
           <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center justify-center">
                  <img src="/img/LogoFema.png" alt="FEMA" className="max-w-full h-auto" />
              </div>
              <div className="text-center">
                 <p className="text-[10px] font-bold text-[#111827] uppercase tracking-[0.8em] ml-[0.8em]">IPB University</p>
                 <p className="text-[8px] font-medium text-gray-400 uppercase tracking-widest mt-1">Official Lab Data Desa Presisi</p>
              </div>
           </div>
      </footer>

    </div>
  );
};
