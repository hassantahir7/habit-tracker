import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserBookResponseDto } from './dto/create-user-book-response.dto';
import { UpdateUserBookResponseDto } from './dto/update-user-book-response.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserBookResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserBookResponseDto: CreateUserBookResponseDto) {
    try {
      if (!createUserBookResponseDto) {
        throw new HttpException(
          'CreateUserBookResponseDto is not provided',
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdResponse = await this.prisma.userBookResponse.create({
        data: createUserBookResponseDto,
      });

      if (!createdResponse) {
        throw new HttpException(
          'Failed to create a new user book response',
          HttpStatus.EXPECTATION_FAILED,
        );
      }

      return {
        response: createdResponse,
        success: true,
        message: 'User book response created successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to create user book response: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const responses = await this.prisma.userBookResponse.findMany();
      if (!responses.length) {
        throw new HttpException(
          'No user book responses found',
          HttpStatus.NO_CONTENT,
        );
      }

      return {
        response: responses,
        success: true,
        message: 'User book responses fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to fetch user book responses: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    if (!id) {
      throw new HttpException(
        'Response ID is not provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const response = await this.prisma.userBookResponse.findUnique({
        where: { id },
      });

      if (!response) {
        throw new HttpException(
          `User book response with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        response,
        success: true,
        message: 'User book response fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to fetch user book response: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateUserBookResponseDto: UpdateUserBookResponseDto) {
    if (!id || !updateUserBookResponseDto) {
      throw new HttpException(
        'Response ID or update data is not provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const response = await this.prisma.userBookResponse.findUnique({
        where: { id },
      });

      if (!response) {
        throw new HttpException(
          `User book response with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedResponse = await this.prisma.userBookResponse.update({
        where: { id },
        data: updateUserBookResponseDto,
      });

      return {
        response: updatedResponse,
        success: true,
        message: 'User book response updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to update user book response: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    if (!id) {
      throw new HttpException(
        'Response ID is not provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const response = await this.prisma.userBookResponse.findUnique({
        where: { id },
      });

      if (!response) {
        throw new HttpException(
          `User book response with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const deletedResponse = await this.prisma.userBookResponse.delete({
        where: { id },
      });

      return {
        response: deletedResponse,
        success: true,
        message: 'User book response deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to delete user book response: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
