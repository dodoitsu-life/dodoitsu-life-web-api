import { Controller, Delete, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../domain/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { LoggedInGuard } from '../../infrastructure/auth/logged-in.guard';
import { ApiResponse } from 'src/common/ApiResponse';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard('twitter'))
  @Get('twitter')
  async signInWithTwitter() {}

  @UseGuards(AuthGuard('twitter'))
  @Get('twitter/callback')
  async signInWithTwitterRedirect(@Req() req, @Res() res) {
    const user = await this.authService.handleCallback(req);
    req.session.user = user;
    res.redirect(this.configService.get('dodoitsuLifeCallbackUrl'));
  }

  @UseGuards(LoggedInGuard)
  @Get('me')
  getProfile(@Req() req) {
    return ApiResponse.success(req.session.user);
  }

  @Get('logout')
  async logout(@Req() req) {
    req.session.user = null;
    return ApiResponse.success();
  }
}
