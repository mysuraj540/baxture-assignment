import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class UserDto {
    id: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsArray()
    hobbies: [];
    
}