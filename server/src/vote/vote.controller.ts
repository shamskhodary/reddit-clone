import { Controller, ParseIntPipe } from '@nestjs/common';
import { UseGuards, Param, Req, Post, Get } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Votes } from 'src/entities';
import { VotesService } from './vote.service';

@Controller('/posts/:postId')
export class VoteController {
  constructor(private votesService: VotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('votes/up')
  async voteUp(
    @Param('postId', ParseIntPipe) postId: string,
    @Req() req,
  ): Promise<Votes> {
    const voteUp = await this.votesService.findOne(+postId, req.user.id);

    if (voteUp) {
      await this.votesService.remove(+postId, req.user.id, voteUp.id);
    } else {
      const newVote = await this.votesService.create(
        +postId,
        req.user.id,
        true,
      );
      return newVote;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('votes/down')
  async voteDown(
    @Param('postId', ParseIntPipe) postId: string,
    @Req() req,
  ): Promise<Votes> {
    const voteDown = await this.votesService.findOne(+postId, req.user.id);

    if (voteDown) {
      await this.votesService.remove(+postId, req.user.id, voteDown.id);
    } else {
      const newVote = await this.votesService.create(
        +postId,
        req.user.id,
        false,
      );
      return newVote;
    }
  }

  @Get('votes/true')
  async countUpVotes(@Param('postId', ParseIntPipe) postId: string) {
    const countTrue = await this.votesService.countVotes(+postId, true);
    console.log(countTrue);
    return countTrue;
  }

  @Get('votes/false')
  async countDownVotes(@Param('postId', ParseIntPipe) postId: string) {
    const countFalse = await this.votesService.countVotes(+postId, false);

    return countFalse;
  }

  @Get('votes/total')
  async total(@Param('postId', ParseIntPipe) postId: string): Promise<number> {
    const countUpvote = await this.votesService.countVotes(+postId, true);
    const countDownvote = await this.votesService.countVotes(+postId, false);

    const result = countUpvote - countDownvote;
    return result;
  }
}
