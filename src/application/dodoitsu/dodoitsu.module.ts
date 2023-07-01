import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DodoitsuController } from './dodoitsu.controller';
import { DodoitsuService } from '../../domain/dodoitsu/dodoitsu.service';
import { DodoitsuRepository } from '../../infrastructure/orm/dodoitsu/dodoitsu.repository';
import { SYMBOL } from '../../domain/dodoitsu/dodoitsu.repository.interface';
import { Dodoitsu } from '../../domain/dodoitsu/dodoitsu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dodoitsu])],
  controllers: [DodoitsuController],
  providers: [
    DodoitsuService,
    {
      provide: SYMBOL,
      useClass: DodoitsuRepository,
    },
  ],
})
export class DodoitsuModule {}
