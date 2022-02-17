/*
  Warnings:

  - You are about to drop the column `bio` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `bio`,
    DROP COLUMN `website`;
