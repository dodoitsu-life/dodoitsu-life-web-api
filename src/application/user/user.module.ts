import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from '@application/user/user.controller';
import { UserApplicationService } from '@application/user/user.service';

import { UserService } from '@domain/user/user.service';
import { User } from '@domain/user/user.entity';
import { UserRepository } from '@infrastructure/orm/user/user.repository';
import { SYMBOL } from '@domain/user/user.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserApplicationService,
    UserService,
    {
      provide: SYMBOL,
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
