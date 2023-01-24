-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userpreference` DROP FOREIGN KEY `userpreference_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPreference` ADD CONSTRAINT `UserPreference_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `account` RENAME INDEX `account_provider_providerAccountId_key` TO `Account_provider_providerAccountId_key`;

-- RenameIndex
ALTER TABLE `session` RENAME INDEX `session_sessionToken_key` TO `Session_sessionToken_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `user_email_key` TO `User_email_key`;

-- RenameIndex
ALTER TABLE `verificationtoken` RENAME INDEX `verificationtoken_identifier_token_key` TO `VerificationToken_identifier_token_key`;

-- RenameIndex
ALTER TABLE `verificationtoken` RENAME INDEX `verificationtoken_token_key` TO `VerificationToken_token_key`;
