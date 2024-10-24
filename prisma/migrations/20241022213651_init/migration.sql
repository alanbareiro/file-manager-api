/*
  Warnings:

  - You are about to drop the column `filepath` on the `file` table. All the data in the column will be lost.
  - Added the required column `data` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `filepath`,
    ADD COLUMN `data` LONGBLOB NOT NULL;
