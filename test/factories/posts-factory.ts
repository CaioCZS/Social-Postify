import { faker } from '@faker-js/faker';
import { PrismaService } from '../../src/prisma/prisma.service';

export async function createPost(prisma: PrismaService) {
  return prisma.posts.create({
    data: {
      title: faker.lorem.sentence(),
      text: faker.internet.url(),
      image: faker.image.url(),
    },
  });
}
