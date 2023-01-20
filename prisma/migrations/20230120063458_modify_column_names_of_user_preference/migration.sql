/*
  Warnings:

  - You are about to drop the column `baseCurrency` on the `userpreference` table. All the data in the column will be lost.
  - You are about to drop the column `convertedCurrency` on the `userpreference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `userpreference` DROP COLUMN `baseCurrency`,
    DROP COLUMN `convertedCurrency`,
    ADD COLUMN `base` VARCHAR(191) NULL,
    ADD COLUMN `converted` VARCHAR(191) NULL;
