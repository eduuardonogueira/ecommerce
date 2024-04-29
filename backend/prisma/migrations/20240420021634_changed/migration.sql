/*
  Warnings:

  - You are about to drop the column `other_image_link` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "other_image_link",
ADD COLUMN     "other_images_link" VARCHAR(1000);
