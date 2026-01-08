import React, { useEffect, useState } from 'react';
import { Quote, Star, UserCheck, Calendar, Send, MapPin, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // Pastikan pakai Link untuk navigasi
import { api, getStorageUrl } from '../api';

export const Testimonials = () => {
  // --- STATE ---
  const [items, setItems] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nama_lengkap: '', email: '', subjek: '', pesan: '' });
  const [sending, setSending] = useState(false);

  // --- INFO KONTAK ---
  const contact = {
    wa: "+62 813-5656-6546",
    waLink: "https://wa.me/6281356566546?text=Halo%20Admin%20DDP%2C%20saya%20tertarik%20dengan%20Data%20Desa%20Presisi.",
    email: "datadesapresisi@gmail.com",
    address: "FP2J+RHH, Jl. Carang Pulang, Cikarawang, Kec. Dramaga, Kabupaten Bogor, Jawa Barat 16680",
    mapsLink: "https://maps.app.goo.gl/4LyurNM1D1YfPbMp7"
  };

  useEffect(() => {
    // 1. Ambil 3 testimoni pilihan
    api.get('/public/testimoni/featured').then(res => setItems(res.data));
    
    // 2. Ambil total jumlah testimoni di backend
    api.get('/public/testimoni/count').then(res => setTotalCount(res.data.total));
    
    setLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post('/public/contact', formData);
      alert("Terima kasih! Pesan Anda berhasil terkirim.");
      setFormData({ nama_lengkap: '', email: '', subjek: '', pesan: '' });
    } catch (error) {
      alert("Gagal mengirim pesan.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-400 font-black uppercase animate-pulse">Menghubungkan Database...</div>;

  return (
    <section id="testimonials" className="py-32 bg-[#F9FAFB] px-6 lg:px-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto space-y-28 relative z-10">
        
        {/* --- 1. HEADER & COUNTER --- */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 text-[#E3242B]">
            <div className="w-10 h-[1px] bg-[#E3242B]"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.4em]">Apresiasi & Testimoni</span>
            <div className="w-10 h-[1px] bg-[#E3242B]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tighter uppercase">
            Suara Stakeholder <br /> <span className="text-[#E3242B]">Satu Data Desa.</span>
          </h2>
          {/* PERHITUNGAN BACKEND: Menampilkan total testimoni */}
          <div className="inline-flex items-center gap-2 bg-[#E3242B]/5 px-4 py-2 rounded-full border border-[#E3242B]/10">
             <div className="w-2 h-2 rounded-full bg-[#E3242B] animate-ping"></div>
             <span className="text-[10px] font-black text-[#E3242B] uppercase tracking-widest">
                Telah Terhimpun {totalCount} Testimoni Tokoh
             </span>
          </div>
        </div>

        {/* --- 2. GRID TESTIMONI (3 DATA) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                   <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-[#E3242B] text-[#E3242B]" />)}
                   </div>
                   <Quote size={32} className="text-gray-100 group-hover:text-[#E3242B]/20 transition-colors" />
                </div>
                <p className="text-gray-600 font-bold text-sm leading-relaxed text-justify">"{item.isi}"</p>
                
                {/* JABATAN (Garis Biru/Kuning Screenshot Mas) */}
                <div className="bg-gray-50 p-4 rounded-2xl border-l-4 border-[#E3242B]">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                       <UserCheck size={10} className="text-[#E3242B]" /> Jabatan / Institusi
                    </p>
                    <p className="text-[10px] font-bold text-[#111827] uppercase tracking-tighter line-clamp-2">{item.jabatan}</p>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-50 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md border-2 border-white">
                  <img src={item.gambar_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.nama} />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-black text-[#111827] text-xs uppercase truncate">{item.nama}</h4>
                  <div className="flex items-center gap-2 mt-1">
                      <Calendar size={10} className="text-[#E3242B]" />
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.tanggal}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TOMBOL LIHAT SEMUA (JANGAN DIHILANGKAN) */}
        <div className="flex justify-center">
            <Link to="/testimoni" className="group flex items-center gap-4 bg-[#111827] text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#E3242B] transition-all shadow-xl shadow-navy/20">
               Lihat Semua Testimoni <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
        </div>

        {/* --- 3. HUBUNGI KAMI (GABUNGAN & INTERAKTIF) --- */}
        <div className="grid lg:grid-cols-12 gap-16 pt-10 border-t border-gray-100">
            {/* Info Kontak Melink Langsung */}
            <div className="lg:col-span-5 space-y-10">
                <h3 className="text-3xl font-black text-[#111827] uppercase tracking-tighter leading-none">
                    Konsultasi & <br /> <span className="text-[#E3242B]">Layanan Media.</span>
                </h3>
                <div className="space-y-4">
                    <a href={contact.mapsLink} target="_blank" rel="noreferrer" className="flex gap-6 p-6 bg-white rounded-[2rem] hover:shadow-xl transition-all group">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#E3242B] group-hover:bg-[#E3242B] group-hover:text-white transition-all shrink-0">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h5 className="font-black text-[9px] text-gray-400 uppercase tracking-widest mb-1">Lokasi Kantor</h5>
                            <p className="text-[11px] font-bold text-[#111827] leading-relaxed">{contact.address}</p>
                        </div>
                    </a>
                    <a href={contact.waLink} target="_blank" rel="noreferrer" className="flex gap-6 p-6 bg-white rounded-[2rem] hover:shadow-xl transition-all group border-l-4 border-green-500">
                        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all shrink-0">
                            <MessageCircle size={20} />
                        </div>
                        <div>
                            <h5 className="font-black text-[9px] text-gray-400 uppercase tracking-widest mb-1">WhatsApp Center</h5>
                            <p className="text-sm font-black text-[#111827]">{contact.wa}</p>
                            <span className="text-[8px] font-black text-green-600 uppercase">Klik Untuk Chat</span>
                        </div>
                    </a>
                    <a href={`mailto:${contact.email}`} className="flex gap-6 p-6 bg-white rounded-[2rem] hover:shadow-xl transition-all group border-l-4 border-blue-500">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h5 className="font-black text-[9px] text-gray-400 uppercase tracking-widest mb-1">Email Resmi</h5>
                            <p className="text-sm font-black text-[#111827]">{contact.email}</p>
                            <span className="text-[8px] font-black text-blue-600 uppercase">Klik Untuk Kirim Email</span>
                        </div>
                    </a>
                </div>
            </div>

            {/* Form Terkoneksi Backend */}
            <div className="lg:col-span-7">
                <div className="bg-[#111827] p-10 md:p-14 rounded-[4rem] shadow-2xl relative overflow-hidden border border-white/5">
                    <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nama Lengkap</label>
                                <input required className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm outline-none focus:border-[#E3242B] transition-all" value={formData.nama_lengkap} onChange={e => setFormData({...formData, nama_lengkap: e.target.value})} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Aktif</label>
                                <input type="email" required className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm outline-none focus:border-[#E3242B] transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Subjek</label>
                            <input required className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm outline-none focus:border-[#E3242B] transition-all" value={formData.subjek} onChange={e => setFormData({...formData, subjek: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Isi Pesan</label>
                            <textarea required className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm h-32 outline-none focus:border-[#E3242B] transition-all resize-none" value={formData.pesan} onChange={e => setFormData({...formData, pesan: e.target.value})} />
                        </div>
                        <button type="submit" disabled={sending} className="w-full py-5 bg-[#E3242B] text-white font-black rounded-2xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-white hover:text-[#111827] transition-all">
                            {sending ? 'Memproses...' : 'Kirim Pesan'} <Send size={16} />
                        </button>
                    </form>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};