import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SignUpDto } from 'src/auth/dto';
import { User } from 'src/entities';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  create(dto: SignUpDto) {
    return `Returning a new user with body = ${dto}`;
  }

  findOneById(id: number) {
    return `Returning user where id = ${id}`;
  }

  findOneByUsername(username: string) {
    return `Returning user where username =${username}`;
  }

  findOneByEmail(email: string) {
    return `Returning user where username =${email}`;
  }

  update(id: number, dto: UpdateUserDto) {
    return `Returning user updated where id =${id} with body ${dto}`;
  }
}
