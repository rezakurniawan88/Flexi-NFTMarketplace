"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { LucidePlus } from "lucide-react";

export default function Jumbotron() {
    const { data: session } = useSession();

    return (
        <div>
            <div className="absolute inset-0 pointer-events-none">
                <div className="animate-float-1 absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-20 -left-40"></div>
                <div className="animate-float-2 absolute w-80 h-80 bg-purple-600/15 rounded-full blur-3xl top-1/2 right-0"></div>
                <div className="animate-float-3 absolute w-64 h-64 bg-purple-400/20 rounded-full blur-3xl bottom-20 left-1/3"></div>
            </div>

            <div className="w-full h-[75vh] flex flex-col items-center justify-center relative z-10">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl sm:text-7xl font-extrabold bg-gradient-to-br from-purple-400 via-purple-600 to-purple-800 bg-clip-text text-transparent">
                        Discover Your NFTs in Flexi.
                    </h1>

                    <p className="text-sm sm:text-lg font-light text-purple-200 drop-shadow-[0_0_10px_#a855f755] hover:text-purple-100 transition-all duration-200">Join the community of thousands digital artists to buy, sell, or exchange exclusive NFTs.</p>
                </div>

                <div className="flex gap-4 mt-10">
                    <Link href={"/explore"}>
                        <Button className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 
                         shadow-[0_0_15px_#a855f7] hover:shadow-[0_0_20px_#a855f7] py-6 px-10 sm:py-7 sm:px-12 text-sm sm:text-base rounded-full transform hover:scale-105 transition-all duration-300">Explore</Button>
                    </Link>
                    <Link href={session ? "/profile" : "#"}>
                        <Button className="flex items-center bg-white/90 text-slate-900 py-6 px-7 sm:py-7 sm:px-12 text-xs sm:text-base border-2 border-white/20 shadow-[0_0_10px_#ffffff] rounded-full hover:bg-white/95 hover:border-purple-200 hover:shadow-[0_0_15px_#ffffff] transform hover:scale-105 transition-all duration-300">
                            <LucidePlus className="w-5 h-5 sm:w-6 sm:h-6" />
                            Create NFT
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
