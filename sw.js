/* 菁鹿四股弦 PWA 离线缓存 Service Worker */
var CACHE = 'julu-siguxian-v25';
var APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.svg',
  './polyfills.js',
  './assets/index-gGgTOX2A.js',
  './assets/index-CgqQYFYk.css',
  './assets/index-CgqQYFYk.legacy.css',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './digital-human/jinglu-base.jpg',
  './digital-human/jinglu-sheng.jpg',
  './digital-human/jinglu-dan.jpg',
  './digital-human/jinglu-jing.jpg',
  './digital-human/jinglu-chou.jpg',
  './digital-human/jinglu-base-anim.jpg',
  './digital-human/jinglu-sheng-anim.jpg',
  './digital-human/jinglu-dan-anim.jpg',
  './digital-human/jinglu-jing-anim.jpg',
  './digital-human/jinglu-chou-anim.jpg',
  './digital-human/jinglu-base-idle.jpg',
  './digital-human/jinglu-sheng-idle.jpg',
  './digital-human/jinglu-dan-idle.jpg',
  './digital-human/jinglu-jing-idle.jpg',
  './digital-human/jinglu-chou-idle.jpg',
  './audio/打金枝.mp3',
  './audio/斩姚期.mp3',
  './audio/贺后骂殿.mp3',
  './audio/寇秀英挂帅.mp3',
  './audio/打窗楼.mp3',
  './audio/墙头记.mp3',
  './audio/三战张月姚.mp3',
  './audio/宫门挂袍.mp3',
  './audio/少国公.mp3',
  './audio/女中魁.mp3'
];
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(APP_SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') { return; }
  var url = new URL(req.url);
  if (url.origin !== location.origin) { return; }
  e.respondWith(
    fetch(req)
      .then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { return c.put(req, copy); });
        }
        return res;
      })
      .catch(function () {
        return caches.match(req).then(function (m) {
          return m || caches.match('./index.html');
        });
      })
  );
});
