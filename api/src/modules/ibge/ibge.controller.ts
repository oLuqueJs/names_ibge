import { Body, Controller, Get, Query } from "@nestjs/common";
import { IbgeService } from "./ibge.service";
import { IbgeFrequencyByNameRes, IbgeFrequencyRankingRes } from "./dto/ibge-res.dto";
import { IbgeFrequencyByNameReq, IbgeFrequencyRankingReq } from "./dto/ibge-req.dto";

@Controller('names')
export class IbgeController {
    constructor (private readonly ibgeService: IbgeService) {}

    @Get('frequency')
    async getFrequencyByName(@Query() query: IbgeFrequencyByNameReq): Promise<IbgeFrequencyByNameRes> {
        return this.ibgeService.getFrequencyByName(query)
    }

    @Get('frequency/ranking')
    async getFrequencyRanking(@Query() query: IbgeFrequencyRankingReq): Promise<IbgeFrequencyRankingRes> {
        return this.ibgeService.getFrequencyRanking(query)
    }
}