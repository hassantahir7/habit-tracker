import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserQuotationResponseDto {
  @ApiProperty({
    example: "c214f875-11a5-4d0f-be21-63759b59411e",
    description: 'The ID of the user responding to the quotation',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'The ID of the quotation that the response is related to',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  quotationId: string;

  @ApiProperty({
    description: 'The response text or details given by the user regarding the quotation',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  response: string;

}
