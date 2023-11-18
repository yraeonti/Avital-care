/*
  Warnings:

  - You are about to alter the column `status` on the `Appointment` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Appointment` MODIFY `status` ENUM('PENDING', 'CANCELLED', 'DONE') NOT NULL DEFAULT 'PENDING';
