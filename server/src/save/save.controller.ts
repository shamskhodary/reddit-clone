import {
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ErrorCode } from 'src/constants';
import { Save } from 'src/entities';
import { Post as postEntity } from 'src/entities';
import { SaveService } from './save.service';

@Controller('')
export class SaveController {
  constructor(private saveService: SaveService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/saves')
  async findAll(@Req() req): Promise<postEntity[]> {
    const allSaved = await this.saveService.findAll(req.user.id);

    if (!req.user) throw new Error('Invalid input');

    return allSaved;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/posts/:postId/saves')
  async create(@Param('postId') postId: string, @Req() req): Promise<Save> {
    const isSaved = await this.saveService.findOrCreate(req.user.id, +postId);

    if (!req.user) throw new Error('Invalid input');

    return isSaved;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/posts/:postId/saves/:id')
  async delete(
    @Param('postId') postId: string,
    @Param('id') id: string,
    @Req() req,
  ): Promise<{ message: string }> {
    const unSaved = await this.saveService.delete(+id, req.user.id, +postId);

    if (!unSaved) throw new NotFoundException(ErrorCode.POST_NOT_FOUND);

    return { message: 'unsaved successfully' };
  }
}
