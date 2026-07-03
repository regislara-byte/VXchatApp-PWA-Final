
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("vxchat-cache").then(function (cache) {
      return cache.addAll([
        "index.html",
        "vaxinxchatapplogo.png",
        "gcash_qr.png",
        "paypal_button.png"
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
