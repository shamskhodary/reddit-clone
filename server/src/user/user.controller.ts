import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
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
