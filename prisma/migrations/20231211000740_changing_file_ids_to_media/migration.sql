/*
  Warnings:

  - You are about to drop the column `background_image` on the `user_profile` table. All the data in the column will be lost.
  - You are about to drop the column `banner_id` on the `user_profile` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture_id` on the `user_profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profilePictureId]` on the table `user_profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bannerPictureId]` on the table `user_profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[backgroundImageId]` on the table `user_profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "medias" DROP CONSTRAINT "medias_post_id_fkey";

-- AlterTable
ALTER TABLE "medias" ALTER COLUMN "post_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user_profile" DROP COLUMN "background_image",
DROP COLUMN "banner_id",
DROP COLUMN "profile_picture_id",
ADD COLUMN     "backgroundImageId" INTEGER,
ADD COLUMN     "bannerPictureId" INTEGER,
ADD COLUMN     "profilePictureId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_profilePictureId_key" ON "user_profile"("profilePictureId");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_bannerPictureId_key" ON "user_profile"("bannerPictureId");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_backgroundImageId_key" ON "user_profile"("backgroundImageId");

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_profilePictureId_fkey" FOREIGN KEY ("profilePictureId") REFERENCES "medias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_bannerPictureId_fkey" FOREIGN KEY ("bannerPictureId") REFERENCES "medias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_backgroundImageId_fkey" FOREIGN KEY ("backgroundImageId") REFERENCES "medias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
