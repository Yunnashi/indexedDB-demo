# indexedDB-demo

本ソースは以下の講師の方のdemoアプリを引用しています。
https://gist.github.com/prof3ssorSt3v3/744ba0ae4640bdbfba01933800dc7a19


### iOSでのPWA化について

現在のところ、ホーム画面から起動したPWA（スタンドアロンモード）と
ブラウザから起動したPWA（ブラウザモード）の間でデータを直接共有することはできません。
これは、iOSがこれらの2つのモードを完全に分離して扱い、
それぞれに独自のストレージ（IndexedDBを含む）を割り当てるためです。

そのため、ブラウザでデータを受け取ったPWAアプリで、
manifest.json の"display": "standalone"　としてオフラインアプリを起動した場合、
両者の間でデータを共有することは現状のiOSでは不可能です。

※display: ブラウザがアプリケーションを表示する方法を定義します。
　"standalone"は、アプリケーションが独立したウィンドウで表示され、
　ブラウザのUI（URLバーなど）が表示されないことを意味します。


[対応方針]
・外部からデータを受け取るようなPWAアプリでは、
　ブラウザから起動したPWA（ブラウザモード）も、Service Workerでキャッシュされていれば
　オフライン状態で利用可能です。そのため、
　"display": "browser"に設定する必要があります。

・完全にPWAアプリで独立しているもの。スタンドアロンモード内で登録・表示させるだけのアプリ
　の場合は"display": "standalone"で問題ない


▼参考
https://developer.mozilla.org/ja/docs/Web/Manifest
