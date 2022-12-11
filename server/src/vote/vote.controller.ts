import { Controller } from '@nestjs/common';
import { DownVoteService } from './downvote.service';
import { UpVoteService } from './upvote.service';

@Controller('vote')
export class VoteController {
  constructor(
    private upvoteService: UpVoteService,
    private downvoteService: DownVoteService,
  ) {}
}
