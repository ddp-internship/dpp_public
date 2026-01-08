import axios from "axios";

// Base URL backend (ngrok / cloud run / localhost)
const ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:8085").replace(/\/+$/, "");
const BASE_URL = `${ORIGIN}/api`;


export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

// Mendukung string atau array path (multiple upload)
export function getStorageUrl(path: any) {
  if (!path) return "/img/placeholder.png";
  const targetPath = Array.isArray(path) ? path[0] : path;
  if (typeof targetPath !== "string") return "/img/placeholder.png";
  const cleanPath = targetPath.replace("public/", "");
  return `${ORIGIN}/storage/${cleanPath}`;
}

