import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Votes } from 'src/entities';
import { VoteController } from './vote.controller';
import { VotesService } from './vote.service';

@Module({
  imports: [SequelizeModule.forFeature([Votes])],
  providers: [VotesService],
  controllers: [VoteController],
})
export class VoteModule {}
