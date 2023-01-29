-- CreateTable
CREATE TABLE `Quest` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `value` BIGINT NOT NULL,
    `status` ENUM('Open', 'Closed', 'Awarded') NOT NULL DEFAULT 'Open',
    `fileCID` VARCHAR(191) NOT NULL,
    `orgId` VARCHAR(191) NOT NULL,
    `blockNumber` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proposal` (
    `id` VARCHAR(191) NOT NULL,
    `proposer` VARCHAR(191) NOT NULL,
    `blockNumber` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `fileCID` VARCHAR(191) NOT NULL,
    `status` ENUM('Proposed', 'Accepted', 'Rejected') NOT NULL DEFAULT 'Proposed',
    `questId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProposalStatusChange` (
    `transactionHash` VARCHAR(191) NOT NULL,
    `blockNumber` INTEGER NOT NULL,
    `transactionIndex` INTEGER NOT NULL,
    `logIndex` INTEGER NOT NULL,
    `oldStatus` ENUM('Proposed', 'Accepted', 'Rejected') NOT NULL,
    `newStatus` ENUM('Proposed', 'Accepted', 'Rejected') NOT NULL,
    `proposalId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`transactionHash`, `blockNumber`, `transactionIndex`, `logIndex`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Quest` ADD CONSTRAINT `Quest_orgId_fkey` FOREIGN KEY (`orgId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proposal` ADD CONSTRAINT `Proposal_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `Quest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProposalStatusChange` ADD CONSTRAINT `ProposalStatusChange_proposalId_fkey` FOREIGN KEY (`proposalId`) REFERENCES `Proposal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
