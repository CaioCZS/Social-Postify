/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { Posts } from '@prisma/client';
import { PostAlreadyPublished, PostNotFound } from '../errors/posts-erros';
import { PublicationsRepository } from '../publications/publications.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly publicationRepository: PublicationsRepository,
  ) {}

  async create(createPostDto: CreatePostDto) {
    await this.postsRepository.create(createPostDto);
  }

  async findAll() {
    const posts = await this.postsRepository.findAll();
    return this.formatPosts(posts);
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne(id);
    if (!post) throw new PostNotFound();
    if (post.image === null) delete post.image;
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id);
    await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.verifyPostAlreadyPubliched(id);
    return await this.postsRepository.remove(id);
  }

  formatPosts(posts: Posts[]) {
    return posts.map((p) => {
      if (p.image === null) delete p.image;
      return p;
    });
  }

  async verifyPostAlreadyPubliched(id: number) {
    const publication = await this.publicationRepository.findByPostId(id);
    if (publication) throw new PostAlreadyPublished();
  }
}
