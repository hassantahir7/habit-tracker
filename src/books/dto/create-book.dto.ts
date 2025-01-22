// src/book/dto/create-book.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsJSON } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Title of the book',
    example: 'The Great Gatsby',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Author of the book',
    example: 'F. Scott Fitzgerald',
  })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({
    description: 'Genre of the book',
    example: 'Fiction',
  })
  @IsNotEmpty()
  @IsString()
  genre: string;


  @ApiPropertyOptional({
    description: 'Additional metadata in JSON format',
    example: '{"language": "English", "pages": 180}',
  })
  @IsOptional()
  @IsJSON()
  metadata?: string;
}
