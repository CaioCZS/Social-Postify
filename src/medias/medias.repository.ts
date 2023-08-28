import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediasRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createMediaDto: CreateMediaDto) {
    const { title, username } = createMediaDto;
    return this.prisma.medias.create({ data: { title, username } });
  }

  findAll() {
    return this.prisma.medias.findMany();
  }

  findOne(id: number) {
    return this.prisma.medias.findUnique({ where: { id } });
  }

  findOneByTitleAndUsername(title: string, username: string) {
    return this.prisma.medias.findFirst({
      where: {
        title,
        username,
      },
    });
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return this.prisma.medias.update({
      where: {
        id,
      },
      data: updateMediaDto,
    });
  }

  remove(id: number) {
    return this.prisma.medias.delete({ where: { id } });
  }
}
