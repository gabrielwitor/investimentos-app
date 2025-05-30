/*
  Warnings:

  - You are about to drop the column `valor` on the `ativos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigo]` on the table `ativos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo` to the `ativos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `ativos` table without a default value. This is not possible if the table is not empty.

*/
-- Add new columns with default values first
ALTER TABLE `ativos` 
  ADD COLUMN `codigo` VARCHAR(191) NULL,
  ADD COLUMN `descricao` VARCHAR(191) NULL,
  ADD COLUMN `tipo` VARCHAR(191) NULL;

-- Update existing records with sample data
UPDATE `ativos` SET 
  `codigo` = CONCAT('ATIVO', SUBSTRING(`id`, 1, 3)),
  `tipo` = 'Desconhecido',
  `descricao` = CONCAT('Ativo importado: ', `nome`)
WHERE `codigo` IS NULL;

-- Make the new columns required
ALTER TABLE `ativos` 
  MODIFY COLUMN `codigo` VARCHAR(191) NOT NULL,
  MODIFY COLUMN `tipo` VARCHAR(191) NOT NULL;

-- Drop the old valor column
ALTER TABLE `ativos` DROP COLUMN `valor`;

-- Create unique index
CREATE UNIQUE INDEX `ativos_codigo_key` ON `ativos`(`codigo`);
