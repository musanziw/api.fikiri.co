import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ThematicsService } from './thematics.service';
import { CreateThematicDto } from './dto/create-thematic.dto';
import { UpdateThematicDto } from './dto/update-thematic.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/role.enum';
import { Public } from 'src/auth/decorators/public.decorator';
import { Thematic } from './entities/thematic.entity';

@Controller('thematics')
export class ThematicsController {
  constructor(private readonly thematicsService: ThematicsService) {
  }

  @Post()
  @Roles([RoleEnum.Admin])
  create(@Body() createThematicDto: CreateThematicDto): Promise<{ data: Thematic }> {
    return this.thematicsService.create(createThematicDto);
  }

  @Public()
  @Get()
  findAll(): Promise<{ data: Thematic [] }> {
    return this.thematicsService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Thematic }> {
    return this.thematicsService.findOne(+id);
  }

  @Patch(':id')
  @Roles([RoleEnum.Admin])
  update(@Param('id') id: string, @Body() data: UpdateThematicDto): Promise<{ data: Thematic }> {
    return this.thematicsService.update(+id, data);
  }

  @Delete(':id')
  @Roles([RoleEnum.Admin])
  remove(@Param('id') id: string): Promise<void> {
    return this.thematicsService.remove(+id);
  }
}
