import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTopicsDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TopicService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTopicsDto: CreateTopicsDto) {
    try {
      if (!createTopicsDto) {
        throw new HttpException(
          'CreateTopicsDto is not provided',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newTopic = await this.prisma.topics.create({
        data: createTopicsDto,
      });

      if (!newTopic) {
        throw new HttpException(
          'Failed to create a new topic',
          HttpStatus.EXPECTATION_FAILED,
        );
      }

      return {
        response: newTopic,
        success: true,
        message: 'Topic created successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to create topic: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const topics = await this.prisma.topics.findMany();
      if (!topics.length) {
        throw new HttpException(
          'No topics found',
          HttpStatus.NO_CONTENT,
        );
      }

      return {
        response: topics,
        success: true,
        message: 'Topics fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to fetch topics: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    if (!id) {
      throw new HttpException(
        'Topic ID is not provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const topic = await this.prisma.topics.findUnique({ where: { id } });
      if (!topic) {
        throw new HttpException(
          `Topic with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        response: topic,
        success: true,
        message: 'Topic fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to fetch topic: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateTopicsDto: UpdateTopicDto) {
    if (!id || !updateTopicsDto) {
      throw new HttpException(
        'Topic ID or update data is not provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const topic = await this.prisma.topics.findUnique({ where: { id } });
      if (!topic) {
        throw new HttpException(
          `Topic with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedTopic = await this.prisma.topics.update({
        where: { id },
        data: updateTopicsDto,
      });

      return {
        response: updatedTopic,
        success: true,
        message: 'Topic updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to update topic: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    if (!id) {
      throw new HttpException(
        'Topic ID is not provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const topic = await this.prisma.topics.findUnique({ where: { id } });
      if (!topic) {
        throw new HttpException(
          `Topic with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const deletedTopic = await this.prisma.topics.delete({ where: { id } });
      return {
        response: deletedTopic,
        success: true,
        message: 'Topic deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to delete topic: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
