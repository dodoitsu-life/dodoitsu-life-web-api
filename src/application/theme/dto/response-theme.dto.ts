import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Theme } from '@domain/theme/theme.entity';

export class ResponseThemeDto {
  constructor(theme: Theme) {
    this.id = theme.id;
    this.title = theme.title;
    this.description = theme.description;
    this.startDate = theme.startDate;
    this.endDate = theme.endDate;
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
}
