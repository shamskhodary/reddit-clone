import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/entities';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TimeAgoService } from './timeAgo.service';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, TimeAgoService],
  exports: [SequelizeModule],
})
export class PostModule {}
