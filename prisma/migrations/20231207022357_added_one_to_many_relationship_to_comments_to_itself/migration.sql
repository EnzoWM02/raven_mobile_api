/*
  Warnings:

  - You are about to drop the `_childComments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `parent_comment_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_childComments" DROP CONSTRAINT "_childComments_A_fkey";

-- DropForeignKey
ALTER TABLE "_childComments" DROP CONSTRAINT "_childComments_B_fkey";

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "parent_comment_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_childComments";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
