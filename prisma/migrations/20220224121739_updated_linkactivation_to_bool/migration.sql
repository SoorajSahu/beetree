/*
  Warnings:

  - Made the column `active_link` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `posts` MODIFY `active_link` BOOLEAN NOT NULL DEFAULT true;
