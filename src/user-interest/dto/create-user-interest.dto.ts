import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInterestDto {
  @ApiProperty({
    example: 'c214f875-11a5-4d0f-be21-63759b59411e',
    description: 'The ID of the user responding to the book',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
