import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly photo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly twitterId: string;

  @IsDate()
  @ApiProperty()
  readonly createdAt: Date;
}
