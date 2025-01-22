import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTopicsDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TopicService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTopicsDto: CreateTopicsDto) {
    const newTopic = await this.prisma.topics.create({
      data: createTopicsDto,
    });
    return newTopic;
  }

  async findAll() {
    const topics = await this.prisma.topics.findMany();
    return topics;
  }

  async findOne(id: string) {
    const topic = await this.prisma.topics.findUnique({ where: { id } });
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return topic;
  }

  async update(id: string, updateTopicsDto: UpdateTopicDto) {
    const updatedTopic = await this.prisma.topics.update({
      where: { id },
      data: updateTopicsDto,
    });
    return updatedTopic;
  }

  async remove(id: string) {
    const deletedTopic = await this.prisma.topics.delete({ where: { id } });
    return deletedTopic;
  }
}
