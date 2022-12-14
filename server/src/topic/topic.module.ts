import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Topic } from 'src/entities';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
  imports: [SequelizeModule.forFeature([Topic])],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
