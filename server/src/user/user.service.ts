import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findOneById(id: number): Promise<User> {
    return await this.userModel.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateUserDto): Promise<UpdateUserDto> {
    const [row, [updated]] = await this.userModel.update(
      { ...dto },
      { where: { id }, returning: true },
    );

    return updated;
  }
}
