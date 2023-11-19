/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `LoginToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LoginToken_token_key" ON "LoginToken"("token");
