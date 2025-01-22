import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserQuotationResponseDto } from './dto/create-user-quotation-response.dto';
import { UpdateUserQuotationResponseDto } from './dto/update-user-quotation-response.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserQuotationResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserQuotationResponseDto) {
    try {
      if (!dto) {
        throw new HttpException(
          'CreateUserQuotationResponseDto is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdResponse = await this.prisma.userQuotationResponse.create({
        data: dto,
      });

      if (!createdResponse) {
        throw new HttpException(
          'Failed to create a new user quotation response',
          HttpStatus.EXPECTATION_FAILED,
        );
      }

      return {
        response: createdResponse,
        success: true,
        message: 'User quotation response created successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error creating user quotation response: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const responses = await this.prisma.userQuotationResponse.findMany();
      if (!responses.length) {
        throw new HttpException(
          'No user quotation responses found',
          HttpStatus.NO_CONTENT,
        );
      }

      return {
        response: responses,
        success: true,
        message: 'User quotation responses fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error fetching user quotation responses: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    if (!id) {
      throw new HttpException(
        'Quotation response ID is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const response = await this.prisma.userQuotationResponse.findUnique({
        where: { id },
      });

      if (!response) {
        throw new HttpException(
          `User quotation response with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        response,
        success: true,
        message: 'User quotation response fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error fetching user quotation response: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, dto: UpdateUserQuotationResponseDto) {
    if (!id || !dto) {
      throw new HttpException(
        'Quotation response ID and update data are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const existingResponse = await this.prisma.userQuotationResponse.findUnique({
        where: { id },
      });

      if (!existingResponse) {
        throw new HttpException(
          `User quotation response with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedResponse = await this.prisma.userQuotationResponse.update({
        where: { id },
        data: dto,
      });

      return {
        response: updatedResponse,
        success: true,
        message: 'User quotation response updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error updating user quotation response: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    if (!id) {
      throw new HttpException(
        'Quotation response ID is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const existingResponse = await this.prisma.userQuotationResponse.findUnique({
        where: { id },
      });

      if (!existingResponse) {
        throw new HttpException(
          `User quotation response with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const deletedResponse = await this.prisma.userQuotationResponse.delete({
        where: { id },
      });

      return {
        response: deletedResponse,
        success: true,
        message: 'User quotation response deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error deleting user quotation response: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
