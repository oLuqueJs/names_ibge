import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./model/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.userService.createUser(data);
  }

  @Get(':id')
  async findUser(@Param('id') id: string): Promise<Omit<User,'password'>|null> {
    return this.userService.findUser(+id);
  }

  @Get()
  async findUsers(): Promise<Omit<User, 'password'>[]> {
    return this.userService.findUsers();
  }

  @Patch()
  async updateUser(@Body() id: number, data: UpdateUserDto): Promise<Omit<User, 'password'>|null> {
    return this.userService.updateUser(id, data);
  }

  @Delete('id')
  async deleteUser(@Param() id: string): Promise<void> {
    this.userService.deleteUser(+id);
  }
}