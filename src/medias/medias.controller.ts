import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  async create(@Body() createMediaDto: CreateMediaDto) {
    await this.mediasService.create(createMediaDto);
    return 'Media created';
  }

  @Get()
  async findAll() {
    return await this.mediasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.mediasService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    await this.mediasService.update(id, updateMediaDto);
    return 'Media updated';
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.mediasService.remove(id);
    return 'Media updated';
  }
}
