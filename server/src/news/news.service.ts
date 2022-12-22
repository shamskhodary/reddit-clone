import { HttpService } from '@nestjs/axios';
import { Injectable, Inject } from '@nestjs/common';
import { AXIOS_INSTANCE_TOKEN } from 'src/constants';

@Injectable()
export class NewsService {
  constructor(@Inject(AXIOS_INSTANCE_TOKEN) private httpService: HttpService) {}

  async fetchDataFromAPI(): Promise<any> {
    const response = await this.httpService.get(
      'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=e3d21577f6c8438b904f90c6837f0131',
      {
        headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
      },
    );

    return response;
  }
}
