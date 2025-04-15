import { useState, useEffect } from "react";
import pinata from "@/lib/pinata";
import { NFTData } from "@/types/nft-types";
import { NFTMarketplaceABI } from "@/utils/abi/NFTMarketplaceABI";
import { useReadContract } from "wagmi";
import { sepolia } from "viem/chains";

const useNFTData = () => {
    const [nftData, setNFTData] = useState<NFTData[]>([]);

    const { data: nfts, isPending: listNFTIsLoading } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: NFTMarketplaceABI,
        functionName: "getAllNFTs",
        chainId: sepolia.id
    });

    useEffect(() => {
        const getFiles = async () => {
            if (!nfts || nfts.length === 0) return;
            
            const nftMetadata = (await Promise.all(
                nfts.map(async (nft) => {
                    try {
                        const res = await pinata.gateways.get(nft.tokenURI);
                        const metadata = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

                        return {
                            name: metadata?.name,
                            image: metadata?.image,
                            description: metadata?.description,
                            price: nft.price,
                            creator: nft.creator,
                            owner: nft.owner,
                            isForSale: nft.isForSale,
                            tokenURI: nft.tokenURI,
                            tokenId: nft.tokenId
                        } as NFTData;
                    } catch (error) {
                        console.error("Error fetching NFT metadata:", error);
                        return null;
                    }
                })
            )).filter((data): data is NFTData => data !== null);

            setNFTData(nftMetadata.filter(data => data.isForSale));
        };

        getFiles();
    }, [nfts]);

    return {
        data: nftData,
        isLoading: listNFTIsLoading,
    };
};

export default useNFTData;