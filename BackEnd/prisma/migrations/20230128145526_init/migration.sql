-- CreateTable
CREATE TABLE `signature` (
    `nonce` BIGINT NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `signature` VARCHAR(191) NOT NULL,
    `type` ENUM('OrganizationCreation', 'QuestCreation', 'ProposalCreation', 'WorkSubmission') NOT NULL,

    PRIMARY KEY (`nonce`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
