-- AlterTable
ALTER TABLE `users` MODIFY `code` VARCHAR(8) NULL,
    MODIFY `referral` VARCHAR(8) NULL,
    MODIFY `premium` INTEGER NULL DEFAULT 0,
    MODIFY `points` INTEGER NULL DEFAULT 0,
    MODIFY `bio` VARCHAR(255) NULL,
    MODIFY `website` VARCHAR(255) NULL;