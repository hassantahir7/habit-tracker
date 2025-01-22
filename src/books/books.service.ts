// src/book/book.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  async findAll() {
    return this.prisma.book.findMany({

    });
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },

    });
    if (!book) throw new NotFoundException(`Book with ID "${id}" not found`);
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.findOne(id); // Ensure the book exists
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure the book exists
    return this.prisma.book.delete({ where: { id } });
  }
}
