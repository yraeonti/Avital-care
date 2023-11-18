/*
  Warnings:

  - Made the column `sessionTimeId` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_sessionTimeId_fkey`;

-- AlterTable
ALTER TABLE `Appointment` MODIFY `sessionTimeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_sessionTimeId_fkey` FOREIGN KEY (`sessionTimeId`) REFERENCES `SessionTime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
