import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { Post as postEntity } from 'src/entities';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}
  @Get()
  async searchPost(
    @Query('q', new ValidationPipe({ transform: true }))
    query: string,
  ): Promise<postEntity[]> {
    const searchResults = await this.searchService.search(query);

    return searchResults;
  }
}
