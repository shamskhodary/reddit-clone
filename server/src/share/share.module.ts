import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Share } from 'src/entities';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';

@Module({
  imports: [SequelizeModule.forFeature([Share])],
  controllers: [ShareController],
  providers: [ShareService],
})
export class ShareModule {}
