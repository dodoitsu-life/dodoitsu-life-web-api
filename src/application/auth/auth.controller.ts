import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../domain/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { ApiResponse } from 'src/common/ApiResponse';
import { UserService } from 'src/domain/user/user.service';
import { TokenRefreshDto } from './dto/token-refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard('twitter'))
  @Get('twitter')
  async signInWithTwitter() {}

  @UseGuards(AuthGuard('twitter'))
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

  @Post('refresh-token')
  async refreshToken(@Body() body: TokenRefreshDto) {
    const user = await this.authService.handleRefreshToken(body.refreshToken);
    const tokens = await this.authService.generateTokens(user);
    return tokens;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Req() req) {
    const user = await this.userService.findOne({ id: req.user.userId });
    return ApiResponse.success(user);
  }

  @Post('logout')
  async logout(@Body() body) {
    await this.authService.invalidateRefreshToken(body.refreshToken);
    return ApiResponse.success();
  }
}
