import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TopicModule } from './topic/topic.module';
import { CommentModule } from './comment/comment.module';
import { SaveModule } from './save/save.module';
import { VoteModule } from './vote/vote.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PostModule,
    TopicModule,
    CommentModule,
    SaveModule,
    VoteModule,
    DatabaseModule,
  ],
})
export class AppModule {}
