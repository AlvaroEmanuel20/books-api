/*
  Warnings:

  - Added the required column `genre` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "genre" TEXT NOT NULL;
