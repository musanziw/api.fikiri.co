import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {
  }

  async create(dto: CreateImageDto): Promise<{ data: Image }> {
    try {
      const data: Image = await this.imageRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Impossible d\'uploader l\'image');
    }
  }

  async findAll(): Promise<{ data: Image[] }> {
    const data: Image[] = await this.imageRepository.find({
      order: { created_at: 'DESC' },
    });
    return { data };
  }

  async findOne(id: number): Promise<{ data: Image }> {
    try {
      const data: Image = await this.imageRepository.findOneOrFail({
        where: { id },
      });
      return { data };
    } catch {
      throw new NotFoundException('Image introuvable');
    }
  }

  async update(id: number, dto: UpdateImageDto) {
    try {
      const { data: image } = await this.findOne(id);
      const updatedImage: Image & UpdateImageDto = Object.assign(image, dto);
      const data: Image = await this.imageRepository.save(updatedImage);
      return { data };
    } catch {
      throw new BadRequestException('Une erreur est survenue lors de la mise à jour de l\'image');
    }
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.imageRepository.delete(id);
  }
}
