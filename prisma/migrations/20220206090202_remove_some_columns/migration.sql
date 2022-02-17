/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `links` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admins` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `links` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `updatedAt`;
