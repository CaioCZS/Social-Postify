/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createPublicationDto: CreatePublicationDto) {
    return 'This action adds a new publication';
  }

  findAll() {
    return `This action returns all publications`;
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
    return `This action returns a #${id} publication`;
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return `This action removes a #${id} publication`;
  }
}
