import { Table, Model } from 'sequelize-typescript';

@Table
export class Post extends Model<Post> {}
