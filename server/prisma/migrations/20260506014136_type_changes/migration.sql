-- AlterTable
ALTER TABLE `KopSurat` MODIFY `logoUrl` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Role` MODIFY `permissions` TEXT NULL;

-- AlterTable
ALTER TABLE `SuratKeluar` MODIFY `isiSurat` TEXT NULL;

-- AlterTable
ALTER TABLE `TemplateSurat` MODIFY `konten` TEXT NOT NULL;
