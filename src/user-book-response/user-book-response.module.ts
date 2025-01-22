import { Module } from '@nestjs/common';
import { UserBookResponseService } from './user-book-response.service';
import { UserBookResponseController } from './user-book-response.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserBookResponseController],
  providers: [UserBookResponseService],
})
export class UserBookResponseModule {}
