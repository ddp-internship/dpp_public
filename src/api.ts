import axios from 'axios';

// SOP: Alamat dinamis dari Vercel
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api"; 

export const api = axios.create({
    baseURL: BASE_URL,
    headers: { 
        'Accept': 'application/json',
        /* --- KUNCI SAKTI: Menembus Layar Biru Ngrok --- */
        'ngrok-skip-browser-warning': '69420' 
    }
});

// FUNGSI PINTAR GAMBAR
export const getStorageUrl = (path: any) => {
    if (!path) return "/img/placeholder.png"; 
    
    let targetPath = Array.isArray(path) ? path[0] : path;
    if (typeof targetPath !== 'string') return "/img/placeholder.png";
    
    const cleanPath = targetPath.replace('public/', '');
    const storageBase = BASE_URL.replace('/api', '/storage');
    
    return `${storageBase}/${cleanPath}`;
};
