// キャッシュ名とキャッシュするファイルの指定
var CACHE_NAME = 'pwa-demo-caches-v1';
var contentToCache = [
  'main.css',
  'index.html',
  'app.js',
  'manifest.json',
  'uid.js',
];

// インストール処理
self.addEventListener('install', function(event) {
  // キャッシュの追加処理が完了するまでインストールが終わらないように待つ
  event.waitUntil(
    // キャッシュを開いてキャッシュストレージに追加する
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(contentToCache);
    })
  );
});

// リソースフェッチ時のロード処理
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // リクエストに一致するデータがキャッシュにあるかどうか
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(response) {
        return caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

