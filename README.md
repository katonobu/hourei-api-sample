# 法令 API プロトタイプ利用アプリサンプル
## 自出
[法制事務デジタル化・法令等データ利活用促進](https://www.digital.go.jp/policies/legal-practice)の[公開機能（ZIP／3,782KB）](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/7f49ac76-91f1-44ba-91bd-2114973fcc61/b75ba408/20240524_policies_legal-practice_outline_03.zip)を解凍した中に含まれる、`法令APIプロトタイプ利用サンプル.zip`を解凍したものが起点。

## 概要

本サンプルは、「**法令 API プロトタイプ**」を利用して法令データを検索、閲覧できる Web アプリケーションのサンプルです。

本サンプルでは、以下の操作を行うことができます。

<ol>
    <li>キーワード検索
        <ul>
            <li>時点指定</li>
            <li>検索結果から法令本文のファイルダウンロード</li>
        </ul>
    </li>
    <li>詳細検索
        <ul>
            <li>法令名または法令番号の指定</li>
            <li>法令種別の指定</li>
            <li>時点指定</li>
            <li>公布日範囲指定</li>
            <li>法令分類の指定</li>  
            <li>データ更新日の範囲指定</li>
            <li>検索結果から法令本文のファイルダウンロード</li>
        </ul>
    <li>法令データの確認
      <ul>
        <li>法令データの表示</li>
        <li>法令本文のファイルダウンロード</li>
      </ul>
    <li>条文沿革の確認</li>
    <li>添付画像の表示</li>  
    </li>
</ol>

各操作の説明は、[docs/manual.md](./docs/manual.md)を参照してください。

## 前提条件

本プロジェクトをローカル環境で実行する場合、以下の環境が必要です。

- [Node.js](https://nodejs.org/)（v18.16.0 以上）
- [npm](https://www.npmjs.com/)（v9.7.1 以上）または [yarn](https://yarnpkg.com/)（v1.22.19 以上）

## インストール

依存関係のライブラリをインストールします。

```sh
npm install
```

yarn の場合は以下のとおりです。

```sh
yarn install
```

### 環境変数の設定

`.env.local`ファイルをプロジェクトのルートに新たに作成し、環境変数を設定します。  
環境変数については、`.env.local.sample`ファイルを参照してください。

```env
API_URL="APIのベースURL（Swagger UIでは「Computed URL」欄に表示されています）"
APP_BASE_URL="API利用アプリのベースURL(例: https://localhost:3000)"
NEXT_PUBLIC_API_SPECIFICATION_URL="OpenAPI Specification（仕様書）を表示するSwagger UIのURL"
NEXT_PUBLIC_SOURCE_CODE_STORAGE_URL="ソースコード(zipファイル)の格納先のURL"
```

## 起動方法

本サンプルの起動方法は以下のとおりです。

npm の場合は以下のコマンドを実行します。

```sh
npm run dev
```

yarn の場合は以下のコマンドを実行します。

```sh
yarn dev
```

ブラウザで`http://localhost:3000` にアクセスします（デフォルトは、3000 ポートです）。  
3000 ポートが既に使用されている場合は、以下の手順で別のポートを指定して起動します。

### 起動ポートの変更方法

起動ポートを変更する場合、起動コマンドにポート指定のオプションをつける必要があります。  
ポートを 4000 で起動したい場合、`package.json`の scripts の dev コマンドを以下のように変更します。

```json
  "scripts": {
    "dev": "next dev -p 4000",
    ...
  }
```

### ポートを環境変数に設定する場合

以下の手順でポート番号を環境変数に設定して起動することも可能です。

`.env.localファイル`に`APP_PORT`を追加し、ポート番号を指定します。

```env
APP_PORT=4000
...
```

#### 利用 OS が Windows の場合

ここでは、dotenv-cli と cross-var を利用して環境変数を読み込む方法を紹介します。

npm の場合は以下のコマンドを実行します。

```sh
npm install --save-dev dotenv-cli cross-var
```

yarn の場合は以下のコマンドを実行します。

```sh
yarn add -D dotenv-cli cross-var
```

`package.json`を以下のように変更します。

```json
  "scripts": {
    "dev": "dotenv -e .env.local -- cross-var next dev --port $APP_PORT",
    ...
  }
```

#### 利用 OS が Mac の場合

`package.json`を以下のように変更します。

```json
  "scripts": {
    "dev": "source .env.local && next dev --port $APP_PORT",
    ...
  }
```

## ビルド方法

本サンプルのビルド方法は以下です。

npm の場合は以下のコマンドを実行します。

```sh
npm run build
```

yarn の場合は以下のコマンドを実行します。

```sh
yarn build
```

## ユーザーマニュアル

本サンプルのユーザーマニュアルは、[docs/manual.md](./docs/manual.md) にあります。  
また、[docsify](https://docsify.js.org/#/)を利用し、以下のコマンドでユーザーマニュアルを Web ページとして閲覧することができます。

```sh
docsify serve docs
```

## ライセンス

このプロジェクトは MIT ライセンスのもとでライセンスされています。  
詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 依存関係のライブラリについて

本サンプルは、オープンソースソフトウェアを利用しています。  
利用ソフトウェアの著作権情報については、[COPYRIGHT_THIRD_PARTY_SOFTWARE_NOTICE.md](./COPYRIGHT_THIRD_PARTY_SOFTWARE_NOTICE.md) を参照してください。

---

<div align="center">Copyright ©︎ Digital Agency All Rights Reserved.</div>
