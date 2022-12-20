import {
  Table,
  Model,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import { Post } from './post.entity';
import { User } from './user.entity';

@Table
export class Share extends Model<Share> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id?: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column({ type: DataType.INTEGER })
  postId: number;

  @BelongsTo(() => Post)
  post: Post;
}
