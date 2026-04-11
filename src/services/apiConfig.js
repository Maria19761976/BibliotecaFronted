const fallbackApiUrl = "http://localhost:8080";

export const apiBaseUrl = (import.meta.env.VITE_API_URL || fallbackApiUrl).replace(/\/+$/, "");
