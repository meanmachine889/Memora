import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const instructor = req.nextUrl.searchParams.get("instructor");
    const id = req.nextUrl.searchParams.get("id");

    if (!instructor && !id) {
      return NextResponse.json(
        { error: "Instructor or ID is required" },
        { status: 400 }
      );
    }

    if (id) {
      const course = await prisma.course.findUnique({
        where: {
          id: id,
        },
      });

      return NextResponse.json({ course });
    }

    const courses = await prisma.course.findMany({
      where: {
        instructors: {
          has: instructor,
        },
      },
    });

    return NextResponse.json({ courses });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
