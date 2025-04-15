export type NFTData = {
    name?: string;
    image?: string;
    price?: bigint;
    description?: string;
    creator?: `0x${string}`;
    owner?: `0x${string}`;
    isForSale?: boolean;
    tokenURI?: string;
    tokenId?: bigint;
};