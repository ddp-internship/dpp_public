import axios from 'axios';

/**
 * LOGIKA JEMBATAN OTOMATIS:
 * Jika sedang di Vercel, dia akan mengambil link dari Settings Vercel (VITE_API_URL).
 * Jika sedang koding di laptop, dia akan otomatis pakai localhost:8000.
 */
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"; 

export const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Accept': 'application/json' }
});

// FUNGSI PINTAR: Mendukung String tunggal maupun Array gambar dari Backend Docker
export const getStorageUrl = (path: any) => {
    if (!path) return "/img/placeholder.png"; 
    
    // Ambil gambar pertama jika datanya berupa array
    let targetPath = Array.isArray(path) ? path[0] : path;

    if (typeof targetPath !== 'string') return "/img/placeholder.png";
    
    const cleanPath = targetPath.replace('public/', '');
    
    // Inovasi: Otomatis merubah alamat gambar mengikuti link Ngrok yang aktif
    const storageBase = BASE_URL.replace('/api', '/storage');
    
    return `${storageBase}/${cleanPath}`;
};
