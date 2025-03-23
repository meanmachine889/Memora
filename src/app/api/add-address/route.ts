import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const Prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { id, address } = await req.json();
    const course = await Prisma.course.findUnique({
      where: {
        id,
      },
    });
    if (!course) {
      return NextResponse.json(
        { message: "Course doesn't exist" },
        { status: 404 }
      );
    }
    const updatedCourse = await Prisma.course.update({
      where: {
        id,
      },
      data: {
        address,
      },
    });
    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
