import {
  Controller,
  Get,
  Redirect,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../domain/auth/auth.service';
import { ApiResponse } from '../../common/ApiResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google')
  async signInWithGoogle() {}

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async signInWithGoogleRedirect(@Req() req) {
    const user = await this.authService.handleCallback(req);
    req.session.user = user;
  }

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  twitterLogin() {
    // Initiates the Twitter login process
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // Initiates the Twitter login process
  }

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  async twitterLoginCallback(@Req() req: Request) {
    console.log(req);
    return ApiResponse.success(req);
    // const user = await this.authService.handleCallback(req);
    // // TODO: Add user to session
    // // @ts-ignore
    // req.session.user = user;
  }
}
