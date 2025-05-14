import { HttpService } from "@nestjs/axios";
import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, RequestTimeoutException } from "@nestjs/common";
import { IbgeFrequencyByNameReq, IbgeFrequencyRankingReq } from "./dto/ibge-req.dto";
import { IbgeFrequencyByNameRes, IbgeFrequencyRankingRes } from "./dto/ibge-res.dto";
import { firstValueFrom } from "rxjs";

@Injectable() 
export class IbgeService {
    constructor(
        private readonly httpService: HttpService
    ) {}

    private BASE_API_URL = `${process.env.API_URL}/v2/censos`;

    async getFrequencyByName(data: IbgeFrequencyByNameReq): Promise<IbgeFrequencyByNameRes> {
        try {
            if (!data.name) {
                throw new BadRequestException("Name is required");
            }

            const API_URL = `${this.BASE_API_URL}/nomes/${data.name}`;
            const RESPONSE = await firstValueFrom(
                this.httpService.get(API_URL)
            );

            return RESPONSE.data.map(item => ({
                name: item.nome,
                locality: item.localidade,
                sex: item.sexo,
                res: item.res.map(period => ({
                    period: period.periodo,
                    frequency: period.frequencia.toString(),
                })),
            }));

        } catch (error) {
            throw new InternalServerErrorException("Failed to fetch data from IBGE API: "+error.message);
        }
    }

    async getFrequencyRanking(data: IbgeFrequencyRankingReq): Promise<any> {
        try {    
            let API_URL = `${this.BASE_API_URL}/nomes/ranking`;
            const QUERY_PARAMS: string[] = []

            if (data.decade !== undefined) {
                QUERY_PARAMS.push(`decada=${data.decade}`);
            }

            if (data.locality !== undefined) {
                QUERY_PARAMS.push(`localidade=${data.locality}`);
            }

            if (data.sex !== undefined) {
                QUERY_PARAMS.push(`sexo=${data.sex}`);
            }

            if (QUERY_PARAMS.length > 0) {
                API_URL += (`?${QUERY_PARAMS.join('&')}`);
            }

            const RESPONSE = await  firstValueFrom(
                this.httpService.get(API_URL)
            );

            return RESPONSE.data.map(item => ({
                locality: item.localidade,
                sex: item.sexo,
                res: item.res.map(period => ({
                    name: period.nome,
                    frequency: period.frequencia,
                    ranking: period.ranking
                }))
            }))

        } catch(error) {
            throw new InternalServerErrorException
        }
    }
}