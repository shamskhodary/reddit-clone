import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  findAll(@Param('postId') postId: string) {
    return this.commentService.findAll(+postId);
  }

  @Post('')
  create(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    return this.commentService.create(+postId, dto);
  }

  @Patch(':commentId')
  update(@Param(':postId') postId:string, @Param('commentId') commentId: string,dto: UpdateCommentDto) {
    return this.commentService.update(+postId,+commentId, dto);
  }

  @Delete(':commentId')
  delete(@Param(':postId') postId:string, @Param('commentId') commentId: string) {
    return this.commentService.delete(+postId,+commentId);
  }
}


