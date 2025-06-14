const cacheName = "libranet-cache-v3";
const filesToCache = [
  "./",
  "./studentDashboard.html",
  "./studentDashboard.css",
  "./studentDashboard.js",
  "./manifest.json",
  "./book-192.png",
  "./book-512.png",
  "./Sale.png",
  "https://cdn.tailwindcss.com",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Caching files...");
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(() => {
        // Return a fallback page if offline
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      });
    })
  );
});

