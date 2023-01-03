import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post, User, Comment } from 'src/entities';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postModel: typeof Post) {}

  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const addPost = await this.postModel.create({
      ...createPostDto,
      userId,
    });
    return addPost;
  }

  async findAll(): Promise<Post[]> {
    const allPosts = await this.postModel.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id'],
        },
      ],
    });

    return allPosts;
  }

  async findOne(postId: number): Promise<Post> {
    const post = await this.postModel.findOne(
      {
        subQuery: false,
        where: { id: postId },
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt'],
            },
          },
          {
            model: Comment,
            as: 'comments',
            attributes: ['id'],
          },
        ],
      },
      //     attributes: [
      //       [
      //         this.postModel.sequelize.fn(
      //           'count',
      //           this.postModel.sequelize.col('comments.id'),
      //         ),
      //         'commentLength',
      //       ],
      //     ],
      //   },
      // ],
      // group: ['Post.id', 'User.id'],
    );

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

  async updateTime(id: number, createdAt: string) {
    const [row, [updated]] = await this.postModel.update(
      { createdAt },
      { where: { id }, returning: true },
    );

    return updated;
  }
}
//npm install --save @nestjs/platform-express multer
//npm i -D @types/multer
