import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Comment, User } from 'src/entities';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment) private commentModule: typeof Comment) {}
  //[Get] post/1/comments
  async findAll(postId: number) {
    const allComments = await this.commentModule.findAll({
      where: {
        postId,
      },
      include: [
        {
          model: User,
          attributes: ['username', 'profileImg'],
        },
      ],
    });
    return allComments;
  }
  //[POST] post/1/comments
  async create(postId: number, dto: CreateCommentDto, userId: number) {
    const commentAdded = await this.commentModule.create({
      ...dto,
      userId,
      postId,
    });

    return commentAdded;
  }
  // update comment [commentId, userId]
  async update(
    postId: number,
    commentId: number,
    dto: UpdateCommentDto,
    userId: number,
  ): Promise<UpdateCommentDto> {
    const [row, [updated]] = await this.commentModule.update(
      { ...dto },
      {
        where: {
          postId,
          id: commentId,
          userId,
        },
        returning: true,
      },
    );
    return updated;
  }

  //[Get] post/1/comments/:id
  async getComment(commentId: number, postId: number, userId?: number) {
    const comment = await this.commentModule.findOne({
      where: {
        id: commentId,
        postId,
        userId,
      },
    });

    if (!comment) {
      throw new NotFoundException(`comment with id ${commentId} not found`);
    }

    return comment;
  }
  //posts/:postId/comments/:id
  async delete(
    commentId: number,
    postId: number,
    userId: number,
  ): Promise<number> {
    const isDeleted = await this.commentModule.destroy({
      where: {
        id: commentId,
        postId,
        userId,
      },
    });

    return isDeleted;
  }
}
