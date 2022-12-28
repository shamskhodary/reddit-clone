import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { getUser } from 'src/auth/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/entities';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  myAccount(@Req() req) {
    return req.user;
  }

  //users/:id
  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findOneById(+id);
  }

  @Put(':id')
  updateUserInfo(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(+id, dto);
  }
}
