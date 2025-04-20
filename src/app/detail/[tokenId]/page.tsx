"use client"

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import pinata from "@/lib/pinata";
import { NFTData } from "@/types/nft-types";
import { NFTMarketplaceABI } from "@/utils/abi/NFTMarketplaceABI";
import { ethers } from "ethers";
import { LucideLoader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { sepolia } from "viem/chains";
import { useAccount, useReadContract, useSignMessage, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export default function DetailNFTPage({ params }: { params: Promise<{ tokenId: string }> }) {
    const { tokenId } = use(params);
    const router = useRouter();
    const [NFTData, setNFTData] = useState({} as NFTData);
    const [isBuyModalOpen, setIsBuyModalOpen] = useState<boolean>(false);
    const { signMessageAsync } = useSignMessage();
    const { data: hash, writeContract, error: ctError, isPending } = useWriteContract();
    const { isLoading: isWaitingForTransaction, isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
        hash: hash,
        chainId: sepolia.id,
        confirmations: 1,
    });
    const { toast } = useToast();
    const { isConnected } = useAccount();
    const { data: nft, isPending: listNFTIsLoading, refetch: refetchNFTDetail } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: NFTMarketplaceABI,
        functionName: "getNFTDetails",
        args: [BigInt(tokenId)],
        chainId: sepolia.id
    });
    const [buyNFTIsLoading, setBuyNFTIsLoading] = useState<boolean>(false);

    const handleBuyNFT = async ({ tokenId, price }: { tokenId: bigint | undefined; price: bigint | undefined }) => {
        setBuyNFTIsLoading(true);
        try {
            if (!isConnected) {
                toast({
                    title: "Error",
                    description: "Wallet not connected",
                    variant: "destructive",
                })
                throw new Error("Wallet not connected")
            }

            await signMessageAsync({ message: "Confirm buy NFT" })

            await writeContract({
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                abi: NFTMarketplaceABI,
                functionName: "buyNFT",
                args: [tokenId ?? BigInt(0)],
                value: price,
                chainId: sepolia.id
            })

            setBuyNFTIsLoading(true);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error buy nft",
                description: "Failed to buy NFT",
                variant: "destructive",
            });
            setBuyNFTIsLoading(false);
        }
    }

    useEffect(() => {
        if (isTransactionSuccess) {
            toast({
                title: "Buy NFT Success",
                description: "NFT buying successfully",
                className: "bg-[#110823] text-gray-200 border border-purple-800/40",
            });
            setBuyNFTIsLoading(false);
            setIsBuyModalOpen(false);
            refetchNFTDetail();
            router.push("/profile?tabs=collectibles")
        }
    }, [isTransactionSuccess, refetchNFTDetail, router, toast]);

    useEffect(() => {
        if (ctError) {
            toast({
                title: "Error buy NFT",
                description: ctError.message,
                variant: "destructive",
            });
            setBuyNFTIsLoading(false);
            setIsBuyModalOpen(false);
        }
    }, [ctError, toast]);

    useEffect(() => {
        const getFiles = async () => {
            if (!nft) return;
            try {
                const res = await pinata.gateways.get(nft.tokenURI);
                const nftMetadata = {
                    ...(typeof res.data === "object" && res.data !== null ? res.data : {}),
                    price: nft.price,
                    creator: nft.creator,
                    owner: nft.owner,
                    isForSale: nft.isForSale,
                    tokenURI: nft.tokenURI,
                    tokenId: nft.tokenId,
                };
                setNFTData(nftMetadata);
            } catch (error) {
                console.error("Error fetching NFT metadata:", error);
                return null;
            }
        };

        getFiles();
    }, [nft]);

    return (
        <main className="bg-darkprimary pt-20">
            <Header />
            <h1 className="text-3xl font-bold pl-8 sm:pl-16 mt-8 text-purple-500">Detail NFT</h1>
            {listNFTIsLoading ? (
                <div className="w-full flex h-[80vh]">
                    <div className="flex justify-center items-center w-1/2">
                        <div className="w-[80%] h-[80%] bg-[#110823] rounded-lg animate-pulse" />
                    </div>
                    <div className="w-1/2 p-10 space-y-4">
                        <div className="w-1/2 h-12 bg-[#110823] rounded-lg animate-pulse" />
                        <div className="w-full h-24 bg-[#110823] rounded-lg animate-pulse" />
                        <div className="w-[60%] h-12 bg-[#110823] rounded-lg animate-pulse" />
                        <div className="flex justify-between items-center pt-36">
                            <div className="w-[20%] h-12 bg-[#110823] rounded-lg animate-pulse" />
                            <div className="w-[70%] h-12 bg-[#110823] rounded-lg animate-pulse" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col sm:flex-row sm:h-[80vh]">
                    <div className="flex justify-center items-center w-full sm:w-1/2">
                        <div className="w-[85%] h-[85%] sm:w-[80%] sm:h-[80%] bg-[#110823] rounded-xl overflow-hidden mt-6 sm:mt-0">
                            <Image
                                src={`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${NFTData?.image}`}
                                alt={NFTData?.name || "image"}
                                width={500}
                                height={500}
                                className="w-full h-full rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out bg-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 p-10 space-y-4">
                        <h1 className="font-bold text-3xl sm:text-4xl bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent [text-shadow:_0_0_15px_#a855f730]">{NFTData?.name || "Title"}</h1>
                        <p className="text-sm text-zinc-400 break-words">{NFTData?.description || "Description"}</p>
                        <div>
                            <h1 className="font-bold bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent [text-shadow:_0_0_15px_#a855f730]">Owner</h1>
                            <h1 className="text-sm sm:text-base font-semibold text-gray-400 break-words">{NFTData?.owner || "0xaaaaaaaaaaaaaaaa"}</h1>
                        </div>
                        <div className="flex justify-between items-center pt-20 sm:pt-36">
                            <div>
                                <h1 className="text-sm sm:text-base font-semibold text-zinc-400">Current Price</h1>
                                <h1 className="font-bold text-xl sm:text-2xl text-purple-300">{NFTData?.price ? ethers.formatEther(NFTData.price) : "0"} ETH</h1>
                            </div>
                            <Button onClick={() => setIsBuyModalOpen(true)} className="py-6 w-2/3 sm:w-[70%] rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 
                         shadow-[0_0_10px_#a855f7] hover:shadow-[0_0_15px_#a855f7] hover:from-purple-500 hover:via-purple-700 hover:to-purple-800 transition-all duration-300">Buy now</Button>
                            <Dialog open={isBuyModalOpen} onOpenChange={setIsBuyModalOpen}>
                                <DialogContent className="bg-darkprimary border border-slate-900 text-gray-200">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-bold text-purple-300">Are you sure you want to buy?</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex justify-end gap-4 mt-4">
                                        <button onClick={() => setIsBuyModalOpen(false)} className="mr-2">Cancel</button>
                                        <Button onClick={() => handleBuyNFT({ tokenId: NFTData?.tokenId, price: NFTData?.price })} className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 
                         shadow-[0_0_10px_#a855f7] hover:shadow-[0_0_15px_#a855f7] hover:from-purple-500 hover:via-purple-700 hover:to-purple-800 transition-all duration-300 font-semibold text-white px-4 py-2 rounded hover:bg-slate-800" disabled={buyNFTIsLoading || isWaitingForTransaction || isPending}>
                                            <div className="flex justify-center items-center gap-2">
                                                <h1>Buy now</h1>
                                                {buyNFTIsLoading || isWaitingForTransaction || isPending ?
                                                    <LucideLoader2 className="animate-spin" /> : null}
                                            </div>
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </main>
    )
}
