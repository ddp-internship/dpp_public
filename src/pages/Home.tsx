import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Statistics } from '../components/Statistics';
import { Partners } from '../components/Partners'; 
import { About } from '../components/About';      
import { Features } from '../components/Features'; 
import { Monografi } from '../components/Monografi';
import { Infografis } from '../components/Infografis'; 
import { News } from '../components/News';
import { Gallery } from '../components/Gallery';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';

export const Home = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Setiap bagian diberi ID agar bisa dituju oleh Navbar */}
        <div id="hero"><Hero /></div>
        <div id="statistics"><Statistics /></div>
        <div id="partners"><Partners /></div>
        <div id="features"><Features /></div>
        <div id="about"><About /></div>
        <div id="monografi"><Monografi /></div>
        <div id="infografis"><Infografis /></div>
        <div id="news"><News /></div>
        <div id="gallery"><Gallery /></div>
        <div id="testimonials"><Testimonials /></div>
      </main>

    </div>
  );
};

export default Home;