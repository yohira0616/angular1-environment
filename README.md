# angular1-environment
angular1のフロントのビルドテンプレート

## 目的
毎度毎度Angularのプロジェクト立てるたびにしこしこpackage.jsonとgulpfileを書きたくないのでこいつで統一する


## usage
npmインタフェースでビルドプロセスを呼び出せるようにしています。  
gulpよくしらない+設定のことを意識せずに開発したい人向け。
##### 準備(このプロジェクトをクローンして最初に行う)
```shell
npm run prepare
```
##### ソースビルド
```shell
npm run build
```
##### 開発
```shell
npm run develop
```
上記コマンドが走っている状態でsrc/以下を編集すると自動的にビルド・ブラウザがリロードされて、  
変更を即座に確認できる。
## 構成
|ディレクトリ名|役割              |
|:------------:|:----------------:|
|src/htdocs    |htmlを配置        |
|src/scripts   |jsファイルを配置  |
|src/scss      |scssファイルを配置|
|src/templates |ディレクティブのテンプレートファイルを配置|

### 使用プラグイン説明

##### gulp-concat
browserifyやWebpackなど選択肢はありますが、どうもAngularのDI方式とCommonJS方式の折り合いが難しいので、思い切ってgulp-concatで「全部のファイルを一つに連結するだけ」という管理方法にしてみました。  
Webpack.config.jsをいじることでうまくCommonJSスタイルと旧来のAngularスタイルを両立できるのかもしれませんが、おそらくWebpack.config.jsが秘伝のタレ化する気がします...

##### gulp-babel
gulp-concatを使っているのでrequire()は使用できませんが、ES6のクラス構文やテンプレートリテラル、アロー式は使えると捗るので使用しています。

##### gulp-angular-templateCache
ディレクティブのテンプレートのhtmlファイルの中身をtemplates.jsにまとめ、$templateCacheで読み込めます。

##### gulp-ng-annotate
```javascript
angular.module('app')
  .controller('SampleController', function ($scope) {
    var timeStr = new Date().toDateString();
    $scope.text = `Hey! time is ${timeStr}`;
  });

```
とソースファイルに書くことで、自動的に配列アノテーションを使用した書式
```javascript
angular.module('app')
  .controller('SampleController', ['$scope', function ($scope) {
    var timeStr = new Date().toDateString();
    $scope.text = `Hey! time is ${timeStr}`;
  }]);
```
に変換してくれます。(その後、uglifyで圧縮してもDIが失敗しない)

### 推奨コードスタイル
CommonJSスタイルを無理に使わずに（というか使っても動きません）、従来のAngularの書き方を推奨します。  
CommonJSスタイルはAngular2で存分に使いましょう。
