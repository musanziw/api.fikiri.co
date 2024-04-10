import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CallsService } from './calls.service';
import { CreateCallDto } from './dto/create-call.dto';
import { UpdateCallDto } from './dto/update-call.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/role.enum';
import { Call } from './entities/call.entity';

@Controller('calls')
export class CallsController {
  constructor(private readonly callsService: CallsService) {
  }

  @Post()
  @Roles([RoleEnum.Admin])
  create(@Body() createCallsDto: CreateCallDto): Promise<{ data: Call }> {
    return this.callsService.create(createCallsDto);
  }

  @Get('')
  findAll(): Promise<{ data: [call: Call[], number] }> {
    return this.callsService.findAll();
  }

  @Public()
  @Get('recent/one')
  findRecent(): Promise<{ data: Call }> {
    return this.callsService.findRecent();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Call }> {
    return this.callsService.findOne(+id);
  }

  @Patch(':id')
  @Roles([RoleEnum.Admin])
  update(@Param('id') id: string, @Body() updateCallsDto: UpdateCallDto): Promise<{ data: Call }> {
    return this.callsService.update(+id, updateCallsDto);
  }

  @Delete(':id')
  @Roles([RoleEnum.Admin])
  remove(@Param('id') id: string): Promise<void> {
    return this.callsService.remove(+id);
  }
}
