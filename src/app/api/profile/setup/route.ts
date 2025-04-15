import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/next-auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { username, email, walletAddress } = await req.json();

        const existingEmail = await prisma.user.findUnique({
            where: { email }
        });

        if (existingEmail && existingEmail.walletAddress !== walletAddress.toLowerCase()) {
            return NextResponse.json({ 
                message: "Email already in use" 
            }, { status: 400 });
        }

        const user = await prisma.user.update({
            where: { walletAddress: walletAddress.toLowerCase() },
            data: {
                username,
                email,
                needProfileSetup: false
            }
        });

        return NextResponse.json({
            data: user,
            message: "Profile setup completed successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("PROFILE_SETUP_ERROR:", error);
        return NextResponse.json({ message: "Failed to setup profile" }, { status: 500 });
    }
}
