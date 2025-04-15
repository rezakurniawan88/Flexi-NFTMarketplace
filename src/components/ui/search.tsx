"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";

export interface SearchProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    onClear?: () => void;
    onSearch?: () => void;
    mobileSearchOpen: boolean;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
    ({ className, value, mobileSearchOpen, onClear, onSearch, ...props }, ref) => {
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && onSearch) {
                onSearch();
            }
        };

        return (
            <div className="relative w-4/5 sm:w-auto">
                <Input
                    ref={ref}
                    className={`pl-10 pr-8 py-5 bg-[#140c2b] border-purple-800/50 text-gray-300 text-sm sm:text-base rounded-full ${className}`}
                    value={value}
                    onKeyDown={handleKeyDown}
                    {...props}
                />
                <SearchIcon className={`${mobileSearchOpen ? "block" : "hidden"} sm:block absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 text-muted-foreground`} />
                {value && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full p-0 hover:bg-gray-900 focus:bg-transparent"
                        onClick={onClear}
                        aria-label="Clear search"
                    >
                        <X className="h-4 w-4 text-gray-300" />
                    </Button>
                )}
            </div>
        );
    }
);
Search.displayName = "Search";

export { Search };