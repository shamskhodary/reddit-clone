import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { Save } from './save.entity';
import { Votes } from './votes.entity';

@Table
export class User extends Model<User> {
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
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  age: Date;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female', 'other'],
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue:
      'https://external-preview.redd.it/5kh5OreeLd85QsqYO1Xz_4XSLYwZntfjqou-8fyBFoE.png?auto=webp&s=dbdabd04c399ce9c761ff899f5d38656d1de87c2',
  })
  profileImg?: string;

  @HasMany(() => Post, { onDelete: 'CASCADE' })
  posts: Post[];

  @HasMany(() => Comment, { onDelete: 'CASCADE' })
  comments: Comment[];

  @HasMany(() => Save, { onDelete: 'CASCADE' })
  saves: Save[];

  @HasMany(() => Votes, { onDelete: 'CASCADE' })
  votes: Votes[];
}
