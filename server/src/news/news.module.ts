import { Module } from '@nestjs/common';
import Axios from 'axios';
import { NewsController } from './news.controller';
import { HttpModule } from '@nestjs/axios';
import { AXIOS_INSTANCE_TOKEN } from 'src/constants';
import { NewsService } from './news.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [NewsController],
  providers: [
    NewsService,
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: Axios,
    },
  ],
})
export class NewsModule {}
