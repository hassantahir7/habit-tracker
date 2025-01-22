import { Module } from '@nestjs/common';
import { UserQuotationResponseService } from './user-quotation-response.service';
import { UserQuotationResponseController } from './user-quotation-response.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserQuotationResponseController],
  providers: [UserQuotationResponseService],
})
export class UserQuotationResponseModule {}
