/*
  Warnings:

  - You are about to drop the column `mediasId` on the `publications` table. All the data in the column will be lost.
  - Added the required column `mediaId` to the `publications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_mediasId_fkey";

-- AlterTable
ALTER TABLE "publications" DROP COLUMN "mediasId",
ADD COLUMN     "mediaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
