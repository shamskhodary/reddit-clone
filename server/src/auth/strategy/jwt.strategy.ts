import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ErrorCode } from 'src/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWTKEY'),
    });
  }

  async validate(payload: { sub: number }) {
    const { sub } = payload;
    const user = await this.userService.findOneById(sub);

    if (!user) throw new UnauthorizedException(ErrorCode.FORBIDDEN_ACTION);
    return user;
  }
}
