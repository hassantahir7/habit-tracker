// src/topics/dto/create-topics.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicsDto {
  @ApiProperty({ description: 'Content of the topic', example: 'Artificial Intelligence' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: 'Genre of the topic', example: 'Technology' })
  @IsNotEmpty()
  @IsString()
  genre: string;
}
