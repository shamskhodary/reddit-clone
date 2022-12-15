import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from 'src/entities';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
