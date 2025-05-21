import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const users = await this.userService.findUsers();
      const user = users.find(user => user.email === email);

      if (!user) {
        return null;
      }

      const fullUser = await this.userService.findUser(user.id);
      
      const userRepo = await this.userService['userRepository'].findOneBy({ id: user.id });
      
      if (!userRepo) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, userRepo.password);
      
      if (!isPasswordValid) {
        return null;
      }

      const { password: _, ...result } = userRepo;
      return result;
    } catch (error) {
      throw new HttpException(
        error?.message || 'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const payload = { email: user.email, sub: user.id };
      
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
        },
      };
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
}