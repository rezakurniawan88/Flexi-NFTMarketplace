import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { walletAddress } = body;
    const lowercaseAddress = walletAddress.toLowerCase();

    if (!walletAddress) {
        return NextResponse.json({ message: "Invalid wallet address" }, { status: 400 });
    }
    
    const nonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    try {
        const result = await prisma.user.upsert({
            where: { walletAddress: lowercaseAddress },
            create: { walletAddress: lowercaseAddress, nonce },
            update: { nonce }
        })
        
        const responsePayload = {
            nonce: result.nonce,
            status: "success"
        }
    
        return NextResponse.json(responsePayload, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Set Nonce Failed" }, { status: 500 });
    }
}