import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post, User } from 'src/entities';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postModel: typeof Post) {}

  async create(
    createPostDto: CreatePostDto,
    userId: number,
    topicId: number,
  ): Promise<Post> {
    const addPost = await this.postModel.create<Post>({
      ...createPostDto,
      userId,
      topicId,
    });
    return addPost;
  }

  async findAll(topicId?: number): Promise<Post[]> {
    const whereObj: { topicId?: number } = {};
    if (topicId) {
      whereObj['topicId'] = topicId;
    }
    const allPosts = await this.postModel.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
      ],
      where: whereObj,
    });

    return allPosts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postModel.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });

    return post;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    userId: number,
  ): Promise<UpdatePostDto> {
    const [row, [updated]] = await this.postModel.update(
      { ...updatePostDto },
      {
        where: { id, userId },
        returning: true,
      },
    );
    return updated;
  }

  async delete(id: number, userId: number): Promise<number> {
    const deleted = await this.postModel.destroy({ where: { id, userId } });

    return deleted;
  }
}
