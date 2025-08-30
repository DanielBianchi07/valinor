import { Controller, Get, Body, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as authGuard from 'src/auth/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/board/:boardId')
  @UseGuards(authGuard.AuthGuard)
  findAll(@Request() req: authGuard.PayloadRequest) {
    return this.userService.findAllBoardsByUserId(req.user.id);
  }

  @Get()
  @UseGuards(authGuard.AuthGuard)
  findOne(@Request() req: authGuard.PayloadRequest) {
    return this.userService.findOne(req.user.id);
  }

  @Patch()
  @UseGuards(authGuard.AuthGuard)
  update(@Body() updateUserDto: UpdateUserDto, @Request() req: authGuard.PayloadRequest) {
    return this.userService.update(updateUserDto, req.user.id);
  }

  @Delete()
  @UseGuards(authGuard.AuthGuard)
  remove(@Request() req: authGuard.PayloadRequest) {
    return this.userService.remove(req.user.id);
  }
}
