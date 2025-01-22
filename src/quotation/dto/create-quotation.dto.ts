// src/quotation/dto/create-quotation.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuotationDto {
  @ApiProperty({ description: 'Content of the quotation', example: 'To be or not to be' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: 'Genre of the quotation', example: 'Philosophy' })
  @IsNotEmpty()
  @IsString()
  genre: string;
}
