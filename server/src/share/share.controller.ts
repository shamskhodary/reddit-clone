import {
  Controller,
  Param,
  Req,
  Get,
  Post,
  UseGuards,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ShareService } from './share.service';
import { Post as postEntity } from 'src/entities';
import { ErrorCode } from 'src/constants';
@Controller('')
export class ShareController {
  constructor(private shareService: ShareService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/posts/:postId/share')
  async share(@Param('postId', ParseIntPipe) postId: string, @Req() req) {
    const shared = await this.shareService.create(+postId, req.user.id);

    if (!req.user) throw new Error('Invalid Input');

    return shared;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/shared-posted')
  async findShared(@Req() req): Promise<postEntity[]> {
    const allPosts = await this.shareService.findAll(req.user.id);

    return allPosts;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/posts/:postId/share/:id')
  async unshare(
    @Param('id') id: string,
    @Param('postId') postId: string,
    @Req() req,
  ) {
    const deleted = await this.shareService.delete(+id, +postId, req.user.id);

    if (!deleted) throw new NotFoundException(ErrorCode.POST_NOT_FOUND);

    return {
      message: 'unshared successfully',
    };
  }
}
