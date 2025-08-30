import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';
import { SwimlaneService } from 'src/swimlane/swimlane.service';
import { UserService } from 'src/user/user.service';
import { ReorderedCardDto } from 'src/card/dto/reorder-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private swimlaneService: SwimlaneService,
    private userService: UserService,
  ) {}

  async create(createCardDto: CreateCardDto, userId: number) {
    const card = new Card();
    card.name = createCardDto.name;
    card.content = createCardDto.content;
    card.order = createCardDto.order;
    card.assigneId = createCardDto.assigneId;

    const hasAccessToSwimlane = await this.swimlaneService.hasAccessToSwimlane(
      createCardDto.swimlaneId, 
      userId
    );

    if(!hasAccessToSwimlane) {
      throw new UnauthorizedException(`You are not a part of this board.`);
    }

    return this.cardRepository.save(createCardDto);
  }

  async updateCardOrdersAndSwimlanes(
    reorder: ReorderedCardDto,
    userId: number,
  ) {
    await this.userService.isConnectedToBoard(userId, reorder.boardId);

    const promises = reorder.cards.map((card) => 
      this.cardRepository.update(card.id, {
        order: card.order,
        swimlaneId: card.swimlaneId,
      }),
    );

    await Promise.all(promises);

    return true;
  }
  
  async update(id: number, updateCardDto: UpdateCardDto, userId: number) {
    await this.userService.isConnectedToSwimlane(userId, updateCardDto.swimlaneId)
    return this.cardRepository.update(id, {
      name: updateCardDto.name,
      content: updateCardDto.content,
      });
    }

  remove(id: number, userId: number) {
    return this.cardRepository.delete(
      {
        id, 
        swimlane: {
          board: {
            users: {
              id: userId,
            },
          },
        },
      },
    );
  }
}
