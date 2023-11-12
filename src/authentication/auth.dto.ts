import { IsString, Length } from "class-validator";
import { AddressDto, CompanyDto } from "src/user/user.dto";

export class LoginDto {
    @IsString()
    @Length(4,10)
    username: string;

    @IsString()
    @Length(6,12)
    password: string;
}

export class RegisterDto {
    @IsString()
    @Length(4,10)
    username: string;

    @IsString()
    @Length(6,12)
    password: string;

    name: string;
    email: string;
    address: AddressDto;
    phone: string;
    website: string;
    company: CompanyDto;
}