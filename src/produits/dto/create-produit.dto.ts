import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateProduitDto {

    @ApiProperty() /* Pour swagger */
    @IsNotEmpty()
    @IsString()

    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()

    price: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()

    quantity: number

}
