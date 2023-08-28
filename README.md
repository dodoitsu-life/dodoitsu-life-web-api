# 都々逸ライフ :WebAPI

## .env の作成

`$ cp env/.env.local .env`

## docker

1. image の build
   `$ docker-compose -f docker-compose.dev.yaml build`
2. docker コンテナの起動
   `$ docker-compose -f docker-compose.dev.yamal up`

## Entity を変更した場合のコミット手順

1. migration ファイルを生成
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

## app

localost:8000

## swagger

localhost:8000/api

## pgweb

localhost:8080
