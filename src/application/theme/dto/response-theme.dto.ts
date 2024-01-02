import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Theme } from '@domain/theme/theme.entity';

/**
 * SCHEDULED 受付開始前
 * ACTIVE    投稿受付中
 * CLOSED    投稿受付終了
 */
export enum Status {
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}

export class ResponseThemeDto {
  constructor(theme: Theme) {
    this.id = theme.id;
    this.title = theme.title;
    this.description = theme.description;
    this.startDate = theme.startDate;
    this.endDate = theme.endDate;

    const now = new Date();
    if (now < theme.startDate) {
      this.status = Status.SCHEDULED;
    } else if (now > theme.endDate) {
      this.status = Status.CLOSED;
    } else {
      this.status = Status.ACTIVE;
    }
  }

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly endDate: Date;

  @IsEnum(Status)
  @ApiProperty()
  readonly status: Status;
}
