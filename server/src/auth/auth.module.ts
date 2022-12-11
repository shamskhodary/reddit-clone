import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
