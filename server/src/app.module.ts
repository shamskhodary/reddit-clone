import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TopicModule } from './topic/topic.module';
import { CommentModule } from './comment/comment.module';
import { SaveModule } from './save/save.module';
import { VoteModule } from './vote/vote.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import config from './database/database.provider';
@Module({
  imports: [
    SequelizeModule.forRoot({
      ...config,
      sync: { force: false },
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PostModule,
    TopicModule,
    CommentModule,
    SaveModule,
    VoteModule,
  ],
})
export class AppModule {}
