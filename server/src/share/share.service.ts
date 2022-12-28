import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Post, Share } from 'src/entities';

@Injectable()
export class ShareService {
  constructor(
    @InjectModel(Share) private shareModule: typeof Share,
    @InjectModel(Post) private postModule: typeof Post,
  ) {}

  async create(postId: number, userId: number): Promise<any> {
    const share = await this.shareModule.create({ postId, userId });

    return share;
  }

  //find all my posts or the shared ones
  async findAll(userId: number): Promise<any> {
    const sharedPostId = await this.shareModule.findAll({
      where: {
        userId,
      },
    });

    const ids = sharedPostId.map((e) => e.postId);

    const allPosts = await this.postModule.findAll({
      where: {
        [Op.or]: [{ userId }, { id: ids.map((e) => +e) }],
      },
    });

    return allPosts;
  }

  //unshare
  //Todo
}
