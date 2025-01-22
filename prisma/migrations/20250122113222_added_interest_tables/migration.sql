/*
  Warnings:

  - You are about to drop the `UserResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserResponse" DROP CONSTRAINT "UserResponse_quotationId_fkey";

-- DropForeignKey
ALTER TABLE "UserResponse" DROP CONSTRAINT "UserResponse_userId_fkey";

-- DropTable
DROP TABLE "UserResponse";

-- CreateTable
CREATE TABLE "Topics" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "Topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuotationResponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quotationId" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "topicsId" TEXT,

    CONSTRAINT "UserQuotationResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBookResponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "BookId" TEXT NOT NULL,
    "response" TEXT NOT NULL,

    CONSTRAINT "UserBookResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTopicResponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "response" TEXT NOT NULL,

    CONSTRAINT "UserTopicResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserQuotationResponse" ADD CONSTRAINT "UserQuotationResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuotationResponse" ADD CONSTRAINT "UserQuotationResponse_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuotationResponse" ADD CONSTRAINT "UserQuotationResponse_topicsId_fkey" FOREIGN KEY ("topicsId") REFERENCES "Topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookResponse" ADD CONSTRAINT "UserBookResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookResponse" ADD CONSTRAINT "UserBookResponse_BookId_fkey" FOREIGN KEY ("BookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTopicResponse" ADD CONSTRAINT "UserTopicResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTopicResponse" ADD CONSTRAINT "UserTopicResponse_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
