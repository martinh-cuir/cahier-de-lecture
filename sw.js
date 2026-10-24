/* Cahier de lecture : service worker.
   Garde l'application dans le téléphone pour qu'elle s'ouvre sans réseau.
   Changer VERSION à chaque mise à jour publiée. */
const VERSION = "cahier-1.2.0";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png"
];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== "cahier-fonts").map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Polices : servies depuis le téléphone une fois téléchargées.
  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.open("cahier-fonts").then(async cache => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res.ok || res.type === "opaque") cache.put(req, res.clone());
          return res;
        } catch (_) { return hit || Response.error(); }
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Page de l'application : le réseau d'abord (pour recevoir les mises à jour), sinon la copie gardée.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put("./index.html", copy));
        return res;
      }).catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
    return;
  }

  // Autres fichiers de l'application : la copie gardée, rafraîchie en arrière-plan.
  event.respondWith(
    caches.open(VERSION).then(async cache => {
      const hit = await cache.match(req);
      const net = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => null);
      return hit || (await net) || Response.error();
    })
  );
});
