import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Save, User } from 'src/entities';
import { Post } from 'src/entities';

@Injectable()
export class SaveService {
  constructor(
    @InjectModel(Save) private saveModule: typeof Save,
    @InjectModel(Post) private postModule: typeof Post,
  ) {}

  async findAll(userId: number): Promise<object> {
    const allSaved = await this.saveModule.findAll({
      where: {
        userId,
      },
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Post,
          as: 'post',
        },
      ],
    });

    return allSaved.map((e) => ({
      posts: e.post,
      data: e.user.username,
    }));
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

  async updateSaved(id: number, userId: number, val: boolean): Promise<Post> {
    const [row, [updated]] = await this.postModule.update(
      { saved: val },
      {
        where: {
          id,
          userId,
        },
        returning: true,
      },
    );

    return updated;
  }
}
