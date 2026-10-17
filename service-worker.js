const CACHE_NAME = "olesc-conecta-v2";

const ARQUIVOS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json"
];

self.addEventListener("install", function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ARQUIVOS);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(nomes) {
      return Promise.all(
        nomes
          .filter(function(nome) { return nome !== CACHE_NAME; })
          .map(function(nome) { return caches.delete(nome); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then(function(resposta) {
        if (resposta.ok) {
          const copia = resposta.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, copia);
          });
        }
        return resposta;
      })
      .catch(function() {
        return caches.match(event.request).then(function(guardado) {
          if (guardado) return guardado;
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        });
      })
  );
});