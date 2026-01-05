import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-[#FDFDFD] px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Info Kiri */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-navy tracking-tighter">Hubungi <span className="text-crimson">Kami.</span></h2>
              <p className="text-gray-500 font-medium leading-relaxed">Untuk pertanyaan atau informasi lebih lanjut, silakan hubungi kami melalui saluran resmi berikut.</p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <MapPin />, title: 'Alamat', val: 'Jl. Bungur No.3, Dramaga, Bogor' },
                { icon: <Phone />, title: 'WhatsApp', val: '+62 813-5656-6546' },
                { icon: <Mail />, title: 'Email', val: 'datadesapresisi@gmail.com' }
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 bg-navy text-white rounded-2xl flex items-center justify-center shadow-lg">{c.icon}</div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-widest text-gray-400">{c.title}</h4>
                    <p className="font-bold text-navy">{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Kanan */}
          <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-50">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nama Lengkap" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-100 transition-all outline-none text-sm" />
                <input type="email" placeholder="Email Anda" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-100 transition-all outline-none text-sm" />
              </div>
              <input type="text" placeholder="Subjek Pesan" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-red-100 transition-all outline-none text-sm" />
              <textarea placeholder="Isi pesan..." className="w-full p-4 bg-gray-50 border-none rounded-2xl h-40 focus:ring-2 focus:ring-red-100 transition-all outline-none text-sm resize-none"></textarea>
              <button className="w-full py-4 bg-navy text-white font-black rounded-2xl shadow-xl hover:bg-crimson transition-all flex items-center justify-center gap-3 group uppercase tracking-widest text-xs">
                Kirim Pesan <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};