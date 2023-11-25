/*
  Warnings:

  - Added the required column `testName` to the `TestResults` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TestResults` ADD COLUMN `testName` VARCHAR(191) NOT NULL;
