/*
  Warnings:

  - Made the column `fetched_datetime` on table `exchangerate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_data_fetched` on table `exchangerate` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `exchangerate` MODIFY `fetched_datetime` VARCHAR(191) NOT NULL,
    MODIFY `is_data_fetched` VARCHAR(191) NOT NULL;
