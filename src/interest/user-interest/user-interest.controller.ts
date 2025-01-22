import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserInterestService } from './user-interest.service';
import { CreateUserInterestDto } from './dto/create-user-interest.dto';
import { UpdateUserInterestDto } from './dto/update-user-interest.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('user-interest')
export class UserInterestController {
  constructor(private readonly userInterestService: UserInterestService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req) {
    return this.userInterestService.create(req.user.id || req.user.userId);
  }

  @Get()
  findAll() {
    return this.userInterestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userInterestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserInterestDto: UpdateUserInterestDto) {
    return this.userInterestService.update(+id, updateUserInterestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userInterestService.remove(+id);
  }
}
