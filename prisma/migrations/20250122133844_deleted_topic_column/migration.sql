/*
  Warnings:

  - You are about to drop the column `topicsId` on the `UserQuotationResponse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserQuotationResponse" DROP CONSTRAINT "UserQuotationResponse_topicsId_fkey";

-- AlterTable
ALTER TABLE "UserQuotationResponse" DROP COLUMN "topicsId";
