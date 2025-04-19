import pinata from "@/lib/pinata";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json({ message: "File not found" }, { status: 400 });
    }

    try {
        const result = await pinata.upload.file(file);
        return NextResponse.json({ ipfsHash: result?.IpfsHash }, { status: 200 });
    } catch (error) {
        console.error("Error uploading file to IPFS:", error);
        return NextResponse.json({ message: "Upload failed" }, { status: 500 });
    }
}