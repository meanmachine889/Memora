import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();


export async function GET() {
    try {
        const response = await Prisma.course.findMany();
        return NextResponse.json({status : 200, data: response});
    } catch (error) {
        return NextResponse.json({status : 500, data: (error instanceof Error) ? error.message : "An unknown error occurred"});
    }
}