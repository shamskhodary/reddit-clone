import { Controller } from '@nestjs/common';
import { SaveService } from './save.service';

@Controller('save')
export class SaveController {
  constructor(private saveService: SaveService) {}
}
