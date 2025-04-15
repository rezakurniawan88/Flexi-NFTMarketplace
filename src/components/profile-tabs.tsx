import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkeletonCard from "./ui/card-skeleton";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { LucideEdit2, LucideLoader2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { NFTData } from "@/types/nft-types";
import { ethers } from "ethers";

type HandleActionsType = {
    setSelectedNFT: (nft: NFTData | null) => void;
    setDialogChangePriceIsOpen: (open: boolean) => void;
    setDialogToggleSaleIsOpen: (open: boolean) => void;
    handleSetPrice: (price: string) => Promise<void>;
    handleToggleSale: () => Promise<void>;
    changePriceIsLoading: boolean;
    toggleSaleIsLoading: boolean;
    isWaitingForTransaction: boolean;
    isPending: boolean;
    priceInput: string;
    setPriceInput: (value: string) => void;
    selectedNFT: NFTData | null;
}

type ProfileTabsProps = {
    nftsData: NFTData[];
    ownedNFTsData: NFTData[];
    listNFTIsLoading: boolean;
    dialogToggleSaleIsOpen: boolean;
    dialogChangePriceIsOpen: boolean;
    handleActions: HandleActionsType;
}

export default function ProfileTabs({ nftsData, ownedNFTsData, listNFTIsLoading, dialogToggleSaleIsOpen, dialogChangePriceIsOpen, handleActions }: ProfileTabsProps) {
    const {
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
    } = handleActions;
    const searchParams = useSearchParams();
    const tabsQuery = searchParams.get("tabs");

    return (
        <Tabs defaultValue={tabsQuery ? tabsQuery : "collectibles"} className="w-full">
            <TabsList className="w-full bg-transparent justify-start py-6">
                <TabsTrigger value="collectibles" className="py-2.5 px-4 sm:px-6 text-white text-xs sm:text-sm data-[state=active]:bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 data-[state=active]:text-white">Collectibles</TabsTrigger>
                <TabsTrigger value="created" className="py-2.5 px-4 sm:px-6 text-white text-xs sm:text-sm data-[state=active]:bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 data-[state=active]:text-white">Created</TabsTrigger>
            </TabsList>
            <TabsContent value="collectibles">
                <div className="w-full flex flex-wrap gap-6 py-6 sm:py-10">
                    {listNFTIsLoading ? (
                        <SkeletonCard col={4} />
                    ) : nftsData.length > 0 ? (
                        nftsData.map((nft, index) => (
                            <div key={index} className="relative w-48 sm:w-64 p-4 bg-[#110823]/50 backdrop-blur-xl rounded-2xl border border-purple-800/30 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_40px_#a855f715] transform hover:-translate-y-2 cursor-pointer">
                                <Link href={`/detail/${nft.tokenId}`} >
                                    <div className="relative w-40 h-36 sm:w-56 sm:h-60 bg-[#1d0d3a] mb-4 rounded-xl overflow-hidden">
                                        <div className="absolute top-2 w-full flex justify-between items-center z-10">
                                            <div className="flex items-center gap-2 bg-[#110823]/80 text-slate-900 font-bold text-xs py-1.5 px-3 rounded-sm ml-2">
                                                <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full animate-pulse ${nft?.isForSale ? "bg-green-500" : "bg-red-500"}`} />
                                                <h1 className={nft?.isForSale ? "text-green-500 text-[0.65rem] sm:text-sm" : "text-red-500 text-[0.65rem] sm:text-sm"}>{nft?.isForSale ? "On Sale" : "Not For Sale"}</h1>
                                            </div>
                                        </div>
                                        <Image
                                            src={`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${nft?.image}`}
                                            alt="image"
                                            width={200}
                                            height={200}
                                            className="w-full h-full rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-xl font-bold bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent [text-shadow:_0_0_15px_#a855f730]">{nft?.name}</h3>
                                        <p className="text-sm text-purple-200/80 mt-1 truncate">{nft?.creator}</p>
                                    </div>
                                    <div className="mt-4 sm:mt-5">
                                        <p className="text-[0.65rem] sm:text-xs text-purple-300/60">Current Price</p>
                                        <p className="text-base sm:text-lg font-semibold text-purple-300 truncate pr-24">{nft?.price ? ethers.formatEther(nft.price.toString()) : "N/A"} ETH</p>
                                    </div>
                                </Link>
                                <Dialog open={dialogChangePriceIsOpen} onOpenChange={setDialogChangePriceIsOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setSelectedNFT(nft)} className="absolute top-6 right-3 bg-[#110823]/80 w-9 h-9 sm:w-10 sm:h-10 text-slate-900 rounded-full mr-2 hover:bg-[#110823]/90 z-20"><LucideEdit2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200" /></Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-4/5 sm:w-full bg-[#0a0615] border border-slate-900 text-gray-200">
                                        <DialogHeader>
                                            <DialogTitle className="text-base sm:text-lg text-purple-300">Change NFT Price</DialogTitle>
                                            <DialogDescription className="text-xs sm:text-sm">
                                                Enter a new price in ETH.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-3 sm:py-4">
                                            <Label htmlFor="price" className="text-sm sm:text-base text-purple-300">Price (ETH)</Label>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder="New Price"
                                                value={priceInput}
                                                onChange={(e) => setPriceInput(e.target.value)}
                                                className="text-purple-200 input input-bordered w-full border-purple-800/30"
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                onClick={() => handleSetPrice(priceInput)}
                                                disabled={changePriceIsLoading || isWaitingForTransaction || isPending}
                                                className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 
                                                                    shadow-[0_0_10px_#a855f7] hover:shadow-[0_0_12px_#a855f7] hover:from-purple-500 hover:via-purple-700 hover:to-purple-800 transition-all duration-300"
                                            >
                                                {changePriceIsLoading || isWaitingForTransaction ? <LucideLoader2 className="animate-spin" /> : "Set Price"}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Dialog open={dialogToggleSaleIsOpen} onOpenChange={setDialogToggleSaleIsOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => {
                                            setDialogToggleSaleIsOpen(true);
                                            setSelectedNFT(nft);
                                        }} className="absolute bottom-5 right-1 sm:right-2 font-bold bg-gradient-to-br from-red-400 via-red-600 to-red-800 shadow-[0_0_4px_#f87171] hover:shadow-[0_0_8px_#f87171] text-white text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-4 mr-2 rounded-sm hover:bg-red-600">{nft?.isForSale ? "Cancel list" : "Sell Now"}</Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-3/4 sm:w-full bg-[#0a0615] border border-slate-900 text-gray-200 pt-10 rounded-lg">
                                        <DialogHeader>
                                            <DialogTitle className="text-purple-300">{`Are you sure you want to ${selectedNFT?.isForSale ? "Cancel List the NFT ?" : "Sell the NFT?"}`}</DialogTitle>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <div className="flex justify-end gap-2 sm:gap-4 mt-4">
                                                <Button variant="ghost" onClick={() => setDialogToggleSaleIsOpen(false)} className="text-xs sm:text-sm mr-2 hover:bg-slate-900/50 hover:text-white">Cancel</Button>
                                                <Button
                                                    onClick={() => handleToggleSale()}
                                                    className="bg-gradient-to-br from-red-400 via-red-600 to-red-800 shadow-[0_0_8px_#f87171] hover:shadow-[0_0_12px_#f87171] text-white text-xs sm:text-base px-3 sm:px-4 py-2 rounded"
                                                    disabled={toggleSaleIsLoading || isWaitingForTransaction || isPending}
                                                >
                                                    <div className="flex justify-center items-center gap-2">
                                                        <h1>{selectedNFT?.isForSale ? "Cancel list" : "Sell Now"}</h1>
                                                        {toggleSaleIsLoading || isWaitingForTransaction || isPending ? <LucideLoader2 className="animate-spin" /> : null}
                                                    </div>
                                                </Button>
                                            </div>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))
                    ) : (
                        <p className="font-semibold text-gray-400">No NFTs found</p>
                    )}
                </div>
            </TabsContent>
            <TabsContent value="created">
                <div className="w-full flex flex-wrap gap-6 py-6 sm:py-10">
                    {listNFTIsLoading ? (
                        <SkeletonCard col={4} />
                    ) : ownedNFTsData.length > 0 ? (
                        ownedNFTsData.map((nft, index) => (
                            <div key={index} className="relative w-48 sm:w-64 p-4 bg-[#110823]/50 backdrop-blur-xl rounded-2xl border border-purple-800/30 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_40px_#a855f715] transform hover:-translate-y-2 cursor-pointer">
                                <Link href={`/detail/${nft.tokenId}`} >
                                    <div className="relative w-40 h-36 sm:w-56 sm:h-60 bg-[#1d0d3a] mb-4 rounded-xl overflow-hidden">
                                        <div className="absolute top-2 w-full flex justify-between items-center z-10">
                                            <div className="flex items-center gap-2 bg-[#110823]/80 text-slate-900 font-bold text-xs py-1.5 px-3 rounded-sm ml-2">
                                                <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full animate-pulse ${nft?.isForSale ? "bg-green-500" : "bg-red-500"}`} />
                                                <h1 className={nft?.isForSale ? "text-green-500 text-[0.65rem] sm:text-sm" : "text-red-500 text-[0.65rem] sm:text-sm"}>{nft?.isForSale ? "On Sale" : "Not For Sale"}</h1>
                                            </div>
                                        </div>
                                        <Image
                                            src={`https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${nft?.image}`}
                                            alt="image"
                                            width={200}
                                            height={200}
                                            className="w-full h-full rounded-xl hover:scale-105 transition-transform duration-300 ease-in-out"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-xl font-bold bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent [text-shadow:_0_0_15px_#a855f730]">{nft?.name}</h3>
                                        <p className="text-sm text-purple-200/80 mt-1 truncate">{nft?.creator}</p>
                                    </div>
                                    <div className="mt-4 sm:mt-5">
                                        <p className="text-[0.65rem] sm:text-xs text-purple-300/60">Current Price</p>
                                        <p className="text-base sm:text-lg font-semibold text-purple-300 truncate pr-24">{nft?.price ? ethers.formatEther(nft.price.toString()) : "N/A"} ETH</p>
                                    </div>
                                </Link>
                                <Dialog open={dialogChangePriceIsOpen} onOpenChange={setDialogChangePriceIsOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setSelectedNFT(nft)} className="absolute top-6 right-3 bg-[#110823]/80 w-9 h-9 sm:w-10 sm:h-10 text-slate-900 rounded-full mr-2 hover:bg-[#110823]/90 z-20"><LucideEdit2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200" /></Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-4/5 sm:w-full bg-[#0a0615] border border-slate-900 text-gray-200">
                                        <DialogHeader>
                                            <DialogTitle className="text-base sm:text-lg text-purple-300">Change NFT Price</DialogTitle>
                                            <DialogDescription className="text-xs sm:text-sm">
                                                Enter a new price in ETH.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-3 sm:py-4">
                                            <Label htmlFor="price" className="text-sm sm:text-base text-purple-300">Price (ETH)</Label>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder="New Price"
                                                value={priceInput}
                                                onChange={(e) => setPriceInput(e.target.value)}
                                                className="text-purple-200 input input-bordered w-full border-purple-800/30"
                                            />
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                onClick={() => handleSetPrice(priceInput)}
                                                disabled={changePriceIsLoading || isWaitingForTransaction || isPending}
                                                className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 
                                                                shadow-[0_0_10px_#a855f7] hover:shadow-[0_0_12px_#a855f7] hover:from-purple-500 hover:via-purple-700 hover:to-purple-800 transition-all duration-300"
                                            >
                                                {changePriceIsLoading || isWaitingForTransaction ? <LucideLoader2 className="animate-spin" /> : "Set Price"}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Dialog open={dialogToggleSaleIsOpen} onOpenChange={setDialogToggleSaleIsOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => {
                                            setDialogToggleSaleIsOpen(true);
                                            setSelectedNFT(nft);
                                        }} className="absolute bottom-5 right-1 sm:right-2 font-bold bg-gradient-to-br from-red-400 via-red-600 to-red-800 shadow-[0_0_4px_#f87171] hover:shadow-[0_0_8px_#f87171] text-white text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-4 mr-2 rounded-sm hover:bg-red-600">{nft?.isForSale ? "Cancel list" : "Sell Now"}</Button>
                                    </DialogTrigger>
                                    <DialogContent className="w-3/4 sm:w-full bg-[#0a0615] border border-slate-900 text-gray-200 pt-10 rounded-lg">
                                        <DialogHeader>
                                            <DialogTitle className="text-purple-300">{`Are you sure you want to ${selectedNFT?.isForSale ? "Cancel List the NFT ?" : "Sell the NFT?"}`}</DialogTitle>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <div className="flex justify-end gap-2 sm:gap-4 mt-4">
                                                <Button variant="ghost" onClick={() => setDialogToggleSaleIsOpen(false)} className="text-xs sm:text-sm mr-2 hover:bg-slate-900/50 hover:text-white">Cancel</Button>
                                                <Button
                                                    onClick={() => handleToggleSale()}
                                                    className="bg-gradient-to-br from-red-400 via-red-600 to-red-800 shadow-[0_0_8px_#f87171] hover:shadow-[0_0_12px_#f87171] text-white text-xs sm:text-base px-3 sm:px-4 py-2 rounded"
                                                    disabled={toggleSaleIsLoading || isWaitingForTransaction || isPending}
                                                >
                                                    <div className="flex justify-center items-center gap-2">
                                                        <h1>{selectedNFT?.isForSale ? "Cancel list" : "Sell Now"}</h1>
                                                        {toggleSaleIsLoading || isWaitingForTransaction || isPending ? <LucideLoader2 className="animate-spin" /> : null}
                                                    </div>
                                                </Button>
                                            </div>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))
                    ) : (
                        <p className="font-semibold text-gray-400">No NFTs found</p>
                    )}
                </div>
            </TabsContent>
        </Tabs>
    );
}