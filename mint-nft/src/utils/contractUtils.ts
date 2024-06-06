// src/utils/contractUtils.ts
import { Provider, Types } from "aptos";
import { APTOS_NODE_URL, DAPP_ADDRESS } from "../config/constants";

const client = new Provider({ fullnode: APTOS_NODE_URL });
const typeCoollistInfo = DAPP_ADDRESS + `::pre_mint::CoolListInfo`;
/* 
TODO: it should be auto gen in the future.
View Functions:
see in https://explorer.aptoslabs.com/object/0x2f27aea33bd372b22454d7c6ee86646f4be0e34baccc004b398faedbab7dd8cd/modules/view/pre_mint/mint_start_time?network=testnet
[x] is_whitelisted
[x] get_balance
[x] mint_start_time
[x] mint_end_time
*/
export async function isWhitelisted(addr: string): Promise<boolean> {
  const payload: Types.ViewRequest = {
    function: DAPP_ADDRESS + `::pre_mint::is_whitelisted`,
    type_arguments: [],
    arguments: [addr],
  };
  const result = await client.view(payload);
  return result[0];
}

export async function getBalance(addr: string): Promise<number> {
  const payload: Types.ViewRequest = {
    function: DAPP_ADDRESS + `::pre_mint::minted_tokens`,
    type_arguments: [],
    arguments: [addr],
  };
  const result = await client.view(payload);
  return result.length;
}

export async function mintStartTime(): Promise<number> {
  const payload: Types.ViewRequest = {
    function: DAPP_ADDRESS + `::pre_mint::mint_start_time`,
    type_arguments: [typeCoollistInfo],
    arguments: [],
  };
  const result = await client.view(payload);
  return result.length;
}

export async function mintEndTime(): Promise<number> {
  const payload: Types.ViewRequest = {
    function: DAPP_ADDRESS + `::pre_mint::mint_end_time`,
    type_arguments: [typeCoollistInfo],
    arguments: [],
  };
  const result = await client.view(payload);
  return result.length;
}
