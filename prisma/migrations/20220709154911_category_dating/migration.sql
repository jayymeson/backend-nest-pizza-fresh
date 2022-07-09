-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_table_id_fkey";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "table_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
