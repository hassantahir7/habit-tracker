import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuotationDto } from './dto/create-quotation.dto';
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuotationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuotationDto: CreateQuotationDto) {
    const newQuotation = await this.prisma.quotation.create({
      data: createQuotationDto,
    });
    return newQuotation;
  }

  async findAll() {
    const quotations = await this.prisma.quotation.findMany();
    return quotations;
  }

  async findOne(id: string) {
    const quotation = await this.prisma.quotation.findUnique({ where: { id } });
    if (!quotation) {
      throw new NotFoundException(`Quotation with ID ${id} not found`);
    }
    return quotation;
  }

  async update(id: string, updateQuotationDto: UpdateQuotationDto) {
    const updatedQuotation = await this.prisma.quotation.update({
      where: { id },
      data: updateQuotationDto,
    });
    return updatedQuotation;
  }

  async remove(id: string) {
    const deletedQuotation = await this.prisma.quotation.delete({ where: { id } });
    return deletedQuotation;
  }
}
