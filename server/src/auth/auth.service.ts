import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignInDto, SignUpDto } from 'src/dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async signup(dto: SignUpDto): Promise<SignUpDto> {
    return dto;
  }
  async signin(dto: SignInDto): Promise<SignInDto> {
    return dto;
  }
}
