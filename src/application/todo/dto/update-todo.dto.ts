import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsBoolean()
  readonly complete: boolean;

  @ApiProperty()
  @IsString()
  readonly contents: string;
}
