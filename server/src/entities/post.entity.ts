import {
  Table,
  Model,
  PrimaryKey,
  Column,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Comment } from './comment.entity';
import { Topic } from './topic.entity';
import { User } from './user.entity';
import { Votes } from './votes.entity';

@Table
export class Post extends Model<Post> {
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
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  postImg: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment, { onDelete: 'CASCADE' })
  comments: Comment[];

  @HasMany(() => Votes, { onDelete: 'CASCADE' })
  votes: Votes[];

  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER })
  topicId: number;

  @BelongsTo(() => Topic)
  topic: Topic;
}
