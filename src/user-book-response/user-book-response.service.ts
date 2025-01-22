import { Injectable } from '@nestjs/common';
import { CreateUserBookResponseDto } from './dto/create-user-book-response.dto';
import { UpdateUserBookResponseDto } from './dto/update-user-book-response.dto';
import { PrismaService } from '../prisma/prisma.service'; // Assuming PrismaService is used for DB operations
import { UserBookResponse } from '@prisma/client'; // If using Prisma

@Injectable()
export class UserBookResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserBookResponseDto: CreateUserBookResponseDto): Promise<UserBookResponse> {
    // Create a new UserBookResponse entry
    const createdResponse = await this.prisma.userBookResponse.create({
      data: createUserBookResponseDto, // Pass the DTO data to the model
    });
    return createdResponse;
  }

  async findAll(): Promise<UserBookResponse[]> {
    // Fetch all UserBookResponse entries
    return this.prisma.userBookResponse.findMany();
  }

  async findOne(id: string): Promise<UserBookResponse | null> {
    // Fetch a specific UserBookResponse entry by ID
    return this.prisma.userBookResponse.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserBookResponseDto: UpdateUserBookResponseDto): Promise<UserBookResponse> {
    // Update a specific UserBookResponse entry by ID
    return this.prisma.userBookResponse.update({
      where: { id },
      data: updateUserBookResponseDto, // Pass the updated data
    });
  }

  async remove(id: string): Promise<UserBookResponse> {
    // Delete a specific UserBookResponse entry by ID
    return this.prisma.userBookResponse.delete({
      where: { id },
    });
  }
}
