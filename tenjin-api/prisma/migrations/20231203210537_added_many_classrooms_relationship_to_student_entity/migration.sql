/*
  Warnings:

  - You are about to drop the column `classroomId` on the `student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `student` DROP FOREIGN KEY `Student_classroomId_fkey`;

-- AlterTable
ALTER TABLE `student` DROP COLUMN `classroomId`;

-- CreateTable
CREATE TABLE `_ClassroomToStudent` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ClassroomToStudent_AB_unique`(`A`, `B`),
    INDEX `_ClassroomToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ClassroomToStudent` ADD CONSTRAINT `_ClassroomToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Classroom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClassroomToStudent` ADD CONSTRAINT `_ClassroomToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
