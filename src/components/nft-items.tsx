import useNFTData from "@/hooks/useNFTData";
import SkeletonCard from "./ui/card-skeleton";
import NFTCard from "./nft-card";

interface NFTItemsProps {
    searchQuery?: string;
}

export default function NFTItems({ searchQuery = "" }: NFTItemsProps) {
    const { data: allNftsData, isLoading: listNFTIsLoading } = useNFTData();

    const filteredNfts = allNftsData.filter((nft) =>
        nft?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full flex flex-wrap gap-6 py-8 sm:py-10">
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
    );
}
