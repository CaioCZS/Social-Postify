import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { isIdGreaterThanZero } from '../helpers';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto) {
    await this.publicationsService.create(createPublicationDto);
    return 'Publication Created';
  }

  @Get()
  async findAll(
    @Query('published') published: string | null,
    @Query('after') after: string | null,
  ) {
    return await this.publicationsService.findAll(published, after);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    isIdGreaterThanZero(id);
    return this.publicationsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ) {
    isIdGreaterThanZero(id);
    await this.publicationsService.update(id, updatePublicationDto);
    return 'Publication updated';
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    isIdGreaterThanZero(id);
    await this.publicationsService.remove(id);
    return 'Publication deleted';
  }
}
