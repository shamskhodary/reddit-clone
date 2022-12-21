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

  async update(status: boolean, postId: number): Promise<Votes> {
    const [row, [updated]] = await this.voteModule.update(
      { status },
      {
        where: {
          postId,
        },
        returning: true,
      },
    );

    return updated;
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
