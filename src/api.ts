import axios from 'axios';

const BASE_URL = "http://ddp_api.test/api"; 

export const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Accept': 'application/json' }
});

// FUNGSI PINTAR: Mendukung String tunggal maupun Array gambar
export const getStorageUrl = (path: any) => {
    if (!path) return "/img/placeholder.png"; 
    
    // LOGIKA: Jika path adalah array (Multiple Upload), ambil gambar pertama untuk sampul
    let targetPath = Array.isArray(path) ? path[0] : path;

    if (typeof targetPath !== 'string') return "/img/placeholder.png";
    
    const cleanPath = targetPath.replace('public/', '');
    return `http://ddp_api.test/storage/${cleanPath}`;
};