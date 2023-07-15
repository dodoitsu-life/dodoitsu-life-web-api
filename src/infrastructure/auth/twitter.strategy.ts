import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      consumerKey: configService.get<string>('auth.twitter.clientId'),
      consumerSecret: configService.get<string>('auth.twitter.clientSecret'),
      callbackURL: configService.get<string>('auth.twitter.callbackUrl'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { emails, username, id } = profile;

    const user = {
      email: emails[0].value,
      username,
      twitterId: id,
    };

    done(null, user);
  }
}
