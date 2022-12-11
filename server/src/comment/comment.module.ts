import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentProvider } from './comment.provider';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentProvider],
})
export class CommentModule {}
