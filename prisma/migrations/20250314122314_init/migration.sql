-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "instructors" TEXT[],
    "image" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseNFT" (
    "nftId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "tokenURI" TEXT NOT NULL,

    CONSTRAINT "CourseNFT_pkey" PRIMARY KEY ("nftId")
);

-- AddForeignKey
ALTER TABLE "CourseNFT" ADD CONSTRAINT "CourseNFT_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
