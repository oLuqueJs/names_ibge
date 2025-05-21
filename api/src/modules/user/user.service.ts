import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './model/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    try {
      if (!data) {
        throw new HttpException('Data is missing', HttpStatus.BAD_REQUEST);
      }

      return await this.userRepository.save(data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error?.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUser(id: number): Promise<User|null> {
    try {
      if (!id) {
        throw new HttpException('ID is missing', HttpStatus.BAD_REQUEST);
      }

      return await this.userRepository.findOneBy({
        id: id,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error?.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find()
    } catch (error) {
      throw new HttpException(
        error?.message || "Internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User|null> {
    try {
      if (!id || !data) {
        throw new HttpException("ID or data is missing", HttpStatus.BAD_REQUEST)
      }

      const USER = await this.userRepository.findOneBy({ id })

      if (!USER) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND)
      }

      const UPDATED_USER = Object.assign(USER, data);

      return await this.userRepository.save(UPDATED_USER)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }

      throw new HttpException(
        error?.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      const USER = await this.userRepository.findOneBy({ id })
      if (!USER) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND)
      }

      await this.userRepository.delete(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      }

      throw new HttpException(
        error?.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}