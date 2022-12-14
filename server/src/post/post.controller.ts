import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { Body, Param, Query } from '@nestjs/common/decorators';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Patch(':postId')
  update(@Param('postId') postId: string, @Body() dto: UpdatePostDto) {
    return this.postService.update(+postId, dto);
  }

  @Delete(':postId')
  delete(@Param('postId') postId: string) {
    return this.postService.delete(+postId);
  }

  @Get()
  findAllTopicPosts(@Query('topicId') topicId: string) {
    return this.postService.findTopicPosts(+topicId);
  }
}
