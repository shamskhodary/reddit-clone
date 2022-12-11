import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProvider } from './user.provider';

@Module({
  providers: [UserService, UserProvider],
  controllers: [UserController],
})
export class UserModule {}
