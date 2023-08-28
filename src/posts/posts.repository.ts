/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    const { text, title, image } = createPostDto;
    return this.prisma.posts.create({ data: { text, title, image } });
  }

  findAll() {
    return this.prisma.posts.findMany();
  }

  findOne(id: number) {
    return this.prisma.posts.findUnique({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.posts.update({
      where: { id },
      data: updatePostDto,
    });
  }

  remove(id: number) {
    return this.prisma.posts.delete({ where: { id } });
  }
}
