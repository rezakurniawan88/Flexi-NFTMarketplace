import React from "react";

interface SkeletonCardProps {
    col: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ col }) => {
    return (
        <div className="w-full flex flex-wrap gap-6 py-10">
            {Array.from({ length: col }).map((_, index) => (
                <div key={index} className="w-48 sm:w-64 p-4 border border-purple-800/20 rounded-2xl animate-pulse overflow-hidden">
                    <div className="w-40 h-36 sm:w-56 sm:h-60 bg-[#110823] backdrop-blur-lg border border-purple-800/20 mb-4 rounded-xl" />
                    <div className="space-y-2">
                        <div className="w-32 h-6 bg-[#110823] backdrop-blur-lg border border-purple-800/20 rounded-md" />
                        <div className="w-40 sm:w-48 h-4 bg-[#110823] backdrop-blur-lg border border-purple-800/20 rounded-md" />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="w-16 h-8 bg-[#110823] backdrop-blur-lg border border-purple-800/20 rounded-md" />
                        <div className="w-16 h-8 bg-[#110823] backdrop-blur-lg border border-purple-800/20 rounded-md" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonCard;