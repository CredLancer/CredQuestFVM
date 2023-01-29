/*
  Warnings:

  - Added the required column `orgId` to the `OrganizationDetailUpdate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrganizationDetailUpdate` ADD COLUMN `orgId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `OrganizationDetailUpdate` ADD CONSTRAINT `OrganizationDetailUpdate_orgId_fkey` FOREIGN KEY (`orgId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
