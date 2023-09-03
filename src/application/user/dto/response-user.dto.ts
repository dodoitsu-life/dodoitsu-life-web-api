import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { User } from '@domain/user/user.entity';

export class ResponseUserDto {
  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.photo = user.photo;
    this.twitterId = user.twitterId;
    this.createdAt = user.createdAt;
  }

  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly photo: string;

  @IsString()
  @IsNotEmpty()
  readonly twitterId: string;

  @IsDate()
  readonly createdAt: Date;
}
