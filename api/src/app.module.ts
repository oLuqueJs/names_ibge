import { Module } from '@nestjs/common';
import { IbgeModule } from './modules/ibge/ibge.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IbgeModule,
    DatabaseModule,
    UserModule,
  ],
  exports: [],
})
export class AppModule {}
