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

// アクティベート処理を追加することによって、不要なキャッシュが残らないようにする
// 現在のCACHE_NAME以外の古いキャッシュを削除
self.addEventListener('activate', function(event) {
  // 現在のキャッシュ名をホワイトリストに追加
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          // ホワイトリストに含まれていないキャッシュ名を削除
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


// リソースフェッチ時のロード処理
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // ネットワークリクエストする
    fetch(event.request).then(function(response) {
      // ネットワークリクエストが成功した場合、キャッシュを更新
      return caches.open(CACHE_NAME).then(function(cache) {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch(function() {
      // ネットワークリクエストが失敗した場合、キャッシュから取得
      return caches.match(event.request).then(function(response) {
        // キャッシュからのレスポンスが見つからなかった場合（responseがnullまたはundefinedの場合）に、
        // ネットワークからリクエストを再度試みます。
        return response || fetch(event.request);
      });
    })
  );
});
