-- CreateTable
CREATE TABLE "public"."SeatingCanvas" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT,
    "body" JSONB,
    "moduleId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SeatingCanvas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SeatingCanvas_slug_key" ON "public"."SeatingCanvas"("slug");

-- AddForeignKey
ALTER TABLE "public"."SeatingCanvas" ADD CONSTRAINT "SeatingCanvas_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
