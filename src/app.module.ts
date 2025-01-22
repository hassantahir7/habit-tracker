import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { QuotationModule } from './interest/quotation/quotation.module';
import { TopicModule } from './interest/topic/topic.module';
import { UserQuotationResponseModule } from './interest/user-quotation-response/user-quotation-response.module';
import { UserBookResponseModule } from './interest/user-book-response/user-book-response.module';
import { UserTopicResponseModule } from './interest/user-topic-response/user-topic-response.module';
import { UserInterestModule } from './interest/user-interest/user-interest.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    MailerModule,
    BooksModule,
    QuotationModule,
    TopicModule,
    UserQuotationResponseModule,
    UserBookResponseModule,
    UserTopicResponseModule,
    UserInterestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
