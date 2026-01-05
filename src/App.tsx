import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar'; 
import { Footer } from './components/Footer'; 
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage'; // Menggunakan halaman About yang kita buat sebelumnya
import { MonografiPage } from './pages/MonografiPage';
import { InfografisPage } from './pages/InfografisPage';
import { NewsPage } from './pages/NewsPage';
import { GalleryPage } from './pages/GalleryPage'; // 1. Import
import { BukuJurnalPage } from './pages/BukuJurnalPage';
import { TestimonialsPage } from './pages/TestimonialsPage'; // 1. Import
import { FloatingContact } from './components/FloatingContact';

export default function App() {
  return (
    <Router>
      {/* Wrapper utama dengan Flexbox agar footer selalu di bawah jika konten sedikit */}
      <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans selection:bg-crimson selection:text-white">
        
        {/* 1. NAVBAR (Muncul di semua halaman) */}
        <Navbar />
        
        {/* 2. AREA KONTEN UTAMA */}
        <div className="flex-grow">
          <Routes>
            {/* Jalur Halaman Indeks Utama */}
            <Route path="/" element={<Home />} />
            {/* Jalur Halaman About (Cerita Kami) */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/monografi" element={<MonografiPage />} />
            <Route path="/infografis" element={<InfografisPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/buku-jurnal" element={<BukuJurnalPage />} />
            <Route path="/testimoni" element={<TestimonialsPage />} />
          </Routes>

         
        </div>
        <FloatingContact />

        {/* 3. FOOTER (Muncul di semua halaman) */}
        <Footer />
        
      </div>
    </Router>
  );
}







