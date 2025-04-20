import useNFTData from "@/hooks/useNFTData";
import SkeletonCard from "./ui/card-skeleton";
import NFTCard from "./nft-card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface NFTItemsProps {
    searchQuery?: string;
}

export default function NFTItems({ searchQuery = "" }: NFTItemsProps) {
    const { data: allNftsData, isLoading: listNFTIsLoading } = useNFTData();

    const filteredNfts = allNftsData.filter((nft) =>
        nft?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ScrollArea className="w-full my-8 sm:my-10">
            <div className="w-full py-6">
                <div className="flex gap-6 min-w-max px-2">
                    {listNFTIsLoading ? (
                        <SkeletonCard col={4} />
                    ) : filteredNfts.length > 0 ? (
                        filteredNfts.map((nft, index) => (
                            <NFTCard
                                key={index}
                                nft={nft}
                            />
                        ))
                    ) : (
                        <p className="font-semibold text-slate-300/50">
                            {searchQuery ? `No results found for "${searchQuery}"` : "No NFTs found"}
                        </p>
                    )}
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
