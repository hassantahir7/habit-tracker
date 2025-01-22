import { PartialType } from '@nestjs/swagger';
import { CreateUserQuotationResponseDto } from './create-user-quotation-response.dto';

export class UpdateUserQuotationResponseDto extends PartialType(CreateUserQuotationResponseDto) {}
