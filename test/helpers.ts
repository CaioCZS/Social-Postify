import { PrismaService } from '../src/prisma/prisma.service';

export async function cleanDb(prisma: PrismaService) {
  await prisma.publications.deleteMany();
  await prisma.medias.deleteMany();
  await prisma.posts.deleteMany();
}
