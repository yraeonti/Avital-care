-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_sessionTimeId_fkey`;

-- DropForeignKey
ALTER TABLE `Diagnosis` DROP FOREIGN KEY `Diagnosis_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_specialtyId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `SessionTime` DROP FOREIGN KEY `SessionTime_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `TestResults` DROP FOREIGN KEY `TestResults_patientId_fkey`;

-- RenameIndex
ALTER TABLE `Appointment` RENAME INDEX `Appointment_patientId_fkey` TO `Appointment_patientId_idx`;

-- RenameIndex
ALTER TABLE `Profile` RENAME INDEX `Profile_specialtyId_fkey` TO `Profile_specialtyId_idx`;

-- RenameIndex
ALTER TABLE `SessionTime` RENAME INDEX `SessionTime_sessionId_fkey` TO `SessionTime_sessionId_idx`;

-- RenameIndex
ALTER TABLE `TestResults` RENAME INDEX `TestResults_patientId_fkey` TO `TestResults_patientId_idx`;
