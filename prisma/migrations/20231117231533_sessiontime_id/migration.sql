-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_sessionTimeId_fkey`;

-- AlterTable
ALTER TABLE `Appointment` MODIFY `sessionTimeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_sessionTimeId_fkey` FOREIGN KEY (`sessionTimeId`) REFERENCES `SessionTime`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
