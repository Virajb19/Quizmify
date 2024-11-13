-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('mcq', 'open_ended');

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameType" "GameType" NOT NULL,
    "topic" TEXT NOT NULL,
    "timeStarted" TIMESTAMP(3) NOT NULL,
    "timeEnded" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "questionType" "GameType" NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "options" JSONB,
    "percentageCorrect" DOUBLE PRECISION,
    "userAnswer" TEXT,
    "isCorrect" BOOLEAN,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic_count" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Topic_count_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Game_userId_idx" ON "Game"("userId");

-- CreateIndex
CREATE INDEX "Question_gameId_idx" ON "Question"("gameId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
