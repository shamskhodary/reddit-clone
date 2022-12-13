import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Post } from './post.entity';

@Table
export class Topic extends Model<Topic> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Post, { onDelete: 'CASCADE' })
  posts: Post[];
}
