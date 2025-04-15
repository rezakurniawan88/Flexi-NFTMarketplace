import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ walletAddress: string }>}) {
    const walletAddress = (await params).walletAddress;
    
    try {
        const user = await prisma.user.findUnique({ where: { walletAddress: walletAddress.toLowerCase() }});
        return NextResponse.json({ data: user }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Get User Data Failed" }, { status: 500 });
    }
}