import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class QuotationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuotationDto: CreateQuotationDto) {
    try {
      if (!createQuotationDto) {
        throw new HttpException(
          'CreateQuotationDto is not provided',
          HttpStatus.BAD_GATEWAY,
        );
      }

      const newQuotation = await this.prisma.quotation.create({
        data: createQuotationDto,
      });

      if (!newQuotation) {
        throw new HttpException(
          'Failed to create a new quotation',
          HttpStatus.EXPECTATION_FAILED,
        );
      }

      return {
        response: newQuotation,
        success: true,
        message: 'Quotation created successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to create quotation: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const quotations = await this.prisma.quotation.findMany();
      if (!quotations) {
        throw new HttpException('No quotations found', HttpStatus.NO_CONTENT);
      }
      return {
        response: quotations,
        success: true,
        message: 'Quotations fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Unable to fetch quotations',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    if (!id) {
      throw new HttpException(
        'Quotation ID is not provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const quotation = await this.prisma.quotation.findUnique({
        where: { id },
      });
      if (!quotation) {
        throw new HttpException(
          `Quotation with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        response: quotation,
        success: true,
        message: 'Quotation fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to fetch quotation: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateQuotationDto: UpdateQuotationDto) {
    if (!id || !updateQuotationDto) {
      throw new HttpException(
        'Quotation ID or update data is not provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const quotation = await this.prisma.quotation.findUnique({
        where: { id },
      });
      if (!quotation) {
        throw new HttpException(
          `Quotation with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      const updatedQuotation = await this.prisma.quotation.update({
        where: { id },
        data: updateQuotationDto,
      });
      if (!updatedQuotation) {
        throw new HttpException(
          'Failed to update quotation',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
      return {
        data: updatedQuotation,
        success: true,
        message: 'Quotation updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to update quotation: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    if (!id) {
      throw new HttpException(
        'Quotation ID is not provided',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const quotation = await this.prisma.quotation.findUnique({
        where: { id },
      });
      if (!quotation) {
        throw new HttpException(
          `Quotation with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      const deletedQuotation = await this.prisma.quotation.delete({
        where: { id },
      });
      if (!deletedQuotation) {
        throw new HttpException(
          'Failed to delete quotation',
          HttpStatus.EXPECTATION_FAILED,
        );
      }
      return {
        data: deletedQuotation,
        success: true,
        message: 'Quotation deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        `Unable to delete quotation: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
