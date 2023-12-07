-- CreateTable
CREATE TABLE "_childComments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_childComments_AB_unique" ON "_childComments"("A", "B");

-- CreateIndex
CREATE INDEX "_childComments_B_index" ON "_childComments"("B");

-- AddForeignKey
ALTER TABLE "_childComments" ADD CONSTRAINT "_childComments_A_fkey" FOREIGN KEY ("A") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_childComments" ADD CONSTRAINT "_childComments_B_fkey" FOREIGN KEY ("B") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
