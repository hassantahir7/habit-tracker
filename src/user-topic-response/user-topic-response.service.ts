import { Injectable } from '@nestjs/common';
import { CreateUserTopicResponseDto } from './dto/create-user-topic-response.dto';
import { UpdateUserTopicResponseDto } from './dto/update-user-topic-response.dto';
import { PrismaService } from '../prisma/prisma.service'; // Assuming PrismaService is used for DB operations
import { UserTopicResponse } from '@prisma/client'; // If using Prisma

@Injectable()
export class UserTopicResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserTopicResponseDto: CreateUserTopicResponseDto): Promise<UserTopicResponse> {
    // Create a new UserTopicResponse entry
    const createdResponse = await this.prisma.userTopicResponse.create({
      data: createUserTopicResponseDto, // Passing the DTO data to the model
    });
    return createdResponse;
  }

  async findAll(): Promise<UserTopicResponse[]> {
    // Fetch all UserTopicResponse entries
    return this.prisma.userTopicResponse.findMany();
  }

  async findOne(id: string): Promise<UserTopicResponse | null> {
    // Fetch a specific UserTopicResponse entry by ID
    return this.prisma.userTopicResponse.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateUserTopicResponseDto: UpdateUserTopicResponseDto): Promise<UserTopicResponse> {
    // Update a UserTopicResponse entry by ID
    return this.prisma.userTopicResponse.update({
      where: { id },
      data: updateUserTopicResponseDto, // Updating with the new DTO data
    });
  }

  async remove(id: string): Promise<UserTopicResponse> {
    // Delete a UserTopicResponse entry by ID
    return this.prisma.userTopicResponse.delete({
      where: { id },
    });
  }
}
