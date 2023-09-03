import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitter';
import { ConfigService } from '@nestjs/config';

export interface TwitterUserPayload {
  twitterId: string;
  name: string;
  photo: string;
}

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private configService: ConfigService) {
    super({
      consumerKey: configService.get<string>('auth.twitter.consumerKey'),
      consumerSecret: configService.get<string>('auth.twitter.consumerSecret'),
      callbackURL: configService.get<string>('auth.twitter.callbackUrl'),
    });
  }

  async validate(
    _,
    __,
    profile: any,
    done: (err: any, user: TwitterUserPayload, info?: any) => void,
  ): Promise<any> {
    const { username, displayName, photos } = profile;

    const user = {
      twitterId: username,
      name: displayName,
      photo: photos[0].value,
    };

    done(null, user);
  }
}
