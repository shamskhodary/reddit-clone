import {
  Controller,
  Param,
  Post,
  Get,
  Delete,
  Req,
  UseGuards,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ErrorCode } from 'src/constants';
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
  async create(
    @Param('postId', ParseIntPipe) postId: string,
    @Req() req,
  ): Promise<string> {
    const saved = await this.saveService.findOrCreate(req.user.id, +postId);

    if (saved) {
      await this.saveService.updateSaved(+postId, req.user.id, true);
    }

    if (!req.user) throw new Error('Invalid input');

    return 'post is saved successfully';
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/posts/:postId/saves/:id')
  async delete(
    @Param('postId', ParseIntPipe) postId: string,
    @Param('id', ParseIntPipe) id: string,
    @Req() req,
  ): Promise<{ message: string }> {
    const unSaved = await this.saveService.delete(+id, req.user.id, +postId);
    if (!unSaved) throw new NotFoundException(ErrorCode.POST_NOT_FOUND);

    if (unSaved) {
      await this.saveService.updateSaved(+postId, req.user.id, false);
    }

    return { message: 'unsaved successfully' };
  }
}
