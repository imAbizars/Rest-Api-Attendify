/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Jabatan" AS ENUM ('HRD', 'Headchef', 'Kasir', 'Bartender', 'Chef', 'Waiter');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "jabatan" "Jabatan" NOT NULL DEFAULT 'Waiter';

-- DropEnum
DROP TYPE "Role";
