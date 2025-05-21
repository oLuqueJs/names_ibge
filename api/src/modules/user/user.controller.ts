import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./model/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.userService.createUser(data);
  }

  @Get('profile')
  async getProfile(@CurrentUser() user) {
    return this.userService.findUser(user.id);
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