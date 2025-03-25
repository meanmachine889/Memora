import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();


export async function GET(req:NextRequest) {
    try {
        const response = await Prisma.course.findMany();
        return NextResponse.json({status : 200, data: response});
    } catch (error) {
        return NextResponse.json({status : 500, data: error.message});
    }
}