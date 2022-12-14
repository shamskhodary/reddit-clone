import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from 'src/entities';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment) private commentModule: typeof Comment) {}
  // find all comments of a specific post [postId]
  // create comment on a post[postId, userId]
  // update comment [commentId, userId]
  // delete comment [commentId]
}
