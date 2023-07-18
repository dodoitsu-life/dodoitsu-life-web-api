import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TokenRefreshDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;
}
