import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  async getDate() {
    const data = await this.newsService.fetchDataFromAPI();

    if (data.status === 200) {
      return data.data;
    }
  }
}
