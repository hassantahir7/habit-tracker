import { PartialType } from '@nestjs/swagger';
import { CreateTopicsDto } from './create-topic.dto';

export class UpdateTopicDto extends PartialType(CreateTopicsDto) {}
