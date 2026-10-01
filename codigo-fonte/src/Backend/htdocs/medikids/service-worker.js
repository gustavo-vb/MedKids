const CACHE_NAME = 'medikids-cache-v1';

const STATIC_ASSETS = [
  './',
  './login.html',
  './selecao.html',
  './perfil-responsavel.html',
  './tela-personagens.html',
  './tela_de_escolha.html',
  './Recente.html',
  './jogos.html',
  './videos.html',
  './conclusao.html',
  './css/style.css?v=5',
  './js/script.js',
  './img/icon-192.png',
  './img/icon-512.png',
  './img/hospital.png',
  './img/configuracao_icon.png',
  './img/configuracao_icon_2.png',
  './img/personagem_menina.png',
  './img/personagem_menino.png',
  './sons/click_button_shorter.mp3',
  './sons/hoover.wav'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME ? caches.delete(key) : null))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Não cacheia requisições do backend para evitar sessão/login desatualizados.
  if (requestUrl.pathname.includes('/backend/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./login.html')))
  );
});
