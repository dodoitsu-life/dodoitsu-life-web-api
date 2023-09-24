import { IsNumber } from 'class-validator';
import { DodoitsuLike } from '@domain/dodoitsu/dodoitsu-like.entity';
import { ResponseUserDto } from '@application/user/dto/response-user.dto';

export class ResponseDodoitsuLikeDto {
  constructor(like: DodoitsuLike) {
    this.id = like.id;
    this.user = new ResponseUserDto(like.user);
  }

  @IsNumber()
  readonly id: number;

  readonly user: ResponseUserDto;
}
