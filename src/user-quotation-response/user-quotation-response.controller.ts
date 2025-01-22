import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserQuotationResponseService } from './user-quotation-response.service';
import { CreateUserQuotationResponseDto } from './dto/create-user-quotation-response.dto';
import { UpdateUserQuotationResponseDto } from './dto/update-user-quotation-response.dto';

@Controller('user-quotation-response')
export class UserQuotationResponseController {
  constructor(private readonly userQuotationResponseService: UserQuotationResponseService) {}

  @Post()
  create(@Body() createUserQuotationResponseDto: CreateUserQuotationResponseDto) {
    return this.userQuotationResponseService.create(createUserQuotationResponseDto);
  }

  @Get()
  findAll() {
    return this.userQuotationResponseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userQuotationResponseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserQuotationResponseDto: UpdateUserQuotationResponseDto) {
    return this.userQuotationResponseService.update(id, updateUserQuotationResponseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userQuotationResponseService.remove(id);
  }
}
