-- AlterTable
ALTER TABLE `Diagnosis` MODIFY `complaint` VARCHAR(191) NULL,
    MODIFY `complaint_history` VARCHAR(191) NULL,
    MODIFY `recommended_tests` VARCHAR(191) NULL,
    MODIFY `diagnosis_confirmation` VARCHAR(191) NULL,
    MODIFY `prescription` VARCHAR(191) NULL,
    MODIFY `prescription_comment` VARCHAR(191) NULL,
    MODIFY `management_plan` VARCHAR(191) NULL;
