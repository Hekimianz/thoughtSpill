/*
  Warnings:

  - Made the column `date_read` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "date_read" SET NOT NULL;
