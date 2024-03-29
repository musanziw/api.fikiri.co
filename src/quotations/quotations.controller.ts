import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { CreateLableDto } from './dto/create-quotation.dto';
import { UpdateLableDto } from './dto/update-quotation.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/role.enum';

@Controller('quotations')
export class QuotationsController {
  constructor(private readonly lablesService: QuotationsService) {}

  @Post()
  @Roles(RoleEnum.Admin, RoleEnum.Curator)
  create(@Body() createLableDto: CreateLableDto) {
    return this.lablesService.create(createLableDto);
  }

  @Get()
  findAll() {
    return this.lablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLableDto: UpdateLableDto) {
    return this.lablesService.update(+id, updateLableDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  remove(@Param('id') id: string) {
    return this.lablesService.remove(+id);
  }
}
