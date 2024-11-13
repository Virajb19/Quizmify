/*
  Warnings:

  - A unique constraint covering the columns `[topic]` on the table `Topic_count` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Topic_count_topic_key" ON "Topic_count"("topic");
