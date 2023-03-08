-- CreateTable
CREATE TABLE "Book" (
    "isbn" VARCHAR(13) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT,
    "pages" INTEGER NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("isbn")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_name_key" ON "Book"("name");
