/*
  Warnings:

  - You are about to drop the column `description` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `fileCID` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Quest` table. All the data in the column will be lost.
  - Added the required column `questCID` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quest` DROP COLUMN `description`,
    DROP COLUMN `fileCID`,
    DROP COLUMN `title`,
    ADD COLUMN `questCID` VARCHAR(191) NOT NULL;
