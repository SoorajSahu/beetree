/*
  Warnings:

  - You are about to drop the column `createdAt` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `links` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admins` DROP COLUMN `createdAt`;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `createdAt`;

-- AlterTable
ALTER TABLE `links` DROP COLUMN `createdAt`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `createdAt`;
