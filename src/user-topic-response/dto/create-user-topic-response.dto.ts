import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserTopicResponseDto {
  @ApiProperty({
    example: "c214f875-11a5-4d0f-be21-63759b59411e",
    description: 'The ID of the user responding to the topic',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The ID of the topic that the response is related to',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  topicId: string;

  @ApiProperty({
    description: 'The response text or details given by the user regarding the topic',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  response: string;
}
