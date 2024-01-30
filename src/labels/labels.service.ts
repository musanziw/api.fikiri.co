import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLableDto } from './dto/create-lable.dto';
import { UpdateLableDto } from './dto/update-lable.dto';
import { PrismaService } from '../database/prisma.service';
import { Label } from '@prisma/client';

@Injectable()
export class LabelsService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(dto: CreateLableDto) {
    let data: Label | null = null;
    const { name } = dto;
    const label = await this.prismaService.label.findFirst({
      where: { name },
    });
    if (label)
      throw new ConflictException('Le label existe déjà');
    data = await this.prismaService.label.create({ data: dto });
    return { data };
  }

  async findAll() {
    const data: Label[] = await this.prismaService.label.findMany({});
    return { data };
  }

  async findOne(id: number) {
    const data: Label = await this.prismaService.label.findUnique({
      where: { id },
    });
    if (!data) throw new NotFoundException('Le label n\'a pas été trouvé');
    return { data };
  }

  async update(id: number, dto: UpdateLableDto) {
    await this.findOne(id);
    const data: Label = await this.prismaService.label.update({
      data: dto,
      where: { id },
    });
    return { data };
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prismaService.label.delete({
      where: { id },
    });
  }
}
