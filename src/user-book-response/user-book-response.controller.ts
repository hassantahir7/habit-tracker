import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserBookResponseService } from './user-book-response.service';
import { CreateUserBookResponseDto } from './dto/create-user-book-response.dto';
import { UpdateUserBookResponseDto } from './dto/update-user-book-response.dto';

@Controller('user-book-response')
export class UserBookResponseController {
  constructor(private readonly userBookResponseService: UserBookResponseService) {}

  @Post()
  create(@Body() createUserBookResponseDto: CreateUserBookResponseDto) {
    return this.userBookResponseService.create(createUserBookResponseDto);
  }

  @Get()
  findAll() {
    return this.userBookResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBookResponseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBookResponseDto: UpdateUserBookResponseDto) {
    return this.userBookResponseService.update(id, updateUserBookResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBookResponseService.remove(id);
  }
}
