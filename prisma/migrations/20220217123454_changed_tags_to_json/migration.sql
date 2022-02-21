/*
  Warnings:

  - Made the column `tags` on table `links` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `links` MODIFY `tags` JSON NOT NULL;
