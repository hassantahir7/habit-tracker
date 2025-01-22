import { PartialType } from '@nestjs/swagger';
import { CreateUserTopicResponseDto } from './create-user-topic-response.dto';

export class UpdateUserTopicResponseDto extends PartialType(CreateUserTopicResponseDto) {}
