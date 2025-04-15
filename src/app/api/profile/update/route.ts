import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, username } = body;

    try {
        const user = await prisma.user.update({
            where: { email },
            data: { username }
        })
    
        return NextResponse.json({ data: user, message: "Profile Updated Successfull" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Profile Updated Failed" }, { status: 500 });
    }
}