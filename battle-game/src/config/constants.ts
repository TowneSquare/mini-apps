import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { Network } from "aptos";

export const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY!;
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export const DAPP_NAME = process.env.NEXT_PUBLIC_DAPP_NAME!; // changed here.
export const DAPP_ADDRESS = process.env.NEXT_PUBLIC_DAPP_ADDRESS!; // changed here.
export const MARKET_COINT_TYPE = process.env.NEXT_PUBLIC_MARKET_COIN_TYPE!;
export const MODULE_NAME = "unveil"

export const APTOS_NODE_URL = process.env.NEXT_PUBLIC_APTOS_NODE_URL!;
export const APTOS_FAUCET_URL = process.env.NEXT_PUBLIC_APTOS_FAUCET_URL;
export const SLOTHBALL_COLLECTION_ADDRESS_TESTNET = process.env.SLOTHBALL_COLLECTION_ADDRESS_TESTNET || "0xed70fe340dcabdaacbb5a16600d8974517c489e53a7923611b84df51e5c2e92e"

export const NETWORK=process.env.NEXT_PUBLIC_APTOS_NETWORK!;


export const MODULE_URL=`https://explorer.aptoslabs.com/account/${  DAPP_ADDRESS  }/modules?network=${  NETWORK}`

export const ETH_SIGNER_URL="https://eth-signer-react-app.vercel.app/?msg=";
export const APTOS_SIGNER_URL="https://aptos-signer.vercel.app/?msg="

export const STATE_SEED = "hero_signer";
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
export const APTOS = new Aptos(aptosConfig);
// use to gen resource account.