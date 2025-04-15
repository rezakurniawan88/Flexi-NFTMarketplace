import Image from "next/image";
import { ethers } from "ethers";
import Link from "next/link";
import { NFTData } from "@/types/nft-types";

const NFTCard = ({ nft }: { nft: NFTData }) => {
    return (
        <div className="relative w-48 sm:w-64 p-4 bg-[#110823]/50 backdrop-blur-xl rounded-2xl border border-purple-800/30 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_40px_#a855f715] transform hover:-translate-y-2 cursor-pointer">
            <Link href={`/detail/${nft.tokenId}`} >
                <div className="w-40 h-36 sm:w-56 sm:h-60 bg-[#1d0d3a] mb-4 rounded-xl overflow-hidden">
                    <Image
                        src={`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${nft.image}`}
                        alt={nft?.name ? nft.name : "NFT Image"}
                        width={200}
                        height={200}
                        className="w-full h-full rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                </div>
                <div>
                    <h3 className="text-base sm:text-xl font-bold bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent [text-shadow:_0_0_15px_#a855f730]">{nft.name}</h3>
                    <p className="text-xs sm:text-sm text-purple-200/80 mt-1 truncate">{nft.owner}</p>
                </div>
                <div className="mt-4 sm:mt-6">
                    <p className="text-[0.65rem] sm:text-xs text-purple-300/60">Current Price</p>
                    <p className="text-base sm:text-lg font-semibold text-purple-300 truncate pr-24">{nft?.price ? ethers.formatEther(nft?.price.toString()) : "N/A"} ETH</p>
                </div>
                <button className="absolute bottom-5 right-3 sm:right-3 font-semibold text-xs sm:text-sm bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/30 rounded-lg text-purple-200 transition-all duration-200 shadow-[0_0_15px_#a855f710] hover:shadow-[0_0_20px_#a855f715] py-1.5 sm:py-2 px-4 sm:px-6">Buy now</button>
            </Link>
        </div>
    );
};

export default NFTCard;