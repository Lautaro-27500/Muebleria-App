const VERSION = "v1"; // Cambiá esto (ej. "v2") cada vez que actualices la app[cite: 16, 19]
const ARCHIVOS = [
    "./",
    "./index.html",
    "./styles.css",
    "./app.js",
    "./manifest.json",
    "./icono-192.png",
    "./icono-512.png"
];

// Instala y guarda copias en caché[cite: 16]
self.addEventListener("install", e => {
    e.waitUntil(caches.open(VERSION).then(cache => cache.addAll(ARCHIVOS)));
});

// Borra cachés viejas al activar[cite: 16]
self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => { if (key !== VERSION) return caches.delete(key); })
        ))
    );
});

// Estrategia "primero la caché" para funcionar sin internet[cite: 16]
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(respuesta => respuesta || fetch(e.request))
    );
});