import {
  Controller,
  Get,
  Redirect,
  Req,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from '../../domain/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  async twitterLogin() {
    // Initiates the Twitter login process
  }

  @Get('twitter/callback')
  @UseGuards(AuthGuard('twitter'))
  async twitterLoginCallback(@Req() req: Request) {
    const user = await this.authService.handleCallback(req);
    // TODO: Add user to session
    // @ts-ignore
    req.session.user = user;
  }
}
