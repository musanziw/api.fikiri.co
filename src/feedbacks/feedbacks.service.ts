import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>
  ) {}

  async create(dto: CreateFeedbackDto): Promise<{ data: Feedback }> {
    try {
      const data: Feedback = await this.feedbackRepository.save({
        ...dto,
        quotations: '',
        scores: dto.quotations.map((id) => ({ id })),
        user: { email: dto.user }
      });
      return { data };
    } catch {
      throw new BadRequestException('Impossible de créer le feedback');
    }
  }

  async findAll(): Promise<{ data: Feedback[] }> {
    const data: Feedback[] = await this.feedbackRepository.find({
      relations: ['user']
    });
    return { data };
  }

  async findOne(id: number): Promise<{ data: Feedback }> {
    try {
      const data: Feedback = await this.feedbackRepository.findOne({
        where: { id },
        relations: ['user']
      });
      return { data };
    } catch {
      throw new NotFoundException('Impossible de récupérer le feedback');
    }
  }

  async update(id: number, dto: UpdateFeedbackDto): Promise<{ data: Feedback }> {
    try {
      const { data: feedback } = await this.findOne(id);
      const updatedFeedback: Feedback & UpdateFeedbackDto = Object.assign(feedback, dto);
      const data: Feedback = await this.feedbackRepository.save({
        ...updatedFeedback,
        scores: dto.quotations.map((id) => ({ id })),
        user: { email: dto.user }
      });
      return { data };
    } catch {
      throw new NotFoundException('Impossible de mettre à jour le feedback');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.feedbackRepository.delete(id);
    } catch {
      throw new NotFoundException('Impossible de supprimer le feedback');
    }
  }
}
