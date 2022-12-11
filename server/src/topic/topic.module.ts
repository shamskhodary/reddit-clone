import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TopicProvider } from './topic.provider';

@Module({
  controllers: [TopicController],
  providers: [TopicService, TopicProvider],
})
export class TopicModule {}
