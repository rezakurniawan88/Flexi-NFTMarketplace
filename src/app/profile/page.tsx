"use client"

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import useFetchUserData from "@/hooks/useFetchUserData"
import { NFTMarketplaceABI } from "@/utils/abi/NFTMarketplaceABI";
import Link from "next/link";
import { useAccount, useReadContract, useSignMessage, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import pinata from "../../lib/pinata";
import { Suspense, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/footer";
import { NFTData } from "@/types/nft-types";
import { sepolia } from "viem/chains";
import ProfileTabs from "@/components/profile-tabs";

export default function ProfilePage() {
    const { isConnected } = useAccount();
    const [nftsData, setNftsData] = useState<NFTData[]>([]);
    const [ownedNFTsData, setOwnedNFTsData] = useState<NFTData[]>([]);
    const { data: dataUser, isPending: fetchUserLoading } = useFetchUserData();
    const { address } = useAccount();
    const { toast } = useToast();
    const { signMessageAsync } = useSignMessage();
    const { data: nfts, isPending: listNFTIsLoading, refetch: listNFTRefetch } = useReadContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: NFTMarketplaceABI,
        functionName: "getNFTsOwnedBy",
        args: [address as `0x${string}`],
        chainId: sepolia.id,
    });
    const { data: hash, writeContract, error: ctError, isPending } = useWriteContract();
    const { isLoading: isWaitingForTransaction, isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
        hash: hash,
        chainId: sepolia.id,
        confirmations: 1
    })
    const [currentTransactionType, setCurrentTransactionType] = useState<'toggleSale' | 'updatePrice' | null>(null);
    const [toggleSaleIsLoading, setToggleSaleIsLoading] = useState<boolean>(false);
    const [dialogToggleSaleIsOpen, setDialogToggleSaleIsOpen] = useState<boolean>(false);
    const [changePriceIsLoading, setChangePriceIsLoading] = useState<boolean>(false);
    const [dialogChangePriceIsOpen, setDialogChangePriceIsOpen] = useState<boolean>(false);
    const [priceInput, setPriceInput] = useState<string>("");
    const [selectedNFT, setSelectedNFT] = useState<NFTData | null>(null);
    const acronymUser = dataUser?.username?.split(/\s+/g).slice(0, 2).map((word: string | number[]) => word[0]).join('').toUpperCase();

    const handleToggleSale = async () => {
        setCurrentTransactionType('toggleSale');
        setToggleSaleIsLoading(true);

        try {
            if (!isConnected) {
                toast({
                    title: "Error",
                    description: "Wallet not connected",
                    variant: "destructive",
                })
                throw new Error("Wallet not connected")
            }

            await signMessageAsync({ message: "Confirm toggle sale NFT" })

            await writeContract({
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                abi: NFTMarketplaceABI,
                functionName: "toggleSaleStatus",
                args: [selectedNFT?.tokenId ?? BigInt(0)],
                chainId: sepolia.id
            })

            setToggleSaleIsLoading(false);
            setSelectedNFT(null);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error updating price",
                description: "Failed to update NFT price",
                variant: "destructive",
            });
            setToggleSaleIsLoading(false);
            setCurrentTransactionType(null);
        }
    };

    const handleSetPrice = async (price: string) => {
        setCurrentTransactionType('updatePrice');

        setChangePriceIsLoading(true);
        try {
            if (!isConnected) {
                toast({
                    title: "Error",
                    description: "Wallet not connected",
                    variant: "destructive",
                })
                throw new Error("Wallet not connected")
            }

            await signMessageAsync({ message: "Confirm change price NFT" })

            await writeContract({
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                abi: NFTMarketplaceABI,
                functionName: "updatePrice",
                args: [selectedNFT?.tokenId ?? BigInt(0), ethers.parseEther(price)],
                chainId: sepolia.id
            });

            setChangePriceIsLoading(true);
            setSelectedNFT(null);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error updating price",
                description: "Failed to update NFT price",
                variant: "destructive",
            });
            setChangePriceIsLoading(false);
            setCurrentTransactionType(null);
        }
    }

    useEffect(() => {
        if (isTransactionSuccess && currentTransactionType) {
            switch (currentTransactionType) {
                case 'toggleSale':
                    toast({
                        title: "NFT Status Updated",
                        description: "NFT status update successfully",
                        className: "bg-[#110823] text-gray-200 border border-purple-800/40",
                    });
                    listNFTRefetch();
                    setDialogToggleSaleIsOpen(false);
                    break;

                case 'updatePrice':
                    toast({
                        title: "NFT Price Updated",
                        description: "NFT change price successfully",
                        className: "bg-[#110823] text-gray-200 border border-purple-800/40",
                    });
                    setPriceInput("");
                    setDialogChangePriceIsOpen(false);
                    listNFTRefetch();
                    break;
            }

            setCurrentTransactionType(null);
            setToggleSaleIsLoading(false);
            setChangePriceIsLoading(false);
        }
    }, [currentTransactionType, isTransactionSuccess, listNFTRefetch, toast]);

    useEffect(() => {
        if (ctError) {
            switch (currentTransactionType) {
                case 'toggleSale':
                    toast({
                        title: "Error updating sale status",
                        description: ctError.message,
                        variant: "destructive",
                    });
                    break;

                case 'updatePrice':
                    toast({
                        title: "Error updating price",
                        description: ctError.message,
                        variant: "destructive",
                    });
                    break;
            }

            setCurrentTransactionType(null);
            setToggleSaleIsLoading(false);
            setChangePriceIsLoading(false);
        }
    }, [ctError, currentTransactionType, toast]);

    useEffect(() => {
        const getFiles = async () => {
            if (!nfts || nfts.length === 0) return;
            const nftMetadata = await Promise.all(
                nfts.map(async (nft) => {
                    try {
                        const res = await pinata.gateways.get(nft.tokenURI);
                        return {
                            ...(typeof res.data === 'object' && res.data !== null ? res.data : {}),
                            price: nft.price,
                            creator: nft.creator,
                            owner: nft.owner,
                            isForSale: nft.isForSale,
                            tokenURI: nft.tokenURI,
                            tokenId: nft.tokenId
                        };
                    } catch (error) {
                        console.error("Error fetching NFT metadata:", error);
                        return null;
                    }
                })
            );

            setNftsData(nftMetadata.filter((data) => data) as NFTData[]);
            setOwnedNFTsData(nftMetadata.filter((data) => data?.creator === address) as NFTData[]);
        };

        getFiles();
    }, [nfts, address]);

    return (
        <main className="w-full h-full bg-darkprimary pt-20">
            <Header />
            <div className="bg-darkprimary w-full">
                <div className="relative bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900 w-full h-44 sm:h-72">
                    <div className="absolute bottom-0 left-6 -mb-16 w-36 h-36 sm:w-48 sm:h-48 p-2 rounded-full bg-darkprimary">
                        <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white text-4xl sm:text-5xl font-semibold rounded-full">{acronymUser}</div>
                    </div>
                </div>
                {fetchUserLoading ? (
                    <div className="mt-[4.5rem] ml-6 space-y-2">
                        <div className="bg-[#110823] w-[30%] sm:w-[20%] h-7 sm:h-10 rounded-md animate-pulse"></div>
                        <div className="bg-[#110823] w-[20%] sm:w-[10%] h-7 sm:h-10 rounded-md animate-pulse"></div>
                        <div className="bg-[#110823] w-2/3 sm:w-[40%] h-7 sm:h-10 rounded-md animate-pulse"></div>
                    </div>
                ) : (
                    <div className="mt-20 mx-6 space-y-2">
                        <h1 className="font-bold text-xl sm:text-2xl text-gray-300">{dataUser?.username || "Guest"}</h1>
                        <div>
                            <h1 className="text-gray-400 text-base sm:text-lg">{dataUser?.email || "guest@email.com"}</h1>
                            <div className="flex items-center gap-1 mt-1">
                                <svg fill="gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 -ml-1"><path d="M18.527 12.2062L12 16.1938L5.46875 12.2062L12 1L18.527 12.2062ZM12 17.4742L5.46875 13.4867L12 23L18.5312 13.4867L12 17.4742V17.4742Z" fill="gray"></path></svg>
                                <h1 className="text-gray-500 text-sm sm:text-lg hover:font-semibold cursor-pointer w-fit">{dataUser?.walletAddress || ""}</h1>
                            </div>
                        </div>
                    </div>
                )}

                <div className="relative mt-10 mx-6">
                    <div className="absolute top-1 right-1 flex justify-end items-center mb-4">
                        <Link href={"/profile/create-nft"}>
                            <Button className="py-4 px-5 sm:py-6 sm:px-7 text-xs sm:text-sm bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 shadow-[0_0_5px_#a855f7] hover:from-purple-500 hover:via-purple-700 hover:to-purple-800 hover:shadow-[0_0_10px_#a855f7]">
                                + Create NFT
                            </Button>
                        </Link>
                    </div>
                    <Suspense fallback={
                        <div className="w-full h-20 animate-pulse bg-[#110823]/50 rounded-lg">
                            <div className="h-full flex items-center justify-center">
                                <p className="text-purple-300/50">Loading tabs...</p>
                            </div>
                        </div>
                    }>
                        <ProfileTabs
                            nftsData={nftsData}
                            ownedNFTsData={ownedNFTsData}
                            listNFTIsLoading={listNFTIsLoading}
                            dialogToggleSaleIsOpen={dialogToggleSaleIsOpen}
                            dialogChangePriceIsOpen={dialogChangePriceIsOpen}
                            handleActions={{
                                setSelectedNFT,
                                setDialogChangePriceIsOpen,
                                setDialogToggleSaleIsOpen,
                                handleSetPrice,
                                handleToggleSale,
                                changePriceIsLoading,
                                toggleSaleIsLoading,
                                isWaitingForTransaction,
                                isPending,
                                priceInput,
                                setPriceInput,
                                selectedNFT
                            }}
                        />
                    </Suspense>
                </div>
            </div>
            <Footer />
        </main>
    )
}
