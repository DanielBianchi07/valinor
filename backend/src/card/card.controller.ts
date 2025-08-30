import { Controller, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import * as authGuard from 'src/auth/auth/auth.guard';
import { ReorderedCardDto } from './dto/reorder-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UseGuards(authGuard.AuthGuard)
  create(@Body() createCardDto: CreateCardDto, @Request() req: authGuard.PayloadRequest) {
    return this.cardService.create(createCardDto, req.user.id);
  }

  @Put('update-order')
  @UseGuards(authGuard.AuthGuard)
  updateOrder(
    @Body() reorderedCardDto: ReorderedCardDto, 
    @Request() req: authGuard.PayloadRequest
  ) {
    return this.cardService.updateCardOrdersAndSwimlanes(
      reorderedCardDto, 
      req.user.id
    );
  }


  @Patch(':id')
  @UseGuards(authGuard.AuthGuard)
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto, @Request() req: authGuard.PayloadRequest) {
    return this.cardService.update(+id, updateCardDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(authGuard.AuthGuard)
  remove(@Param('id') id: string, @Request() req: authGuard.PayloadRequest) {
    return this.cardService.remove(+id, req.user.id);
  }
}
