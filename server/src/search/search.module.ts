import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/entities';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
