"use client"

import Footer from "@/components/footer";
import Header from "@/components/header";
import NFTItems from "@/components/nft-items";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ExplorePage() {
    return (
        <main className="bg-darkprimary pt-20">
            <Header />
            <Suspense fallback={
                <div className="px-8 sm:px-12 mt-10">
                    <h1 className="font-bold text-2xl sm:text-4xl text-purple-500">Loading...</h1>
                </div>
            }>
                <ExploreContent />
            </Suspense>
            <Footer />
        </main>
    )
}

function ExploreContent() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    return (
        <div className="px-8 sm:px-12 mt-10">
            <h1 className="font-bold text-2xl sm:text-4xl text-purple-500">
                {searchQuery ? `Results for "${searchQuery}"` : "Explore NFTs"}
            </h1>
            <NFTItems searchQuery={searchQuery} />
        </div>
    )
}