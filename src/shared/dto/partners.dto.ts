import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class PartnersDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsNumber()
    @MaxLength(30)
    @IsNotEmpty()
    readonly phone: number
}