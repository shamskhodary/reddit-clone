import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from 'src/entities';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postModel: typeof Post) {}

  create(createPostDto: CreatePostDto) {
    return `Returning a new post where body =${createPostDto}`;
  }

  findAll() {
    return 'Returning all posts';
  }

  findOne(id: number) {
    return `Returning one post according to ${id}`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `Returning posts updated where id = ${id} and body =${updatePostDto}`;
  }

  delete(id: number) {
    return `Returning deleted post where id = ${id}`;
  }
  // find all posts of a specific topic/category
  findTopicPosts(id: number) {
    return `Returning all posts where topicId = ${id}`;
  }
}
