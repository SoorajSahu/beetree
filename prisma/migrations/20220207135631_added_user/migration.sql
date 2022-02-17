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

    UNIQUE INDEX `code`(`code`),
    UNIQUE INDEX `referral`(`referral`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
