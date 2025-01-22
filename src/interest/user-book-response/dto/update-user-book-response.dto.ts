import { PartialType } from '@nestjs/swagger';
import { CreateUserBookResponseDto } from './create-user-book-response.dto';

export class UpdateUserBookResponseDto extends PartialType(CreateUserBookResponseDto) {}
