/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createPublicationDto: CreatePublicationDto) {
    const { date, mediaId, postId } = createPublicationDto;
    return this.prisma.publications.create({ data: { date, mediaId, postId } });
  }

  async findAll(published: string | null, after: string | null) {
    const currentDate = new Date();

    return await this.prisma.publications.findMany({
      where: {
        date: {
          lt: published === 'true' ? currentDate : undefined,
          gte:
            published === 'false'
              ? currentDate
              : after
              ? new Date(after)
              : undefined,
        },
      },
    });
  }

  findByPostId(postId: number) {
    return this.prisma.publications.findFirst({
      where: {
        postId,
      },
    });
  }

  findByMediaId(mediaId: number) {
    return this.prisma.publications.findFirst({
      where: {
        mediaId,
      },
    });
  }
  findOne(id: number) {
    return this.prisma.publications.findUnique({ where: { id } });
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return this.prisma.publications.update({
      where: { id },
      data: updatePublicationDto,
    });
  }

  remove(id: number) {
    return this.prisma.publications.delete({ where: { id } });
  }
}
