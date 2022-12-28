import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post, Share } from 'src/entities';
import { PostService } from 'src/post/post.service';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';

@Module({
  imports: [SequelizeModule.forFeature([Share, Post])],
  controllers: [ShareController],
  providers: [ShareService, PostService],
})
export class ShareModule {}
