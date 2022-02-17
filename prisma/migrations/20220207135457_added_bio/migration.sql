/*
  Warnings:

  - Added the required column `bio` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `bio` VARCHAR(255) NOT NULL,
    ADD COLUMN `website` VARCHAR(255) NOT NULL;
