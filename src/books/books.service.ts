import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    if (!createBookDto) {
      throw new HttpException(
        'CreateBookDto is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const createdBook = await this.prisma.book.create({
        data: createBookDto,
      });

      return {
        response: createdBook,
        success: true,
        message: 'Book created successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error creating book: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const books = await this.prisma.book.findMany();
      if (!books.length) {
        throw new HttpException(
          'No books found',
          HttpStatus.NO_CONTENT,
        );
      }

      return {
        response: books,
        success: true,
        message: 'Books fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error fetching books: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    if (!id) {
      throw new HttpException(
        'Book ID is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const book = await this.prisma.book.findUnique({
        where: { id },
      });

      if (!book) {
        throw new HttpException(
          `Book with ID "${id}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        response: book,
        success: true,
        message: 'Book fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error fetching book: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    if (!id || !updateBookDto) {
      throw new HttpException(
        'Book ID and update data are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const existingBook = await this.prisma.book.findUnique({
        where: { id },
      });

      if (!existingBook) {
        throw new HttpException(
          `Book with ID "${id}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedBook = await this.prisma.book.update({
        where: { id },
        data: updateBookDto,
      });

      return {
        response: updatedBook,
        success: true,
        message: 'Book updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error updating book: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    if (!id) {
      throw new HttpException(
        'Book ID is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const existingBook = await this.prisma.book.findUnique({
        where: { id },
      });

      if (!existingBook) {
        throw new HttpException(
          `Book with ID "${id}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const deletedBook = await this.prisma.book.delete({
        where: { id },
      });

      return {
        response: deletedBook,
        success: true,
        message: 'Book deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Error deleting book: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
