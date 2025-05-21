import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '../../common/database/database.module';
import { UserController } from './user.controller';
import { UserProviders } from './provider/user.provider';

@Module({
  imports: [DatabaseModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [
    UserService,
    ...UserProviders
  ],
})
export class UserModule {}
