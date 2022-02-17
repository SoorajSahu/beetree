-- CreateTable
CREATE TABLE `SequelizeMeta` (
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `role` VARCHAR(30) NOT NULL DEFAULT 'sub-admin',
    `is_valid` INTEGER NOT NULL DEFAULT 0,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_url` VARCHAR(800) NULL,
    `name` VARCHAR(255) NOT NULL,
    `tag` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `image_link` VARCHAR(255) NULL,
    `link_type` VARCHAR(10) NULL,
    `active_link` INTEGER NULL,
    `title` VARCHAR(255) NOT NULL,
    `tags` VARCHAR(255) NULL,
    `link` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `author` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `code` VARCHAR(8) NOT NULL,
    `referral` VARCHAR(8) NOT NULL,
    `premium` INTEGER NOT NULL DEFAULT 0,
    `points` INTEGER NOT NULL DEFAULT 0,
    `bio` VARCHAR(255) NOT NULL,
    `website` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `code`(`code`),
    UNIQUE INDEX `referral`(`referral`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
