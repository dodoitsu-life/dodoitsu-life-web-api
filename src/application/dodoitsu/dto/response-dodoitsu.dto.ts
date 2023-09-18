import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsArray,
} from 'class-validator';

import { Dodoitsu } from '@domain/dodoitsu/dodoitsu.entity';
import { ResponseUserDto } from '@application/user/dto/response-user.dto';
import { ResponseDodoitsuLikeDto } from '@application/dodoitsu/dto/response-dodoitsu-like.dto';

export class ResponseDodoitsuDto {
  constructor(dodoitsu: Dodoitsu, isLiked: boolean) {
    this.id = dodoitsu.id;
    this.content = dodoitsu.content;
    this.description = dodoitsu.description;
    this.createdAt = dodoitsu.createdAt;

    this.likes = dodoitsu.likes.map(
      (like) => new ResponseDodoitsuLikeDto(like),
    );
    this.isLiked = isLiked;
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

  @IsArray()
  readonly likes: ResponseDodoitsuLikeDto[];

  @IsBoolean()
  readonly isLiked: boolean;

  readonly author?: ResponseUserDto;
}
