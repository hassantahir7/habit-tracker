import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTopicResponseService } from './user-topic-response.service';
import { CreateUserTopicResponseDto } from './dto/create-user-topic-response.dto';
import { UpdateUserTopicResponseDto } from './dto/update-user-topic-response.dto';

@Controller('user-topic-response')
export class UserTopicResponseController {
  constructor(private readonly userTopicResponseService: UserTopicResponseService) {}

  @Post()
  create(@Body() createUserTopicResponseDto: CreateUserTopicResponseDto) {
    return this.userTopicResponseService.create(createUserTopicResponseDto);
  }

  @Get()
  findAll() {
    return this.userTopicResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTopicResponseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTopicResponseDto: UpdateUserTopicResponseDto) {
    return this.userTopicResponseService.update(id, updateUserTopicResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTopicResponseService.remove(id);
  }
}
