import { Module } from '@nestjs/common';
import { DownVoteService } from './downvote.service';
import { UpVoteService } from './upvote.service';
import { VoteController } from './vote.controller';
import { VoteDownProvider, VoteUpProvider } from './votes.provider';

@Module({
  providers: [UpVoteService, DownVoteService, VoteUpProvider, VoteDownProvider],
  controllers: [VoteController],
})
export class VoteModule {}
