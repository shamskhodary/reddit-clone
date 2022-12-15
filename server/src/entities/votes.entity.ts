import {
  Table,
  Model,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Post } from './post.entity';
import { User } from './user.entity';

@Table
export class Votes extends Model<Votes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id?: number;

  //This row will be created once the user clicks on vote either up or down
  @Column({ type: DataType.BOOLEAN })
  status: boolean;

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER })
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
