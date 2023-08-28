/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';
import { PostsService } from '../posts/posts.service';
import { MediasService } from '../medias/medias.service';
import {
  PublicationAlreadyPublished,
  PublicationNotFound,
} from '../errors/publication-erros';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationRepository: PublicationsRepository,
    private readonly postsService: PostsService,
    private readonly mediasService: MediasService,
  ) {}

  async create(createPublicationDto: CreatePublicationDto) {
    await this.verifyExistingMediaAndPost(createPublicationDto);

    await this.publicationRepository.create(createPublicationDto);
  }

  async findAll(published: string | null, after: string | null) {
    return await this.publicationRepository.findAll(published, after);
  }

  async findOne(id: number) {
    const publication = await this.publicationRepository.findOne(id);
    if (!publication) throw new PublicationNotFound();
    return publication;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const publication = await this.findOne(id);
    await this.verifyExistingMediaAndPost(updatePublicationDto);
    await this.verifyIfPublicationIsNotPublished(publication.date);

    return this.publicationRepository.update(id, updatePublicationDto);
  }

  async remove(id: number) {
    const publication = await this.findOne(id);
    return await this.publicationRepository.remove(id);
  }

  private async verifyExistingMediaAndPost(ids: UpdatePublicationDto) {
    const { mediaId, postId } = ids;
    await this.mediasService.findOne(mediaId);
    await this.postsService.findOne(postId);
  }

  private async verifyIfPublicationIsNotPublished(date: Date) {
    const currentDate = new Date();
    const publicationDate = new Date(date);
    if (currentDate > publicationDate) throw new PublicationAlreadyPublished();
  }
}
