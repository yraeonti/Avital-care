-- CreateTable
CREATE TABLE `Diagnosis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` VARCHAR(191) NOT NULL,
    `doctorName` VARCHAR(191) NOT NULL,
    `complaint` VARCHAR(191) NOT NULL,
    `complaint_history` VARCHAR(191) NOT NULL,
    `recommended_tests` VARCHAR(191) NOT NULL,
    `diagnosis_confirmation` VARCHAR(191) NOT NULL,
    `prescription` VARCHAR(191) NOT NULL,
    `prescription_comment` VARCHAR(191) NOT NULL,
    `management_plan` VARCHAR(191) NOT NULL,

    INDEX `Diagnosis_patientId_idx`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Diagnosis` ADD CONSTRAINT `Diagnosis_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
