import { Injectable } from '@nestjs/common';
import { CreateUserQuotationResponseDto } from './dto/create-user-quotation-response.dto';
import { UpdateUserQuotationResponseDto } from './dto/update-user-quotation-response.dto';
import { PrismaService } from '../prisma/prisma.service'; // assuming PrismaService is used for DB operations
import { UserQuotationResponse } from '@prisma/client'; // if using Prisma

@Injectable()
export class UserQuotationResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserQuotationResponseDto): Promise<UserQuotationResponse> {
    // Assuming `UserQuotationResponse` is a model in your Prisma schema
    const createdResponse = await this.prisma.userQuotationResponse.create({
      data: dto, // Pass the DTO data to the model
    });
    return createdResponse;
  }

  async findAll(): Promise<UserQuotationResponse[]> {
    // Fetch all quotation responses from the database
    return this.prisma.userQuotationResponse.findMany();
  }

  async findOne(id: string): Promise<UserQuotationResponse | null> {
    // Fetch a specific quotation response by ID
    return this.prisma.userQuotationResponse.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateUserQuotationResponseDto): Promise<UserQuotationResponse> {
    // Update a specific quotation response by ID
    return this.prisma.userQuotationResponse.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string): Promise<UserQuotationResponse> {
    // Delete a specific quotation response by ID
    return this.prisma.userQuotationResponse.delete({
      where: { id },
    });
  }
}
