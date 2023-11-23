-- AlterTable
ALTER TABLE `Diagnosis` MODIFY `complaint` MEDIUMTEXT NULL,
    MODIFY `complaint_history` MEDIUMTEXT NULL,
    MODIFY `recommended_tests` MEDIUMTEXT NULL,
    MODIFY `diagnosis_confirmation` MEDIUMTEXT NULL,
    MODIFY `prescription` MEDIUMTEXT NULL,
    MODIFY `prescription_comment` MEDIUMTEXT NULL,
    MODIFY `management_plan` MEDIUMTEXT NULL;
