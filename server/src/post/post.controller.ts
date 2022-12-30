import 'intl';
import { format } from 'timeago.js';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Body, Param, Req, UseGuards } from '@nestjs/common/decorators';
import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ErrorCode } from 'src/constants';
import { Post as postEntity } from 'src/entities';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}
  @Get()
  async findAll(): Promise<postEntity[]> {
    const posts = await this.postService.findAll();
    //need to be fixed
    posts.map(async (e) => {
      const createdAt = new Date(e.createdAt);
      e.createdAt = format(createdAt);
      await this.postService.updateTime(e.id, e.createdAt);
      return e;
    });

    return posts;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<postEntity> {
    const post = await this.postService.findOne(+id);

    if (!post) throw new NotFoundException(ErrorCode.POST_NOT_FOUND);

    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() dto: CreatePostDto,
    @Req() req,
  ): Promise<{ isAdded: postEntity; message: string }> {
    const isAdded = await this.postService.create(dto, req.user.id);

    return { isAdded, message: 'post created successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':postId')
  async update(
    @Param('postId', ParseIntPipe) postId: string,
    @Body() dto: UpdatePostDto,
    @Req() req,
  ): Promise<Partial<postEntity>> {
    const updated = await this.postService.update(+postId, dto, req.user.id);

    if (!updated) throw new ForbiddenException(ErrorCode.POST_NOT_FOUND);

    return updated;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  async delete(
    @Param('postId', ParseIntPipe) postId: string,
    @Req() req,
  ): Promise<{ message: string }> {
    const isDeleted = await this.postService.delete(+postId, req.user.id);

    if (!isDeleted) throw new NotFoundException(ErrorCode.POST_NOT_FOUND);

    return { message: 'post deleted successfully' };
  }
}
