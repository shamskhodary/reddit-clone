import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Save } from 'src/entities';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';

@Module({
  imports: [SequelizeModule.forFeature([Save])],
  controllers: [SaveController],
  providers: [SaveService],
})
export class SaveModule {}
