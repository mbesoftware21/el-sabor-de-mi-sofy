const CACHE_NAME = 'el-sabor-sofy-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Fredoka:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
