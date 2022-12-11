import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { VoteDownProvider, VoteUpProvider } from './votes.provider';

@Module({
  providers: [VoteService, VoteUpProvider, VoteDownProvider],
  controllers: [VoteController],
})
export class VoteModule {}
