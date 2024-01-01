# 都々逸ライフ :WebAPI

## Twitter Consumer Keys の取得

https://developer.twitter.com/

Keys And Tokens の API Key and Secret

## .env の作成

`$ cp env/.env.local .env`

## docker

1. image の build
   `$ docker-compose -f docker-compose.dev.yaml build`
2. nest-app コンテナに入り、.env を編集する
   a. `$ docker-compose -f docker-compose.dev.yaml run nest-app bash`
   b. `$ vi .env`
   c. 「Twitter Consumer Keys の取得」にて取得した Secret を `TWITTER_CONSUMER_KEY`、`TWITTER_CONSUMER_SECRET` に入力する
   d. 保存して閉じる（`Esc -> :wq`）
3. コンテナの起動
   `$ docker-compose -f docker-compose.dev.yaml up`

## migration 周り

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

## app

localost:8000

## swagger

localhost:8000/api

## pgweb

localhost:8081
