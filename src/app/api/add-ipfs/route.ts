import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req : NextRequest) {
    try {
        const { courseId, uri } = await req.json();
        const course = await prisma.course.findUnique({
            where: {
                id: courseId
            }
        });
        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }
        const nft = await prisma.courseNFT.create({
            data: {
                tokenURI: uri,
                course: {
                    connect: {
                        id: courseId
                    }
                }
            }
        });

        return NextResponse.json(nft, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}