import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
    pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY as string,
    pinataJwt: process.env.PINATA_JWT as string,
});

export default pinata;