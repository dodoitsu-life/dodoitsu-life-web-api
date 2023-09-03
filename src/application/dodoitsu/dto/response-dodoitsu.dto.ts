import { IsString, IsNotEmpty, IsDate } from 'class-validator';

import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { ResponseUserDto } from '@application/user/dto/response-user.dto';

export class ResponseDodoitsuDto {
  constructor(dodoitsu: Dodoitsu) {
    this.id = dodoitsu.id;
    this.content = dodoitsu.content;
    this.description = dodoitsu.description;
    this.createdAt = dodoitsu.createdAt;
    if (dodoitsu.author) {
      this.author = new ResponseUserDto(dodoitsu.author);
    }
  }

  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  readonly description?: string;

  @IsDate()
  readonly createdAt: Date;

  readonly author?: ResponseUserDto;
}
