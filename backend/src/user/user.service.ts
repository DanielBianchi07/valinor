import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(registerAuthDto: RegisterAuthDto) {
    const user = new User();

    user.email = registerAuthDto.email;
    user.firstName = registerAuthDto.firstName;
    user.lastName = registerAuthDto.lastName;
    user.password = registerAuthDto.password;

    return this.userRepository.save(user);
  }

  findAllBoardsByUserId(userId: number) {
    return this.userRepository.find({
        where: {
          boards: { 
            users: {id: userId},
        }
      }
    });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async isConnectedToBoard(id: number, boardId?: number) {
    const user = await this.userRepository.findOne({ where: {
        id,
        boards: {
          id: boardId
        }
      },
      relations: ['boards']
    });

    if(!user) {
      throw new Error(`User with id ${id} is not connected to board with id ${boardId}`);
    }

    return true;
  }

  update(updateUserDto: UpdateUserDto, userId: number) {
    return this.userRepository.update(userId, {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
    });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async isConnectedToSwimlane(id: number, swimlaneId?: number) {
    const user = await this.userRepository.findOne({ where: {
        id,
        boards: {
          swimlanes: { id: swimlaneId }
        }
      },
      relations: ['boards', 'boards.swimlanes']
    });

    if(!user) {
      throw new Error(`User is not connected to board`);
    }

    return true;
  }
}
