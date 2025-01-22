import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInterestDto } from './dto/create-user-interest.dto';
import { UpdateUserInterestDto } from './dto/update-user-interest.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class UserInterestService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string): Promise<{ interest: string }> {
    if (!userId) {
      throw new Error('userId is required');
    }

    const [books, quotations, booksResponse, topicsResponse] = await Promise.all([
      this.prismaService.book.findMany({ select: { genre: true } }),
      this.prismaService.userQuotationResponse.findMany({
        where: { userId },
        include: { quotation: true },
      }),
      this.prismaService.userBookResponse.findMany({
        where: { userId },
        include: { book: true },
      }),
      this.prismaService.userTopicResponse.findMany({
        where: { userId },
        include: { topic: true },
      }),
    ]);

    if (!books || !quotations || !booksResponse || !topicsResponse) {
      throw new HttpException('Could not get books, quotations, booksResponse, or topicsResponse', HttpStatus.FAILED_DEPENDENCY);
    }

    const prompt = [...quotations, ...booksResponse, ...topicsResponse];

    if (!prompt.length) {
      throw new HttpException('No content to generate interest from', HttpStatus.BAD_REQUEST);
    }

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCylZhHi7v7w9RVTkYBfMbMMbW8GTsgPpE',
        {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `Next is my response: ${prompt.join(', ')}, based on response i want you to select one genre from my present genre which are: ${books.map(
                    (book) => book.genre,
                  )}, Your answer should be one word specific For Example "Non Fiction"`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.9,
            maxOutputTokens: 150,
            responseMimeType: 'text/plain',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response || !response.data || !response.data.candidates || !response.data.candidates[0]) {
        throw new HttpException('Failed to generate interest', HttpStatus.EXPECTATION_FAILED);
      }

      const interest = response.data.candidates[0].content.parts[0].text;

      await this.prismaService.userInterest.create({
        data: { userId, interest },
      });

      return { interest };
    } catch (error) {
      throw new HttpException('Failed to create user interest', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all userInterest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userInterest`;
  }

  update(id: number, updateUserInterestDto: UpdateUserInterestDto) {
    return `This action updates a #${id} userInterest`;
  }

  remove(id: number) {
    return `This action removes a #${id} userInterest`;
  }
}
