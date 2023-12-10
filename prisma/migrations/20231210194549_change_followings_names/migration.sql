/*
  Warnings:

  - The primary key for the `user_followings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `follower_id` on the `user_followings` table. All the data in the column will be lost.
  - You are about to drop the column `following_id` on the `user_followings` table. All the data in the column will be lost.
  - Added the required column `followed_id` to the `user_followings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_followings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_followings" DROP CONSTRAINT "user_followings_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "user_followings" DROP CONSTRAINT "user_followings_following_id_fkey";

-- AlterTable
ALTER TABLE "user_followings" DROP CONSTRAINT "user_followings_pkey",
DROP COLUMN "follower_id",
DROP COLUMN "following_id",
ADD COLUMN     "followed_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "user_followings_pkey" PRIMARY KEY ("user_id", "followed_id");

-- AddForeignKey
ALTER TABLE "user_followings" ADD CONSTRAINT "user_followings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_followings" ADD CONSTRAINT "user_followings_followed_id_fkey" FOREIGN KEY ("followed_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
