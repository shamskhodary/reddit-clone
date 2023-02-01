import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Req,
  UseGuards,
  ParseIntPipe,
  NotFoundException,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@Controller('/posts/:postId/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  async findAll(@Param('postId', ParseIntPipe) postId: string) {
    const allComments = await this.commentService.findAll(+postId);

    return allComments;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Param('postId', ParseIntPipe) postId: string,
    @Body() dto: CreateCommentDto,
    @Req() req,
  ) {
    const comment = await this.commentService.create(+postId, dto, req.user.id);

    if (!comment) throw new NotFoundException('something went wrong');

    return comment;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':commentId')
  async update(
    @Param('postId', ParseIntPipe) postId: string,
    @Param('commentId', ParseIntPipe) commentId: string,
    @Body() dto: UpdateCommentDto,
    @Req() req,
  ) {
    const comment = await this.commentService.getComment(
      +commentId,
      +postId,
      req.user.id,
    );

    if (comment.userId !== req.user.id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const updated = await this.commentService.update(
      +postId,
      +commentId,
      dto,
      req.user.id,
    );

    if (!updated) throw new NotFoundException('This comment does not exist');

    return updated;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  async delete(
    @Param('commentId', ParseIntPipe) commentId: string,
    @Param('postId', ParseIntPipe) postId: string,
    @Req() req,
  ) {
    const comment = await this.commentService.getComment(
      +commentId,
      +postId,
      req.user.id,
    );

    if (comment.userId !== req.user.id) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const deleted = await this.commentService.delete(
      +commentId,
      +postId,
      req.user.id,
    );

    if (!deleted) throw new NotFoundException('This comment does not exist');

    return { message: 'comment deleted successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/count')
  async allComments(
    @Param('postId', ParseIntPipe) postId: string,
    @Req() req,
  ): Promise<number> {
    const count = await this.commentService.countComments(+postId, req.user.id);

    return count;
  }
}
