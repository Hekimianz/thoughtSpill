/*
  Warnings:

  - You are about to drop the column `type` on the `Post` table. All the data in the column will be lost.
  - Added the required column `author` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_published` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pages` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "type",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "date_published" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pages" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "PostType";
