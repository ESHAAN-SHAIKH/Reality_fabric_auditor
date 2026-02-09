-- CreateTable
CREATE TABLE "DetectionSession" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "confidence" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DetectionSession_pkey" PRIMARY KEY ("id")
);
