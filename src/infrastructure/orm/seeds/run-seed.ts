import { NestFactory } from '@nestjs/core';

import { SeedModule } from './seed.module';
import { UserSeedService } from './user/user-seed.service';
import { ThemeSeedService } from './theme/theme-seed.service';
import { DodoitsuSeedService } from './dodoitsu/dodoitsu-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // 都々逸, 都々逸といいねの中間テーブルは他に依存されていないため、最初に削除を実行する
  await app.get(DodoitsuSeedService).delete();
  await app.get(ThemeSeedService).delete();
  await app.get(UserSeedService).delete();

  await Promise.all([
    app.get(UserSeedService).run(),
    app.get(ThemeSeedService).run(),
  ]);

  // リレーションのあるカラムへのデータセット時、Theme, Userを既存のデータから取得して使用する必要があるため、同期処理に切り出し
  await app.get(DodoitsuSeedService).run();

  await app.close();
  console.log('🌱 Seed data population is complete.');
};

void runSeed();
