import axios from "axios";
import axios from "axios";

<<<<<<< HEAD
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
=======
const ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:8085").replace(/\/+$/, "");
const BASE_URL = `${ORIGIN}/api`;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json" },
});

export const getStorageUrl = (path: any) => {
  if (!path) return "/img/placeholder.png";

  const targetPath = Array.isArray(path) ? path[0] : path;
  if (typeof targetPath !== "string") return "/img/placeholder.png";

  const cleanPath = targetPath.replace(/^public\//, "");
  return `${ORIGIN}/storage/${cleanPath}`;
};

>>>>>>> de69a48 (Use VITE_API_URL for API baseURL and storage URL)
