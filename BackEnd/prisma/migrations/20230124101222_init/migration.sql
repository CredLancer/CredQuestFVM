-- CreateTable
CREATE TABLE `Organization` (
    `id` VARCHAR(191) NOT NULL,
    `admin` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `imageCID` VARCHAR(191) NOT NULL,
    `imageURL` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganizationDetailUpdate` (
    `transactionHash` VARCHAR(191) NOT NULL,
    `blockNumber` INTEGER NOT NULL,
    `transactionIndex` INTEGER NOT NULL,
    `logIndex` INTEGER NOT NULL,
    `type` ENUM('AdminChange', 'NameChange', 'ImageCIDChange') NOT NULL,
    `from` VARCHAR(191) NOT NULL,
    `to` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`transactionHash`, `blockNumber`, `transactionIndex`, `logIndex`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
