import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { SwimlaneService } from './swimlane.service';
import { CreateSwimlaneDto } from './dto/create-swimlane.dto';
import { UpdateSwimlaneDto } from './dto/update-swimlane.dto';
import * as authGuard from 'src/auth/auth/auth.guard';
import { ReorderSwimlaneDto } from './dto/reorder-swimlane.dto';

@Controller('swimlane')
export class SwimlaneController {
  constructor(private readonly swimlaneService: SwimlaneService) {}

  @Post()
  @UseGuards(authGuard.AuthGuard)
  create(@Body() createSwimlaneDto: CreateSwimlaneDto, @Request() req: authGuard.PayloadRequest) {
    return this.swimlaneService.create(createSwimlaneDto, req.user.id);
  }

  @Put('update-order')
  @UseGuards(authGuard.AuthGuard)
  updateOrder(@Body() reorderSwimlaneDto: ReorderSwimlaneDto, @Request() req: authGuard.PayloadRequest) {
    return this.swimlaneService.updateSwimlaneOrders(reorderSwimlaneDto, req.user.id);
  }

  @Get('/board/:boardId')
  @UseGuards(authGuard.AuthGuard)
  findAll(@Param('boardId') boardId: string, @Request() req: authGuard.PayloadRequest) {
    return this.swimlaneService.findAllByBoardId(Number(boardId), req.user.id);
  }

  @Patch(':id')
  @UseGuards(authGuard.AuthGuard)
  update(@Param('id') id: string, @Body() updateSwimlaneDto: UpdateSwimlaneDto, @Request() req: authGuard.PayloadRequest) {
    return this.swimlaneService.update(+id, updateSwimlaneDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(authGuard.AuthGuard)
  remove(@Param('id') id: string, @Request() req: authGuard.PayloadRequest) {
    return this.swimlaneService.remove(+id, req.user.id);
  }
}
