/*
  Warnings:

  - You are about to drop the `links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `links`;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `image_link` VARCHAR(255) NULL,
    `link_type` VARCHAR(10) NULL,
    `active_link` INTEGER NULL,
    `title` VARCHAR(255) NOT NULL,
    `tags` JSON NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `author` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
