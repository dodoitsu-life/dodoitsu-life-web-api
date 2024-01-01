import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { AuthService } from '@domain/auth/auth.service';
import { UserService } from '@domain/user/user.service';

import { ApiResponse } from '@common/ApiResponse';

import { TokenRefreshDto } from '@application/auth/dto/token-refresh.dto';
import { ResponseUserDto } from '../user/dto/response-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    description: 'Twitter OAuth2を使用',
  })
  @ApiTags('auth')
  @UseGuards(AuthGuard('twitter'))
  @HttpCode(HttpStatus.OK)
  @Get('twitter')
  async signInWithTwitter() {}

  @ApiOperation({
    description:
      'Twitter OAuth2のCallBack。ユーザーデータをUPSERTし、JWTトークンを取得。フロントエンドのコールバックURLにtoken付きでリダイレクトする',
  })
  @ApiTags('auth')
  @UseGuards(AuthGuard('twitter'))
  @HttpCode(HttpStatus.OK)
  @Get('twitter/callback')
  async signInWithTwitterRedirect(@Req() req, @Res() res) {
    const user = await this.authService.handleCallback(req);
    const tokens = await this.authService.generateTokens(user);
    res.redirect(
      `${this.configService.get<string>('dodoitsuLifeCallbackUrl')}?token=${
        tokens.access_token
      }&refresh_token=${tokens.refresh_token}`,
    );
  }

  @ApiOperation({
    description: 'トークンのリフレッシュ',
  })
  @ApiTags('auth')
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: TokenRefreshDto) {
    const user = await this.authService.handleRefreshToken(body.refreshToken);
    if (!user) throw Error('User not found');
    const tokens = await this.authService.generateTokens(user);
    return tokens;
  }

  @ApiOperation({
    description: 'トークンをもとにログインユーザー自身のデータを取得する',
  })
  @ApiTags('auth')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getProfile(@Req() req) {
    const user = new ResponseUserDto(req.user);
    return ApiResponse.success(user);
  }

  @ApiOperation({
    description: 'ログアウト',
  })
  @ApiTags('auth')
  @Post('logout')
  async logout(@Body() body) {
    await this.authService.invalidateRefreshToken(body.refreshToken);
    return ApiResponse.success();
  }
}
