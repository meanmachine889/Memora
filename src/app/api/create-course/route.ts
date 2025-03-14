import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { title, instructors, image, images } = await req.json();

    const newCourse = await prisma.course.create({
      data: {
        title,
        instructors,
        image,
        images,
      },
    });

    return NextResponse.json(
      { message: "Course created!", course: newCourse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
