/*
  Warnings:

  - You are about to drop the column `fetched_date` on the `exchangerate` table. All the data in the column will be lost.
  - You are about to drop the column `time_stamp` on the `exchangerate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `exchangerate` DROP COLUMN `fetched_date`,
    DROP COLUMN `time_stamp`,
    ADD COLUMN `fetched_datetime` VARCHAR(191) NULL,
    ADD COLUMN `is_data_fetched` VARCHAR(191) NULL;
