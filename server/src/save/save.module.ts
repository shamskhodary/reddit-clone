import { Module } from '@nestjs/common';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';
import { SaveProvider } from './save.provider';

@Module({
  controllers: [SaveController],
  providers: [SaveService, SaveProvider],
})
export class SaveModule {}
