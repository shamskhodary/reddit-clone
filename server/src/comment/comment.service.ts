import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from 'src/entities';
import { CreateCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment) private commentModule: typeof Comment) {}
  //[Get] post/1/comments
  findAll(postId: number) {
    return `Returning all comments ${postId}`;
  }
  //[POST] post/1/comments
  // create comment on a post[postId, userId]
  create(postId:number, dto: CreateCommentDto) {
    return `Returning a new comment ${postId} with ${dto}`;
  }
  // update comment [commentId, userId]
  update(postId: number, commentId, dto: CreateCommentDto) {
    return `Returning an updated comment ${dto} where commentId = ${commentId}`;
  }
  // delete comment [commentId]
  //posts/:postId/comments/:id
  delete(postId: number, commentId:number) {
    return `deleted comment ${postId} ${commentId}`;
  }
}
