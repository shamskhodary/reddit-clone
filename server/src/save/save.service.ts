import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Save } from 'src/entities';

@Injectable()
export class SaveService {
  constructor(@InjectModel(Save) private saveModule: typeof Save) {}

  findAll() {
    return `Returning all saved posts`;
  }
  //userId from token
  findOrCreate(id: number, postId: number) {
    return `if it exists return it, otherwise create it where id =${id} and postId= ${postId} `;
  }

  delete(id: number) {
    return ` delete where ${id}`;
  }
}
