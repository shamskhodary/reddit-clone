import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Topic } from 'src/entities';

@Injectable()
export class TopicService {
  constructor(@InjectModel(Topic) private topicModule: typeof Topic) {}
  // create topic/category
}
