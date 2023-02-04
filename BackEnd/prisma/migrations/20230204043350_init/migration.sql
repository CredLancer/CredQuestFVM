-- AlterTable
ALTER TABLE `Proposal` ADD COLUMN `workCID` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Credential` (
    `id` VARCHAR(191) NOT NULL,
    `holderAddress` VARCHAR(191) NOT NULL,
    `transactionHash` VARCHAR(191) NOT NULL,
    `blockNumber` INTEGER NOT NULL,
    `transactionIndex` INTEGER NOT NULL,
    `logIndex` INTEGER NOT NULL,

    UNIQUE INDEX `Credential_transactionHash_blockNumber_transactionIndex_logI_key`(`transactionHash`, `blockNumber`, `transactionIndex`, `logIndex`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Credential` ADD CONSTRAINT `Credential_holderAddress_fkey` FOREIGN KEY (`holderAddress`) REFERENCES `Lancer`(`address`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Credential` ADD CONSTRAINT `Credential_id_fkey` FOREIGN KEY (`id`) REFERENCES `Quest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
