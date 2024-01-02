import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

import { Theme } from '@domain/theme/theme.entity';

@Injectable()
export class ThemeSeedService {
  constructor(
    @InjectRepository(Theme)
    private repository: Repository<Theme>,
  ) {}

  async run() {
    const now = new Date();

    // 過去の日付を生成
    const pastDate = new Date(now);
    pastDate.setFullYear(now.getFullYear() - 2); // 2年前

    // 将来の日付を生成
    const futureDate = new Date(now);
    futureDate.setFullYear(now.getFullYear() + 2); // 2年後

    // StartDateとEndDateが両方過去のデータ
    const closeTheme: Theme = {
      id: randomUUID(),
      title: '過去のテーマ',
      description: '過去のお題テーマ',
      startDate: new Date(pastDate.setMonth(pastDate.getMonth() - 6)), // 6ヶ月前
      endDate: pastDate,
    };

    // StartDateのみが過去で、EndDateが未来のデータ
    const activeTheme: Theme = {
      id: randomUUID(),
      title: '現在進行中のテーマ',
      description: '現在進行中のお題テーマ',
      startDate: pastDate,
      endDate: futureDate,
    };

    const scheduledTheme: Theme = {
      id: randomUUID(),
      title: '未来のテーマ',
      description: '未来のお題テーマ',
      startDate: new Date(futureDate.setMonth(futureDate.getMonth() + 6)), // 6ヶ月後
      endDate: futureDate,
    };

    await Promise.all([
      this.repository.save(closeTheme),
      this.repository.save(activeTheme),
      this.repository.save(scheduledTheme),
    ]);
  }

  delete() {
    return this.repository.delete({});
  }
}
