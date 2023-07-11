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

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  twitterLogin() {
    // Initiates the Twitter login process
    console.log('twitterLogin test');
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
