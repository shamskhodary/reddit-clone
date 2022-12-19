import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Save } from 'src/entities';
import { Post } from 'src/entities';

@Injectable()
export class SaveService {
  constructor(@InjectModel(Save) private saveModule: typeof Save) {}

  async findAll(userId: number): Promise<Post[]> {
    const allSaved = await this.saveModule.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Post,
          as: 'post',
        },
      ],
    });

    const posts = allSaved.map((e) => e.post);

    return posts;
  }

  async findOrCreate(userId: number, postId: number): Promise<Save> {
    const [saved, created] = await this.saveModule.findOrCreate({
      where: {
        userId,
        postId,
      },
    });

    return saved;
  }

  async delete(id: number, userId: number, postId: number): Promise<number> {
    const deleted = await this.saveModule.destroy({
      where: {
        id,
        userId,
        postId,
      },
    });

    return deleted;
  }
}
