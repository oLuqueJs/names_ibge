import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IbgeService } from './ibge.service';
import { IbgeController } from './ibge.controller';

@Module({
  imports: [HttpModule],
  exports: [],
  providers: [IbgeService],
  controllers: [IbgeController],
})
export class IbgeModule {}
