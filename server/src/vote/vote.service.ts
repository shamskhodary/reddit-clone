import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Votes } from 'src/entities';

@Injectable()
export class VotesService {
  constructor(@InjectModel(Votes) private voteModule: typeof Votes) {}
}
