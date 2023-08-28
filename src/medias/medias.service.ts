import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';
import {
  CombinationAlradyExist,
  MediaAlreadyPublished,
  MediaNotFound,
} from '../errors/medias.errors';
import { PublicationsRepository } from '../publications/publications.repository';

@Injectable()
export class MediasService {
  constructor(
    private readonly mediaRepository: MediasRepository,
    private readonly publicationRepository: PublicationsRepository,
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    const { title, username } = createMediaDto;

    await this.verifyTitleAndUsername(title, username);

    return await this.mediaRepository.create(createMediaDto);
  }

  async findAll() {
    return await this.mediaRepository.findAll();
  }

  async findOne(id: number) {
    const media = await this.mediaRepository.findOne(id);
    if (!media) throw new MediaNotFound();
    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const { title, username } = updateMediaDto;
    const media = await this.findOne(id);
    const mediaTitle = title ? title : media.title;
    const mediaUsername = username ? username : media.username;
    await this.verifyTitleAndUsername(mediaTitle, mediaUsername);

    return this.mediaRepository.update(id, updateMediaDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.verifyMediaAlreadyPubliched(id);

    return this.mediaRepository.remove(id);
  }

  async verifyTitleAndUsername(title: string, username: string) {
    const media = await this.mediaRepository.findOneByTitleAndUsername(
      title,
      username,
    );
    if (media) throw new CombinationAlradyExist();
    return media;
  }

  async verifyMediaAlreadyPubliched(id: number) {
    const publication = await this.publicationRepository.findByMediaId(id);
    if (publication) throw new MediaAlreadyPublished();
  }
}
