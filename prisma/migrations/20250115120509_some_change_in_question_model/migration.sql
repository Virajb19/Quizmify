-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_gameId_fkey";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
