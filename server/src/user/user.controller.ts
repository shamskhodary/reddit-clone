import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  //users/:id
  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  @Patch(':id')
  updateUserInfo(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(+id, dto);
  }
}
