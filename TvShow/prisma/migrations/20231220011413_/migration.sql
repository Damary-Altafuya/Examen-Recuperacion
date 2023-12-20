-- CreateTable
CREATE TABLE "TvShow" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "investment" INTEGER NOT NULL,
    "cast" TEXT NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "TvShow_pkey" PRIMARY KEY ("id")
);
