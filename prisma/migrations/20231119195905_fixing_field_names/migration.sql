/*
  Warnings:

  - You are about to drop the column `birthDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `preferredLanguage` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `uniqueKey` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `loginToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[unique_key]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birth_date` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unique_key` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "loginToken" DROP CONSTRAINT "loginToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "userProfile" DROP CONSTRAINT "userProfile_userId_fkey";

-- DropIndex
DROP INDEX "users_uniqueKey_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "birthDate",
DROP COLUMN "createdAt",
DROP COLUMN "preferredLanguage",
DROP COLUMN "uniqueKey",
DROP COLUMN "updatedAt",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "preferred_language" TEXT NOT NULL DEFAULT 'pt_BR',
ADD COLUMN     "unique_key" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "loginToken";

-- DropTable
DROP TABLE "userProfile";

-- CreateTable
CREATE TABLE "user_profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "profile_picture_id" INTEGER,
    "banner_id" INTEGER,
    "primary_color" TEXT NOT NULL DEFAULT '#ffffff',
    "secondary_color" TEXT NOT NULL DEFAULT '#f6f6f6',
    "background_color" TEXT NOT NULL DEFAULT 'ffffff',
    "background_image" INTEGER,
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "login_token" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "device" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "login_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_id_key" ON "user_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "login_token_user_id_key" ON "login_token"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "login_token_token_key" ON "login_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "users_unique_key_key" ON "users"("unique_key");

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "login_token" ADD CONSTRAINT "login_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
