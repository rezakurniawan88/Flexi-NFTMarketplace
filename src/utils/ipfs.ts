import pinata from "@/lib/pinata"

type JSONToIPFSType = {
    name: string,
    description: string,
    image: string
};

export const uploadFileToIPFS = async(file: File) => {
    try {
        const result = await pinata.upload.file(file);
        return result?.IpfsHash;
    } catch (error) {
        console.error("Error uploading file to IPFS:", error);
        throw error;
    }
}

export const uploadJSONToIPFS = async(metadata: JSONToIPFSType) => {
    try {
        const result = await pinata.upload.json(metadata);
        return result?.IpfsHash;
    } catch (error) {
        console.error("Error uploading JSON to IPFS:", error);
        throw error;
    }
}