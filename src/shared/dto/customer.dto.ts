import {IsEmail, IsNotEmpty, IsObject, IsString, MaxLength} from "class-validator";

export class CustomerDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly partnerName: object;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly partnerPhone: object;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly phone: string;

    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    readonly address: string;

    @IsString()
    @MaxLength(50)
    readonly description: string;
}