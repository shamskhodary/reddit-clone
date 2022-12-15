import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { User } from 'src/entities';
@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
