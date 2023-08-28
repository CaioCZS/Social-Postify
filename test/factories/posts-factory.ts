import { faker } from '@faker-js/faker';
import { PrismaService } from '../../src/prisma/prisma.service';

export async function createPostWithImage(prisma: PrismaService) {
  return prisma.posts.create({
    data: {
      title: faker.lorem.sentence(),
      text: faker.internet.url(),
      image: faker.image.url(),
    },
  });
}

export async function createPostWithoutImage(prisma: PrismaService) {
  return prisma.posts.create({
    data: {
      title: faker.lorem.sentence(),
      text: faker.internet.url(),
    },
  });
}
