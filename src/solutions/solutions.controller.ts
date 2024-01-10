import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import {SolutionsService} from './solutions.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {v4 as uuidv4} from 'uuid';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Controller('solutions')
export class SolutionsController {
    constructor(private readonly solutionsService: SolutionsService) {
    }

    @Post()
    create(@Body() data: CreateSolutionDto) {
        return this.solutionsService.create(data);
    }

    @Get('approved')
    findApproved() {
        return this.solutionsService.findApproved();
    }

    @Get()
    findAll() {
        return this.solutionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.solutionsService.findOne(+id);
    }

    @Get('user/:email')
    findByUser(@Param('email') email: string) {
        return this.solutionsService.findbyUser(email);
    }

    @Get('challenge/:id')
    findByCall(@Param('id') id: string) {
        return this.solutionsService.findByCall(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateSolutionDto) {
        return this.solutionsService.update(+id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.solutionsService.remove(+id);
    }

    @UseInterceptors(
        FileInterceptor('thumb', {
            storage: diskStorage({
                destination: './uploads',
                filename: function (_req, file, cb) {
                    cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
                },
            }),
        }),
    )
    @Post(':id/image')
    uploadImage(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.solutionsService.uploadImage(+id, file);
    }

    @Delete(':id/image/delete')
    removeImage(@Param('id') id: string) {
        return this.solutionsService.deleteImage(+id);
    }
}
