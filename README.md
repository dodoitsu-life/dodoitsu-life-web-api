# 都々逸ライフ :WebAPI

## Twitter Consumer Keys の取得

https://developer.twitter.com/

Keys And Tokens の API Key and Secret

## .env の作成

`$ cp env/.env.docker .env`

## docker

1. image の build
   `$ docker-compose -f docker-compose.dev.yaml build`
2. コンテナの起動
   `$ docker-compose -f docker-compose.dev.yaml up`
3. Migration, Seed の流し込み（初回のみ）
   a. `.env`の`DB_HOST='postgres'`を、`DB_HOST='localhost'`に一時的に書き換える
   b. `$ yarn migration:run`
   c. `$ yarn seed:run`
   d. `.env`の設定を戻しておく

## DB 周り

### migration

- migration ファイルの生成
  `$ yarn migration:generate src/infrastructure/orm/migrations/${prefix}${table}`
  Prefix の例：

  - `Create`: 新しいテーブルを作成する場合。
  - `Add`: 新しいカラムをテーブルに追加する場合、または新しいリレーションシップを追加する場合。
  - `Remove`: カラムやテーブル、リレーションシップを削除する場合。
  - `Alter`: 既存のカラムの属性や型を変更する場合。
  - `Drop`: テーブル自体を削除する場合。
  - `Rename`: テーブル名やカラム名を変更する場合。
  - `AddIndex`: 新しいインデックスを追加する場合。
  - `DropIndex`: インデックスを削除する場合。
  - `AddConstraint`: 新しい制約を追加する場合。
  - `RemoveConstraint`: 制約を削除する場合。
  - `Update`: 既存のデータの値を変更する場合。

- migration の実行
  `$ yarn migration:run`

### Seed の流し込み

`$ yarn seed:run`

## app

localost:8000

## swagger

localhost:8000/api

## pgweb

localhost:8081
