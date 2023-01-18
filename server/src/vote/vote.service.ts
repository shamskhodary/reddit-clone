import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Votes } from 'src/entities';

@Injectable()
export class VotesService {
  constructor(@InjectModel(Votes) private voteModule: typeof Votes) {}

  //find one, if it exists return it, else create it
  async findOne(postId: number, userId: number): Promise<Votes> {
    const isVoted = await this.voteModule.findOne({
      where: {
        postId,
        userId,
      },
    });

    return isVoted;
  }

  async create(
    postId: number,
    userId: number,
    status: boolean,
  ): Promise<Votes> {
    const vote = await this.voteModule.create({ postId, userId, status });

    return vote;
  }

  //remove vote
  async remove(postId: number, userId: number, id: number) {
    const removed = await this.voteModule.destroy({
      where: {
        postId,
        userId,
        id,
      },
    });

    return removed;
  }
  //count votes
  async countVotes(postId: number, status: boolean): Promise<number> {
    const votesByStatus = await this.voteModule.count({
      where: {
        postId,
        status,
      },
    });

    return votesByStatus;
  }
}
