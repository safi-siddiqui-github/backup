/*
  Warnings:

  - The primary key for the `BlogCategoriesOnPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignedBy` on the `BlogCategoriesOnPosts` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `BlogCategoriesOnPosts` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `BlogCategoriesOnPosts` table. All the data in the column will be lost.
  - Added the required column `blogCategoryId` to the `BlogCategoriesOnPosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogPostId` to the `BlogCategoriesOnPosts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BlogCategoriesOnPosts" DROP CONSTRAINT "BlogCategoriesOnPosts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "BlogCategoriesOnPosts" DROP CONSTRAINT "BlogCategoriesOnPosts_postId_fkey";

-- AlterTable
ALTER TABLE "BlogCategoriesOnPosts" DROP CONSTRAINT "BlogCategoriesOnPosts_pkey",
DROP COLUMN "assignedBy",
DROP COLUMN "categoryId",
DROP COLUMN "postId",
ADD COLUMN     "assignedById" TEXT,
ADD COLUMN     "blogCategoryId" INTEGER NOT NULL,
ADD COLUMN     "blogPostId" INTEGER NOT NULL,
ADD CONSTRAINT "BlogCategoriesOnPosts_pkey" PRIMARY KEY ("blogPostId", "blogCategoryId");

-- AddForeignKey
ALTER TABLE "BlogCategoriesOnPosts" ADD CONSTRAINT "BlogCategoriesOnPosts_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "BlogPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogCategoriesOnPosts" ADD CONSTRAINT "BlogCategoriesOnPosts_blogCategoryId_fkey" FOREIGN KEY ("blogCategoryId") REFERENCES "BlogCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
