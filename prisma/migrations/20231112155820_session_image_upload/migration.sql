/*
  Warnings:

  - You are about to drop the column `appointmentNo` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `sessionTime` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionTimeId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appointmentId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionTimeId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `appointmentNo`,
    ADD COLUMN `appointmentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `sessionTimeId` INTEGER NOT NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `sessionTime`;

-- CreateTable
CREATE TABLE `SessionTime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startTime` TIME NOT NULL,
    `endTime` TIME NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `sessionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Appointment_sessionTimeId_key` ON `Appointment`(`sessionTimeId`);

-- AddForeignKey
ALTER TABLE `SessionTime` ADD CONSTRAINT `SessionTime_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_sessionTimeId_fkey` FOREIGN KEY (`sessionTimeId`) REFERENCES `SessionTime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
