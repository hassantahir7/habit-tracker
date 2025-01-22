import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserTopicResponseDto } from './dto/create-user-topic-response.dto';
import { UpdateUserTopicResponseDto } from './dto/update-user-topic-response.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserTopicResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserTopicResponseDto: CreateUserTopicResponseDto) {
    try {
      if (!createUserTopicResponseDto) {
        throw new HttpException(
          'CreateUserTopicResponseDto is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdResponse = await this.prisma.userTopicResponse.create({
        data: createUserTopicResponseDto,
      });

      if (!createdResponse) {
        throw new HttpException(
          'Failed to create a new user topic response',
          HttpStatus.EXPECTATION_FAILED,
        );
      }

      return {
        response: createdResponse,
        success: true,
        message: 'User topic response created successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error creating user topic response: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const responses = await this.prisma.userTopicResponse.findMany();
      if (!responses.length) {
        throw new HttpException(
          'No user topic responses found',
          HttpStatus.NO_CONTENT,
        );
      }

      return {
        response: responses,
        success: true,
        message: 'User topic responses fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error fetching user topic responses: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    if (!id) {
      throw new HttpException(
        'Topic response ID is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const response = await this.prisma.userTopicResponse.findUnique({
        where: { id },
      });

      if (!response) {
        throw new HttpException(
          `User topic response with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        response,
        success: true,
        message: 'User topic response fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error fetching user topic response: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateUserTopicResponseDto: UpdateUserTopicResponseDto,
  ) {
    if (!id || !updateUserTopicResponseDto) {
      throw new HttpException(
        'Topic response ID and update data are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const existingResponse = await this.prisma.userTopicResponse.findUnique({
        where: { id },
      });

      if (!existingResponse) {
        throw new HttpException(
          `User topic response with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedResponse = await this.prisma.userTopicResponse.update({
        where: { id },
        data: updateUserTopicResponseDto,
      });

      return {
        response: updatedResponse,
        success: true,
        message: 'User topic response updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error updating user topic response: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    if (!id) {
      throw new HttpException(
        'Topic response ID is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const existingResponse = await this.prisma.userTopicResponse.findUnique({
        where: { id },
      });

      if (!existingResponse) {
        throw new HttpException(
          `User topic response with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const deletedResponse = await this.prisma.userTopicResponse.delete({
        where: { id },
      });

      return {
        response: deletedResponse,
        success: true,
        message: 'User topic response deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error deleting user topic response: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
