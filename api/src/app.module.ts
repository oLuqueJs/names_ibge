import { Module } from "@nestjs/common";
import { IbgeModule } from "./modules/ibge/ibge.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    IbgeModule,
  ],
  exports: [],
})
export class AppModule {}