import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private configService: ConfigService,
  ) {}

  async signup(dto: SignUpDto): Promise<SignUpDto> {
    return dto;
  }
  async signin(dto: SignInDto): Promise<SignInDto> {
    return dto;
  }
  //create new user
  //sign in user
}
