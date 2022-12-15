import { Controller } from '@nestjs/common';
import { VotesService } from './vote.service';

@Controller('votes')
export class VoteController {
  constructor(private votesService: VotesService) {}
}
