import { faker } from '@faker-js/faker';
import { PrismaService } from '../../src/prisma/prisma.service';
import { createMedia } from './medias-factory';
import { createPost } from './posts-factory';

export async function createPublication(prisma: PrismaService) {
  const media = await createMedia(prisma);
  const post = await createPost(prisma);

  return prisma.publications.create({
    data: {
      date: faker.date.future({ years: 1 }),
      mediasId: media.id,
      postsId: post.id,
    },
  });
}
