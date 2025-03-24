import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req : NextRequest){
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if(!id){
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const nfts = await prisma.courseNFT.findMany({
        where: {
            courseId: id
        }
    });
    if(!nfts){
        return NextResponse.json({ error: "NFTs not found" }, { status: 404 });
    }
    const tokenURIs = nfts.map(nft => nft.tokenURI);
    return NextResponse.json(tokenURIs, { status: 200 });
}