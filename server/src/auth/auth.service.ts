import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities';
import { SignInDto, SignUpDto } from './dto';
import { ErrorCode } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(
    dto: SignUpDto,
  ): Promise<{ token: string | Buffer; message: string; user: User }> {
    try {
      const userExists = await this.userModel.findOne({
        where: {
          username: dto.username,
        },
      });

      if (userExists) {
        throw new HttpException(
          `The username ${dto.username} is used before`,
          HttpStatus.CONFLICT,
        );
      }

      const hash = await bcrypt.hash(dto.password, 10);
      const newUser = await this.userModel.create({ ...dto, password: hash });

      newUser.password = '';
      const token = await this.generateToken(newUser);

      return { token, message: 'Signed up successfully', user: newUser };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new HttpException(
          `This ${error.errors[0].path} already exists`,
          HttpStatus.CONFLICT,
        );
      } else if (error.name === 'HttpException') {
        throw new HttpException(error.response, HttpStatus.CONFLICT);
      } else {
        throw new HttpException(
          ErrorCode.INTERNAL_SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async signin(
    dto: SignInDto,
  ): Promise<{ token: string | Buffer; message: string; user: User }> {
    try {
      const user = await this.userModel.findOne({
        where: { email: dto.email },
      });
      if (!user) throw new ForbiddenException(ErrorCode.USER_NOT_FOUND);

      const isPasswordMatched = await bcrypt.compare(
        dto.password,
        user.password,
      );
      if (!isPasswordMatched)
        throw new ForbiddenException(ErrorCode.INCORRECT_PASSWORD);

      const token = await this.generateToken(user);

      return { token, message: 'Signed in successfully', user };
    } catch (error) {
      return { token: null, message: error.message, user: null };
    }
  }

  private async generateToken(user: User): Promise<string | Buffer> {
    const payload = { sub: user.id, email: user.email };
    const secret = this.config.get('JWTKEY');
    const token = await this.jwt.sign(payload, { secret });

    return token;
  }
}
