import { Module } from '@nestjs/common';
import { UserTopicResponseService } from './user-topic-response.service';
import { UserTopicResponseController } from './user-topic-response.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserTopicResponseController],
  providers: [UserTopicResponseService],
})
export class UserTopicResponseModule {}
