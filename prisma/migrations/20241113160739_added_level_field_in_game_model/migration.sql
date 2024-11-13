-- CreateEnum
CREATE TYPE "Level" AS ENUM ('easy', 'medium', 'hard');

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'hard';
