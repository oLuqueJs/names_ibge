import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class IbgeFrequencyByNameReq {
    @IsString()
    @IsNotEmpty({message: "Name is required"})
    @MinLength(2, {message: "Name must have at least 2 char of lenght."})
    @MaxLength(70, {message: "Name must have only 70 chars of lenght"})
    name: string;
}

export class IbgeFrequencyRankingReq {
    @IsNumber()
    @IsOptional()
    decade?: number;

    @IsString()
    @IsIn(['M', 'F', { message: 'Sex must be "M" or "F"' }])
    @IsOptional()
    locality?: string;

    @IsString()
    @IsOptional()
    sex?: string;
}