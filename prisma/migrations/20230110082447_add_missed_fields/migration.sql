/*
  Warnings:

  - You are about to drop the column `kzy` on the `exchangerate` table. All the data in the column will be lost.
  - Added the required column `kzt` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mnt` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mop` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mro` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mur` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mvr` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mwk` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mxn` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pln` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pyg` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qar` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ron` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rsd` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rub` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rwg` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sar` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sbd` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scr` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sdg` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sek` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sgd` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shp` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xaf` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xag` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xau` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xcd` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xdr` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xof` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xpf` to the `ExchangeRate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `exchangerate` DROP COLUMN `kzy`,
    ADD COLUMN `kzt` DOUBLE NOT NULL,
    ADD COLUMN `mnt` DOUBLE NOT NULL,
    ADD COLUMN `mop` DOUBLE NOT NULL,
    ADD COLUMN `mro` DOUBLE NOT NULL,
    ADD COLUMN `mur` DOUBLE NOT NULL,
    ADD COLUMN `mvr` DOUBLE NOT NULL,
    ADD COLUMN `mwk` DOUBLE NOT NULL,
    ADD COLUMN `mxn` DOUBLE NOT NULL,
    ADD COLUMN `pln` DOUBLE NOT NULL,
    ADD COLUMN `pyg` DOUBLE NOT NULL,
    ADD COLUMN `qar` DOUBLE NOT NULL,
    ADD COLUMN `ron` DOUBLE NOT NULL,
    ADD COLUMN `rsd` DOUBLE NOT NULL,
    ADD COLUMN `rub` DOUBLE NOT NULL,
    ADD COLUMN `rwg` DOUBLE NOT NULL,
    ADD COLUMN `sar` DOUBLE NOT NULL,
    ADD COLUMN `sbd` DOUBLE NOT NULL,
    ADD COLUMN `scr` DOUBLE NOT NULL,
    ADD COLUMN `sdg` DOUBLE NOT NULL,
    ADD COLUMN `sek` DOUBLE NOT NULL,
    ADD COLUMN `sgd` DOUBLE NOT NULL,
    ADD COLUMN `shp` DOUBLE NOT NULL,
    ADD COLUMN `xaf` DOUBLE NOT NULL,
    ADD COLUMN `xag` DOUBLE NOT NULL,
    ADD COLUMN `xau` DOUBLE NOT NULL,
    ADD COLUMN `xcd` DOUBLE NOT NULL,
    ADD COLUMN `xdr` DOUBLE NOT NULL,
    ADD COLUMN `xof` DOUBLE NOT NULL,
    ADD COLUMN `xpf` DOUBLE NOT NULL;
