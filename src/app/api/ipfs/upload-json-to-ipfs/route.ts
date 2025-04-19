import pinata from "@/lib/pinata";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { metadata } = body;

    if(!metadata) {
        return new Response(JSON.stringify({ message: "Metadata not found" }), { status: 400 });
    }

    try {
        const result = await pinata.upload.json(metadata);
        return NextResponse.json({ ipfsHash: result?.IpfsHash }, { status: 200 });
    } catch (error) {
        console.error("Error uploading json to IPFS:", error);
        return NextResponse.json({ message: "Upload failed" }, { status: 500 });
    }
}