-- AlterTable
ALTER TABLE `signature` MODIFY `type` ENUM('OrganizationCreation', 'OrganizationImageCIDChange', 'QuestCreation', 'ProposalCreation', 'WorkSubmission') NOT NULL;
