/*
  Warnings:

  - You are about to drop the column `adminId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_adminId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "adminId";

-- DropTable
DROP TABLE "Admin";
