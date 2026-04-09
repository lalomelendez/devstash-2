-- CreateIndex
CREATE INDEX "items_userId_isFavorite_idx" ON "items"("userId", "isFavorite");

-- CreateIndex
CREATE INDEX "items_updatedAt_idx" ON "items"("updatedAt");
