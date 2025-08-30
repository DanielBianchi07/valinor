import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSwimlaneDto } from './dto/create-swimlane.dto';
import { UpdateSwimlaneDto } from './dto/update-swimlane.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Swimlane } from './entities/swimlane.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ReorderSwimlaneDto } from './dto/reorder-swimlane.dto';

@Injectable()
export class SwimlaneService {
  constructor(
    @InjectRepository(Swimlane)
    private swimlaneRepository: Repository<Swimlane>,
    private userService: UserService,
  ) {}

  async create(createSwimlaneDto: CreateSwimlaneDto, userId: number) {
    const swimlane = new Swimlane();
    swimlane.name = createSwimlaneDto.name;
    swimlane.order = createSwimlaneDto.order;
    swimlane.boardId = createSwimlaneDto.boardId;

    await this.userService.isConnectedToBoard(userId, swimlane.boardId);
    return this.swimlaneRepository.save(swimlane);
  }

  async hasAccessToSwimlane(swimlaneId: number, userId: number) {
    const hasAccess = await this.swimlaneRepository.count({
      where: {
        id: swimlaneId,
        board: {
          users: {
            id: userId,
          },
        },
      }
    })

    return hasAccess > 0;
  }

  findAllByBoardId(boardId: number, userId: number) {
    return this.swimlaneRepository.find({
      where: { boardId, board: { users: { id: userId } } },
    });
  }

  async update(id: number, updateSwimlaneDto: UpdateSwimlaneDto, userId: number) {
    await this.userService.isConnectedToBoard(userId, updateSwimlaneDto.boardId);
    return this.swimlaneRepository.update({
      id, 
      board: { users: { id: userId } }
    }, {
      name: updateSwimlaneDto.name,
      order: updateSwimlaneDto.order
    });
  }

  // JWT Guard to block id user is not a part of the board
  async remove(id: number, userId: number) {
    await this.userService.isConnectedToSwimlane(userId, id);
    return this.swimlaneRepository.delete(id);
  }

  async updateSwimlaneOrders(reorder: ReorderSwimlaneDto, userId: number) {
    await this.userService.isConnectedToBoard(userId, reorder.boardId)

    const promises = reorder.item.map((swimlane) => this.swimlaneRepository.update(swimlane.id, { order: swimlane.order }))

    await Promise.all(promises);

    return true;
  }

}

