/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[walletAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");
