-- CreateEnum
CREATE TYPE "OauthProvider" AS ENUM ('GOOGLE', 'GITHUB');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "OauthId" TEXT,
ADD COLUMN     "OauthProvider" "OauthProvider";
