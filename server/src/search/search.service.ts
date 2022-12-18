import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Post } from 'src/entities';

@Injectable()
export class SearchService {
  constructor(@InjectModel(Post) private postModel: typeof Post) {}
  async search(query: string): Promise<Post[]> {
    const searchQuery = `%${query}%`;
    const searchResults = await this.postModel.findAll({
      where: {
        [Op.or]: {
          title: {
            [Op.iLike]: searchQuery,
          },
          content: {
            [Op.iLike]: searchQuery,
          },
        },
      },
    });

    return searchResults;
  }
  s;
}
