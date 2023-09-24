import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { ResponseUserDto } from '@application/user/dto/response-user.dto';

export class ResponseDodoitsuDto {
  constructor(dodoitsu: Dodoitsu, isLiked: boolean) {
    this.id = dodoitsu.id;
    this.content = dodoitsu.content;
    this.description = dodoitsu.description;
    this.createdAt = dodoitsu.createdAt;

    this.likeCount = dodoitsu.likes ? dodoitsu.likes.length : 0;
    this.isLiked = isLiked;
    if (dodoitsu.author) {
      this.author = new ResponseUserDto(dodoitsu.author);
    }
  }

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly content: string;

  @IsString()
  @ApiProperty()
  readonly description?: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly createdAt: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly likeCount: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly isLiked: boolean;

  @ApiProperty()
  readonly author?: ResponseUserDto;
}
