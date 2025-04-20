"use client"

import Footer from "@/components/footer";
import Header from "@/components/header";
import Jumbotron from "@/components/jumbotron";
import NFTItems from "@/components/nft-items";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-darkprimary relative overflow-x-hidden pt-20">
      <Header />
      <div className="px-8 sm:px-12 mt-8">
        <Jumbotron />

        <div className="mt-10">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl sm:text-4xl text-purple-500">Explore NFTs</h1>
            <Link href={"/explore"}>
              <Button className="bg-white px-7 py-4 sm:py-5 sm:px-10 border border-gray-300 text-slate-900 text-xs sm:text-sm shadow-[0_0_10px_#ffffff] rounded-full hover:bg-white hover:border-purple-200 hover:shadow-[0_0_20px_#ffffff] hover:font-semibold">See all</Button>
            </Link>
          </div>

          <NFTItems />
        </div>
      </div>
      <Footer />
    </main>
  );
}