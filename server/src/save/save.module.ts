import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post, Save } from 'src/entities';
import { PostService } from 'src/post/post.service';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';

@Module({
  imports: [SequelizeModule.forFeature([Save, Post])],
  controllers: [SaveController],
  providers: [SaveService, PostService],
})
export class SaveModule {}
