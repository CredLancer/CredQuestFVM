/*
  Warnings:

  - Added the required column `deadline` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Quest` ADD COLUMN `deadline` DATETIME(3) NOT NULL;
