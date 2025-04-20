"use client"

import Link from "next/link";
import WalletSignIn from "./wallet-signin";
import { Search } from "./ui/search";
import { useState } from "react";
import { LucideArrowLeft, LucideChevronRight, LucideMenu, LucideSearch, LucideX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [mobileSearchOpen, setMobileSearchOpen] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/explore?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleClear = () => {
        setSearchQuery("");
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#13082a]/80 backdrop-blur-xl border-purple-900/30 border-b-[1px]">
            <nav className="flex items-center justify-between p-5 sm:px-12 sm:py-6">
                <div className="hidden sm:flex items-center gap-8">
                    <Link href="/" className="text-2xl font-bold text-purple-700"
                    >Flexi</Link>
                    <div className="flex items-center space-x-1 cursor-pointer">
                        <Link href="/" className="font-semibold px-3 py-1 rounded-lg text-gray-300 cursor-pointer hover:text-purple-500">Home</Link>
                        <Link href="/explore" className="font-semibold px-3 py-1 rounded-lg text-gray-300 hover:text-purple-500">Explore</Link>
                    </div>
                </div>

                <div className={`flex items-center gap-4 sm:hidden ${mobileSearchOpen ? "hidden" : "flex"}`}>
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="sm:hidden text-2xl text-purple-500 rounded-full p-2 hover:bg-purple-500/10 transition-all duration-200">
                        <LucideMenu className="w-7 h-7" />
                    </button>
                    <Link href="/" className="text-2xl font-bold text-purple-700"
                    >Flexi</Link>
                </div>

                <div className={`flex items-center gap-3 sm:gap-4 ${mobileSearchOpen ? "w-full" : null} sm:w-auto`}>
                    {mobileSearchOpen ? (
                        <button onClick={() => setMobileSearchOpen(false)} className="sm:hidden text-2xl text-purple-500 rounded-full p-2 hover:bg-purple-500/10 transition-all duration-200">
                            <LucideArrowLeft className="w-6 h-6" />
                        </button>
                    ) : (
                        <button onClick={() => setMobileSearchOpen(true)} className="sm:hidden p-4 bg-transparent text-purple-500 hover:bg-purple-500/10 border border-purple-800/30 rounded-full"><LucideSearch className="w-5 h-5" /></button>
                    )}
                    <Search
                        placeholder="Search..."
                        className={`hidden sm:block ${mobileSearchOpen ? "block w-full" : "hidden"}`}
                        value={searchQuery}
                        mobileSearchOpen={mobileSearchOpen}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClear={handleClear}
                        onSearch={handleSearch}
                    />
                    {mobileSearchOpen ? null : (
                        <WalletSignIn />
                    )}
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className={`fixed inset-0 z-50 bg-[#13082a] backdrop-blur-lg h-screen flex flex-col px-8 py-6 transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="flex justify-between items-center mb-10">
                        <Link href="/" className="text-2xl font-bold text-purple-700">
                            Flexi
                        </Link>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-2xl text-purple-500 rounded-full p-2 hover:bg-purple-500/10 transition-all duration-200"
                        >
                            <LucideX className="w-7 h-7" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 text-xl">
                        <Link
                            href="/"
                            className="font-semibold text-gray-300 py-2 pr-3 rounded-lg flex items-center justify-between hover:text-purple-500 hover:bg-purple-500/10 hover:pl-2 transition-all duration-300"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                            <LucideChevronRight className="w-5 h-5 inline-block float-right" />
                        </Link>
                        <Link
                            href="/explore"
                            className="font-semibold text-gray-300 py-2 pr-3 rounded-lg flex items-center justify-between hover:text-purple-500 hover:bg-purple-500/10 hover:pl-2 transition-all duration-300"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Explore
                            <LucideChevronRight className="w-5 h-5 inline-block float-right" />
                        </Link>
                    </div>
                    <p className="absolute bottom-5 right-5 text-white text-xs">By Flexi Team.</p>
                </div>
            )}
        </header>
    )
}
